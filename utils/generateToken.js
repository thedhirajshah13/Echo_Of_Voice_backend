import jwt from "jsonwebtoken";
const generateToken = async (userId, res) => {
  // console.log(process.env);
  const token = jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
