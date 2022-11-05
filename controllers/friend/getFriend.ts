import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

/**
 * 친구의 이메일과 일치하는 데이터를 리턴합니다.
 */
function getFriend(req: Request, res: Response) {
  const { uid } = req.body;
  const { email } = req.params;

  try {
    // 주어진 이메일과 일치하는 데이터 쿼리
    database.query(
      `SELECT id, email, username from users WHERE email="${email}"`,
      (err, data) => {
        if (err) {
          console.log(err);

          return res
            .status(400)
            .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT });
        }

        // 해당하는 데이터로 친구목록에 있는지 쿼리합니다.
        database.query(
          `SELECT * from friends WHERE user_id="${uid}" AND friend_id="${data?.[0]?.id}"`,
          (err, result) => {
            if (err) {
              console.log(err);

              return res
                .status(400)
                .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT });
            }

            const resultData = { ...data[0], isFriend: !!result[0] };
            return res.status(201).send(resultData);
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getFriend;
