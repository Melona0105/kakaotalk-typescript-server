import cors from "cors";
import express from "express";
import path from "path";
import router from "./routes";

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  })
);

// req.body에 접근 가능하도록
app.use(express.json());
// 사진저장 폴더 세팅
// app.use(express.static(path.join(__dirname, "public")));

// 기본 라우터로 이동
app.use("/", router);

export default app;
