import mongoose from "mongoose";


const connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_KEY);
    console.log("database connected succesfully");
  } catch (error) {
    console.log("error while connecting database", error);
  }
};

export default connection;
