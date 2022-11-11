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
        `SELECT RM.room_id FROM room_members AS RM WHERE RM.user_id
        ="${uid}"`,
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
            `SELECT RM.user_id, U.username, RM.room_id, C.text, C.createdAt FROM users AS U
            LEFT JOIN room_members AS RM ON RM.user_id = U.id
            LEFT JOIN chats AS C ON C.room_id = RM.room_id
            WHERE U.id != "${uid}" AND RM.room_id = "${room_id}" LIMIT 1 `,
            (err, data) => {
              if (err) {
                console.log(err);
                return reject(
                  res
                    .status(400)
                    .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT })
                );
              }

              return resolve(data[0]);
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
