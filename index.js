import express from "express";
import connection from "./dataBase/dbconnection.js";
import authRouter from "./Route/authRoute.js";
import blogRouter from "./Route/blogRoute.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { app, io, server } from "./socket/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Always apply middleware before routes
app.use(cors({
  origin: "https://echoofvoices.netlify.app",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/file", express.static(path.join(__dirname, "uploads")));
app.use("/", authRouter);
app.use("/", blogRouter);

const port = 8000;
server.listen(port, () => {
  connection();
  console.log(`Server started at port ${port}`);
});
