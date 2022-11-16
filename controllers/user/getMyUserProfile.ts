import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

interface RequestBody {
  uid: string;
}

/**
 * firebase token의 uid와 일치하는 user data를 쿼리합니다.
 */
function getMyUserProfile(req: Request, res: Response) {
  const { uid }: RequestBody = req.body;

  try {
    database.query(`SELECT * from users WHERE id="${uid}"`, (err, data) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT });
      }

      return res.status(201).send(data);
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getMyUserProfile;
