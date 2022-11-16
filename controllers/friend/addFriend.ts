import { Request, Response } from "express";
import { RequestBody } from "./utils/friend.interface";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";


function addFriend(req: Request, res: Response) {
  const { uid, friend_id }: RequestBody = req.body;

  try {
    database.query(
      `INSERT INTO friends (user_id, friend_id) VALUES ("${uid}", "${friend_id}")`,
      (err, data) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT });
        }
        return res.status(201).send({ message: RESPONES_MESSAGE.SUCCESS });
      }
    );
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default addFriend;
