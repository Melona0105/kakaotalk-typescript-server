import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

interface RequestBody {
  uid: string;
  friendId: string;
}

/**
 * 받은 friendId에 해당하는 유저를 숨김 상태로 변경합니다.
 */
async function hideFriend(req: Request, res: Response) {
  const { uid, friendId }: RequestBody = req.body;

  try {
    const result = await new Promise((resolve, reject) => {
      database.query(
        `UPDATE friends SET is_hidden="${1}" WHERE user_id="${uid}" AND friend_id="${friendId}"`,
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

export default hideFriend;
