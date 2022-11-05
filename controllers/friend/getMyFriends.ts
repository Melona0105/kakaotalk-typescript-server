import { Request, Response } from "express";
import { MysqlError } from "mysql";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

interface MyFriendFristDataType {
  friend_id: string;
}

interface MyFriendResultType {
  [key: string]: { id: string; username: string };
}

async function getMyFriends(req: Request, res: Response) {
  const { uid } = req.body;
  const result: any[] = [];

  try {
    const friendIds: MyFriendFristDataType[] = await new Promise((res, rej) => {
      database.query(
        `SELECT friend_id FROM friends WHERE user_id="${uid}"`,
        (err, result) => {
          if (err) {
            return rej(err);
          }
          return res(result);
        }
      );
    });
    const friendDataPromise = friendIds.map(
      ({ friend_id }) =>
        new Promise((res, rej) => {
          database.query(
            `SELECT id, username FROM users WHERE id="${friend_id}"`,
            (err, data) => {
              if (err) return rej(err);

              return res(data[0]);
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
