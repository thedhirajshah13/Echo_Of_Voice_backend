import jwt from "jsonwebtoken";
import userModel from "../model/userSchema.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("JWT:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized user, please sign in",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    const user = await userModel
      .findById(decoded.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    req.user = user; // ✅ only ID
    next();
  } catch (error) {
    console.log("Protect Route Error:", error.message);
    return res.status(401).json({
      success: false,
      msg: "Invalid or expired token",
    });
  }
};

export default protectRoute;
