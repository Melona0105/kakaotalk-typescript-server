import { Router } from "express";
import controllers from "../controllers";
import auth from "../middlewares/auth";

const userRouter = Router();
const { createUser } = controllers;

userRouter.post("/", auth, createUser);

export default userRouter;
