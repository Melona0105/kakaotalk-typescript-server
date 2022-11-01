import { Request, Response } from "express";
import { database } from "../../database/database";
import dotenv from "dotenv";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";
dotenv.config();

interface RequestBody {
  uid: string;
  email: string;
  username: string;
  termsIndexes: string;
}

/**
 * 클라이언트의 요청을 받아 데이터를 DB에 저장합니다.
 */
async function createUser(req: Request, res: Response) {
  const { uid, email, username, termsIndexes }: RequestBody = req.body;
  const termsIndexesJSON = JSON.stringify(termsIndexes);
  try {
    database.query(
      `INSERT INTO users (id, email, username, agree_terms) VALUES ("${uid}", "${email}", "${username}", "${termsIndexesJSON}")`,
      (err, data) => {
        if (err) {
          console.log({ err });
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

export default createUser;
