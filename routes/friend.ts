import { Router } from "express";
import addFriend from "../controllers/friend/addFriend";
import blockFriend from "../controllers/friend/blockFriend";
import deleteFriend from "../controllers/friend/deleteFriend";
import getFriend from "../controllers/friend/getFriend";
import getFriendById from "../controllers/friend/getFriendById";
import getMyBlockedFriends from "../controllers/friend/getMyBlockedFriends";
import getMyFriends from "../controllers/friend/getMyFriends";
import getMyHiddenFriends from "../controllers/friend/getMyHiddenFriends";
import hideFriend from "../controllers/friend/hideFriend";
import rollBackFriend from "../controllers/friend/rollbackFriend";
import auth from "../middlewares/auth";

const friendRouter = Router();

friendRouter.get("/get/:friend_id", auth, getFriendById);
friendRouter.get("/hide", auth, getMyHiddenFriends);
friendRouter.get("/block", auth, getMyBlockedFriends);
friendRouter.get("/:email", auth, getFriend);
friendRouter.get("/", auth, getMyFriends);

friendRouter.post("/rollback", auth, rollBackFriend);
friendRouter.post("/hide", auth, hideFriend);
friendRouter.post("/block", auth, blockFriend);
friendRouter.post("/", auth, addFriend);

friendRouter.delete("/", auth, deleteFriend);

export default friendRouter;
