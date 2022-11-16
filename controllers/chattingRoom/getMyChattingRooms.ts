import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

interface MyRoomIdsType {
  room_id: number;
}

async function getMyChattingRooms(req: Request, res: Response) {
  const { uid } = req.body;

  try {
    const myRoomIds: MyRoomIdsType[] = await new Promise((resolve, reject) => {
      database.query(
        `SELECT RM.room_id FROM room_members AS RM
        WHERE RM.user_id = "${uid}" AND RM.is_leaved != "${1}"`,
        (err, data) => {
          if (err) {
            console.log(err);
            return reject(
              res.status(400).send({ message: RESPONES_MESSAGE.BAD_USER_INPUT })
            );
          }

          return resolve(data);
        }
      );
    });

    // 내 방정보가 존재하지 않는다면 빈 배열을 리턴합니다.
    if (!myRoomIds.length) {
      return res.status(201).send([]);
    }

    // 존재한다면
    const roomDataPromise = myRoomIds.map(
      ({ room_id }) =>
        new Promise((resolve, reject) => {
          database.query(
            `SELECT C.id, C.room_id AS roomId, U.id AS senderId, C.text, C.read, C.createdAt, C.updatedAt, U.username FROM chats AS C
             LEFT JOIN room_members AS RM ON RM.room_id = C.room_id AND RM.user_id != "${uid}"
             LEFT JOIN users AS U ON RM.user_id = U.id
              WHERE C.room_id = "${room_id}"`,
            (err, data) => {
              if (err) {
                console.log(err);
                return reject(
                  res
                    .status(400)
                    .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT })
                );
              }
              return resolve(data[data?.length - 1]);
            }
          );
        })
    );

    const result = await Promise.all(roomDataPromise);

    return res.status(201).send(result);
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getMyChattingRooms;
