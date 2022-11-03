import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

interface RequestBody {
  uid: string;
  username: string;
  summary?: string;
}

function updateUserProfile(req: Request, res: Response) {
  const { uid, username, summary }: RequestBody = req.body;

  try {
    database.query(
      `UPDATE users SET username = "${username}", summary = "${summary}" WHERE (id = "${uid}")`,
      (err, data) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ message: RESPONES_MESSAGE.BAD_USER_INPUT });
        }

        return res.status(200).send({ message: RESPONES_MESSAGE.SUCCESS });
      }
    );
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default updateUserProfile;

// UPDATE `kakaotalk`.`users` SET `email` = 'fsadfsdfsdaf', `username` = '123' WHERE (`id` = '5cgGwfTyCOYm6LqNqIeEGDyAw3p1');
