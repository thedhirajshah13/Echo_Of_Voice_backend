import userModel from "../model/userSchema.js";

import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password, profileImg } = req.body;
    // console.log(name, email, password, profileImg);
    const userAlreadyExists = await userModel.findOne({ email });
    // console.log(userAlreadyExists);

    if (userAlreadyExists) {
      return res
        .status(409)
        .json({ msg: "User Already Exists", success: false });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = userModel({
      name,
      email,
      password: hashedpassword,
      profileImg,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        msg: "user Registered successfully",
        success: true,
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileImg: newUser.profileImg,
      });
    }
  } catch (error) {
    console.log(`Error In Resgistration ${error}`);
    return res
      .status(501)
      .json({ msg: "Internal Server Error", success: false });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email);
    const findUser = await userModel.findOne({ email });
    // console.log(findUser)
    if (!findUser) {
      return res
        .status(404)
        .json({ msg: "User does not exsits", success: false });
    }
    const isPasswordMatched = await bcrypt.compare(password, findUser.password);
    if (!isPasswordMatched) {
      return res.status(403).json({
        msg: "Either Password or Email is in Correct",
        success: false,
      });
    }

    if (isPasswordMatched) {
      generateToken(findUser._id, res);
      res.status(201).json({
        msg: "successFully SignedIn",
        success: true,
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        profileImg: findUser.profileImg,
      });
    }
  } catch (error) {
    console.log(`Problem in Login ${error}`);
    return res
      .status(501)
      .json({ msg: "Internal Server Error", success: false });
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  return res.status(201).json({ msg: "loggedOut Succesfully", success: true });
};
