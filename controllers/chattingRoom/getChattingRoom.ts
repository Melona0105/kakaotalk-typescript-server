import { Request, Response } from "express";
import { database } from "../../database/database";
import { RESPONES_MESSAGE } from "../../utils/commonConstants";

async function getChattingRoom(req: Request, res: Response) {
  console.log("getChattingRoom");
  const { uid } = req.body;
  const { friend_id } = req.params;
  try {
    // 두 사람의 방이 있는지 확인합니다.
    const result1: any[] = await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM room_members as A INNER JOIN room_members as B WHERE A.user_id="${uid}" AND B.user_id="${friend_id}" AND A.room_id = B.room_id`,
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

    const userRoom = result1[0];
    // 방이 존재한다면, 해당 방을 리턴합니다.
    if (userRoom) {
      console.log("exsited room");
      return res.status(201).send({ roomId: userRoom.room_id });
    }

    // 방이 없다면, 새로 방을 만든 후, 그 방을 연결합니다.
    const result2: { insertId: number } = await new Promise(
      (resolve, reject) => {
        database.query(`INSERT INTO rooms (noti) VALUES ("0")`, (err, data) => {
          if (err) {
            console.log(err);
            return reject(
              res.status(400).send({ message: RESPONES_MESSAGE.BAD_USER_INPUT })
            );
          }

          return resolve(data);
        });
      }
    );

    const newRoomId = result2.insertId;

    // 새로 생성한 방으로 데이터를 넣어줍니다.
    await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO room_members (user_id, room_id) VALUES ("${uid}", "${newRoomId}")`,
        (err, result) => {
          if (err) {
            console.log(err);
            return reject(
              res.status(400).send({ message: RESPONES_MESSAGE.BAD_USER_INPUT })
            );
          } else {
            return resolve(result);
          }
        }
      );
    });

    await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO room_members (user_id, room_id) VALUES ("${friend_id}", "${newRoomId}")`,
        (err, result) => {
          if (err) {
            console.log(err);
            return reject(
              res.status(400).send({ message: RESPONES_MESSAGE.BAD_USER_INPUT })
            );
          } else {
            return resolve(result);
          }
        }
      );
    });
    console.log("created room");
    return res.status(201).send({ roomId: result2.insertId });
  } catch (err) {
    console.log(err);

    return res
      .status(500)
      .send({ message: RESPONES_MESSAGE.INTERNAL_SERVER_ERROR });
  }
}

export default getChattingRoom;
