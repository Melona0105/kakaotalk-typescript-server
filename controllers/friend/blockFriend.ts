import { Request, Response } from "express";
import { RequestBody } from "./utils/friend.interface";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";


async function blockFriend(req: Request, res: Response) {
  const { uid, friend_id }: RequestBody = req.body;

  try {
    const result = await new Promise((resolve, reject) => {
      database.query(
        `UPDATE friends SET is_blocked="${1}" WHERE user_id="${uid}" AND friend_id="${friend_id}"`,
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

    return res.status(201).send(result);
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default blockFriend;
