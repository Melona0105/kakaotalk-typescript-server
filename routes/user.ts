import { Router } from "express";
import createUserProfile from "../controllers/user/createUserProfile";
import getMyUserProfile from "../controllers/user/getMyUserProfile";
import getUserProfile from "../controllers/user/getUserProfile";
import updateUserProfile from "../controllers/user/updateUserProfile";
import auth from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/", auth, createUserProfile);
userRouter.get("/", auth, getMyUserProfile);
userRouter.post("/update", auth, updateUserProfile);
userRouter.get("/:email", auth, getUserProfile);

export default userRouter;
