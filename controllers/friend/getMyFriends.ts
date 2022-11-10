import { Request, Response } from "express";
import { MyFriendFristDataType } from "./utils/friend.interface";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

/**
 * 친구목록중, 차단되거나, 숨겨지지 않은 친구만 불러옵니다.
 */
async function getMyFriends(req: Request, res: Response) {
  console.log("getMyFriends");
  const { uid } = req.body;

  try {
    const friendIds: MyFriendFristDataType[] = await new Promise(
      (resolve, reject) => {
        database.query(
          `SELECT friend_id FROM friends WHERE user_id="${uid}" AND is_hidden="0" AND is_blocked="0"`,
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

export default getMyFriends;
