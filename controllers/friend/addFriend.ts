import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

interface RequestBody {
  uid: string;
  friendId: string;
}

function addFriend(req: Request, res: Response) {
  const { uid, friendId }: RequestBody = req.body;

  try {
    database.query(
      `INSERT INTO friends (user_id, friend_id) VALUES ("${uid}", "${friendId}")`,
      (err, data) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT });
        }
        console.log("good");
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
