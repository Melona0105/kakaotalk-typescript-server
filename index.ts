import dotenv from "dotenv";
import { createServer } from "http";
import app from "./app";

dotenv.config();

const port = process.env.PORT;

const httpServer = createServer(app);

httpServer.listen(port, () => {
  console.log(`${port}로 서버 연결`);
});
