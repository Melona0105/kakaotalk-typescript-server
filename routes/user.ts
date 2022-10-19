import { Router } from "express";
import controllers from "../controllers";

const userRouter = Router();
const { userInfo } = controllers;

userRouter.get("/userinfo", userInfo);

export default userRouter;
