import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

/**
 * 채팅방을 나가는 함수입니다.
 * 현재 로그인한 유저의 id와 방 id가 일치한 room_members 테이블의 is_leaved 값을 변경합니다.
 */
async function leaveChattingRoom(req: Request, res: Response) {
  const { uid, room_id } = req.body;

  try {
    await new Promise((resolve, reject) => {
      database.query(
        `UPDATE room_members AS RM SET is_leaved = "1"
              WHERE RM.user_id = "${uid}" AND RM.room_id = "${room_id}"`,
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

    return res.status(200).send({ message: RESPONES_MESSAGE.SUCCESS });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default leaveChattingRoom;
