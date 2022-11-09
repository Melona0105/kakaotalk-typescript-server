import { Router } from "express";
import chattingRoomRouter from "./chattingRoom";
import friendRouter from "./friend";
import userRouter from "./user";

const router = Router();
// user로 들어오면 userRouter로 보낸다.

router.use("/user", userRouter);
router.use("/friend", friendRouter);
router.use("/chatting_room", chattingRoomRouter);

router.use("/", (req, res) => {
  res.send("카카오톡 서버입니다.");
});
export default router;
