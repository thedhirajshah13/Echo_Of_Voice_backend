import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
} from "../controller/userController.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);


export default authRouter;
