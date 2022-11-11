import { io } from "../..";
import { database } from "../../database/database";

interface ChattingData {
  sender_id: string;
  text: string;
  room_id: string;
}

/**
 * 웹소켓을 통해 들어온 데이터를 chatting에 쿼리합니다.
 */
async function addChatting({ sender_id, text, room_id }: ChattingData) {
  try {
    await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO chats (room_id, sender_id, text) VALUES ("${room_id}", "${sender_id}", "${text}")`,
        (err, data) => {
          if (err) {
            console.log(err);
            return reject(err);
          }

          return resolve(data);
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
}
export default addChatting;
