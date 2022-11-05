import { Router } from "express";
import addFriend from "../controllers/friend/addFriend";
import blockFriend from "../controllers/friend/blockFriend";
import getFriend from "../controllers/friend/getFriend";
import getMyFriends from "../controllers/friend/getMyFriends";
import hideFriend from "../controllers/friend/hideFriend";
import auth from "../middlewares/auth";

const friendRouter = Router();

friendRouter.get("/", auth, getMyFriends);
friendRouter.get("/:email", auth, getFriend);
friendRouter.post("/", auth, addFriend);
friendRouter.post("/hide", auth, hideFriend);
friendRouter.post("/block", auth, blockFriend);

export default friendRouter;
