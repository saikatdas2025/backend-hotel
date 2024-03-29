import express from "express";
import {
  comeHome,
  logOut,
  login,
  register,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const userRouter = express();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/home", verifyToken, comeHome);

userRouter.post("/logout", verifyToken, logOut);

export { userRouter };
