import { Router } from "express";
import getChattings from "../controllers/chatting/getChattings";
import auth from "../middlewares/auth";

const chattingRouter = Router();

chattingRouter.get("/:room_id", auth, getChattings);

export default chattingRouter;
