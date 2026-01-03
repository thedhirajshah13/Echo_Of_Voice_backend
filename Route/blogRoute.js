import express from "express";
import ImageUpload from "../controller/imagehandle.js";
import {
  postBlog,
  getpost,
  fullBlog,
  postComment,
  blogLike,
  featuredBlog,
  testModeration,
  getMyBlogs
} from "../controller/blogcontroller.js";
import protectRoute from "../middleware/protectRoute.js";
import uploadMedia from "../middleware/multer.js";

const blogRouter = express.Router();

blogRouter.post("/file/upload", uploadMedia.single("file"), ImageUpload);

blogRouter.post("/blogpost", protectRoute, postBlog);
blogRouter.get("/post", protectRoute, getpost);
blogRouter.get("/fullblog/:id", fullBlog);
blogRouter.post("/fullblog/comments", protectRoute, postComment);
blogRouter.post("/fullblog/like", protectRoute, blogLike);
blogRouter.get("/featured/blog", featuredBlog);
blogRouter.get("/test/moderation", testModeration);
blogRouter.get("/user/me/myblogs",protectRoute,getMyBlogs)

export default blogRouter;
