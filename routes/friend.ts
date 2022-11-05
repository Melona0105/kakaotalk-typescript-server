import { Router } from "express";
import addFriend from "../controllers/friend/addFriend";
import getFriend from "../controllers/friend/getFriend";
import auth from "../middlewares/auth";

const friendRouter = Router();

friendRouter.post("/", auth, addFriend);
friendRouter.get("/:email", auth, getFriend);

export default friendRouter;
