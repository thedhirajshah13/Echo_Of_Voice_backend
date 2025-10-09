import jwts from "jsonwebtoken";
import userModel from "../model/userSchema.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ msg: "Unauthorized user pls sign in first", success: false });
    }
    const decode = jwts.verify(token, process.env.ACCESS_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ msg: "Unauthorized user", success: false });
    }

    const user = await userModel.findById(decode.userId);
    if (!user) {
      return res.status(404), json({ msg: "user Not Found", success: false });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Protect Route Error ${error}`);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", success: false });
  }
};
export default protectRoute;
