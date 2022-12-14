import { Router } from "express";
import chattingRouter from "./chatting";
import chattingRoomRouter from "./chattingRoom";
import friendRouter from "./friend";
import userRouter from "./user";

const router = Router();
// user로 들어오면 userRouter로 보낸다.

router.use("/room", chattingRoomRouter);
router.use("/chatting", chattingRouter);
router.use("/friend", friendRouter);
router.use("/user", userRouter);

router.use("/", (req, res) => {
  res.send("카카오톡 서버입니다.");
});
export default router;
