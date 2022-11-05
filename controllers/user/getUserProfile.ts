import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

/**
 * 일반 유저의 이메일과 일치하는 데이터를 쿼리합니다.
 */
function getUserProfile(req: Request, res: Response) {
  const { email } = req.params;

  try {
    database.query(
      `SELECT id, email, username from users WHERE email="${email}"`,
      (err, data) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT });
        }
        return res.status(201).send(data);
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getUserProfile;
