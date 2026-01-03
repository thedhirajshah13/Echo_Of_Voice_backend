import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  getMyProfile
} from "../controller/userController.js";
import protectRoute from "../middleware/protectRoute.js"

const authRouter = express.Router();

authRouter.post("/register", userRegister);
authRouter.post("/login", userLogin);
authRouter.post("/logout",protectRoute, userLogout);
authRouter.get("/getuserprofile/me",protectRoute,getMyProfile);

export default authRouter;
