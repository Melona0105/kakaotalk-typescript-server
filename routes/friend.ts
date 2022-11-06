import { Router } from "express";
import addFriend from "../controllers/friend/addFriend";
import blockFriend from "../controllers/friend/blockFriend";
import getBlockedFriends from "../controllers/friend/getBlockedFriends";
import getFriend from "../controllers/friend/getFriend";
import getMyHiddenFriends from "../controllers/friend/getHiddenFriends";
import getMyFriends from "../controllers/friend/getMyFriends";
import hideFriend from "../controllers/friend/hideFriend";
import auth from "../middlewares/auth";

const friendRouter = Router();

friendRouter.get("/hide", auth, getMyHiddenFriends);
friendRouter.get("/block", auth, getBlockedFriends);
friendRouter.get("/:email", auth, getFriend);
friendRouter.get("/", auth, getMyFriends);
friendRouter.post("/hide", auth, hideFriend);
friendRouter.post("/block", auth, blockFriend);
friendRouter.post("/", auth, addFriend);

export default friendRouter;
