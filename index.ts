import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app";
import addChatting from "./controllers/chatting/addChatting";

dotenv.config();

const port = process.env.PORT;

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log({ socketId: socket.id });
  socket.on("disconnecet", () => {
    console.log("disconnected");
  });
  socket.on("message", async (data) => {
    await addChatting(data);
    // 메세지 쿼리 후에 응답을 돌려줍니다.
    socket.emit("message_send");
    console.log("message send");
  });
});

httpServer.listen(port, () => {
  console.log(`${port}로 서버 연결`);
});
