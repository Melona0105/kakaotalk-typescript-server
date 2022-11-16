import { Request, Response } from "express";
import { MyFriendFristDataType } from "./utils/friend.interface";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

/**
 * 차단 친구 목록을 쿼리합니다.
 */
async function getMyBlockedFriends(req: Request, res: Response) {
  const { uid } = req.body;

  try {
    const friendIds: MyFriendFristDataType[] = await new Promise(
      (resolve, reject) => {
        database.query(
          `SELECT friend_id FROM friends WHERE user_id="${uid}" AND is_blocked="1"`,
          (err, result) => {
            if (err) {
              console.log(err);
              return reject(
                res
                  .status(400)
                  .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT })
              );
            }
            return resolve(result);
          }
        );
      }
    );
    const friendDataPromise = friendIds.map(
      ({ friend_id }) =>
        new Promise((resolve, reject) => {
          database.query(
            `SELECT id, username FROM users WHERE id="${friend_id}"`,
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

    const result = await Promise.all(friendDataPromise);

    return res.status(201).send(result);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getMyBlockedFriends;
