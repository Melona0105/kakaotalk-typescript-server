import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

async function getChattings(req: Request, res: Response) {
  console.log("getChattings");
  const { room_id } = req.params;

  try {
    const chatData = await new Promise((resolve, reject) => {
      database.query(
        `SELECT C.id, C.room_id, C.sender_id, C.text, C.read, C.createdAt, C.updatedAt, U.username FROM chats AS C
         LEFT JOIN users AS U ON C.sender_id = U.id
          WHERE C.room_id = "${room_id}"`,
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

    return res.status(201).send(chatData);
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getChattings;
