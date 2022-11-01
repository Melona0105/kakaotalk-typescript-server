import { Router } from "express";
import createUser from "../controllers/user/createUser";
import getMyUserProfile from "../controllers/user/getMyUserProfile";
import auth from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/", auth, createUser);
userRouter.get("/", auth, getMyUserProfile);

export default userRouter;
