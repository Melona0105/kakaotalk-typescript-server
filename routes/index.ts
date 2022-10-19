import { Router } from "express";
import userRouter from "./user";

const router = Router();
// user로 들어오면 userRouter로 보낸다.

router.use("/user", userRouter);

router.use("/", (req, res) => {
  res.send("카카오톡 서버입니다.");
});
export default router;