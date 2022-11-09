import { Router } from "express";
import getChattingRoom from "../controllers/chattingRoom/getChattingRoom";
import getChattingRoomInfo from "../controllers/chattingRoom/getChattingRoomInfo";
import auth from "../middlewares/auth";

const chattingRoomRouter = Router();

chattingRoomRouter.get("/:friendId", auth, getChattingRoom);
chattingRoomRouter.get("/getRoomInfo/:roomId", auth, getChattingRoomInfo);

export default chattingRoomRouter;
