import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.ACCESS_SECRET_KEY,
    { expiresIn: "15d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,          // ✅ MUST be true in production
    sameSite: "none",      // ✅ REQUIRED for cross-domain
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
