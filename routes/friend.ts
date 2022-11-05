import { Router } from "express";
import addFriend from "../controllers/friend/addFriend";
import getFriend from "../controllers/friend/getFriend";
import getMyFriends from "../controllers/friend/getMyFriends";
import auth from "../middlewares/auth";

const friendRouter = Router();

friendRouter.get("/", auth, getMyFriends);
friendRouter.get("/:email", auth, getFriend);
friendRouter.post("/", auth, addFriend);

export default friendRouter;
