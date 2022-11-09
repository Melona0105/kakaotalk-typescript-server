import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

async function getChattingRoomInfo(req: Request, res: Response) {
  const { uid } = req.body;
  const { roomId } = req.params;

  // room member중, rommId를 갖고있고, user가 내가 아닌 경우의 userId를 획득해서 이 아이디로 데이터를 가져옵니다.
  try {
    const friendIdData: any[] = await new Promise((resolve, reject) => {
      database.query(
        `SELECT U.id, U.email, U.username, U.summary FROM users AS U
             LEFT JOIN room_members AS RM ON RM.user_id = U.id
             LEFT JOIN friends AS F ON F.friend_id = U.id
             WHERE room_id = "${roomId}" AND U.id != "${uid}"`,
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

    return res.status(201).send(friendIdData?.[0]);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getChattingRoomInfo;
