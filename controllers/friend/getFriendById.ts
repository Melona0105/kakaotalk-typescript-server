import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

/**
 * 친구의 이메일과 일치하는 데이터를 리턴합니다.
 */
function getFriendById(req: Request, res: Response) {
  console.log("getFriendById");
  const { friend_id } = req.params;

  try {
    // 주어진 이메일과 일치하는 데이터 쿼리
    database.query(
      `SELECT id, email, username, summary from users WHERE id="${friend_id}"`,
      (err, data) => {
        if (err) {
          console.log(err);

          return res
            .status(400)
            .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT });
        }

        return res.status(201).send(data?.[0]);
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getFriendById;
