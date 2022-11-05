import { Router } from "express";
import createUserProfile from "../controllers/user/createUserProfile";
import getMyUserProfile from "../controllers/user/getMyUserProfile";
import updateUserProfile from "../controllers/user/updateUserProfile";
import auth from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/", auth, createUserProfile);
userRouter.get("/", auth, getMyUserProfile);
userRouter.post("/update", auth, updateUserProfile);

export default userRouter;
