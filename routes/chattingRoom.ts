import { Router } from "express";
import getChattingRoom from "../controllers/chattingRoom/getChattingRoom";
import getChattingRoomInfo from "../controllers/chattingRoom/getChattingRoomInfo";
import auth from "../middlewares/auth";

const chattingRoomRouter = Router();

chattingRoomRouter.get("/get_room_info/:room_id", auth, getChattingRoomInfo);
chattingRoomRouter.get("/:friend_id", auth, getChattingRoom);

export default chattingRoomRouter;
