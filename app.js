import express from "express";
import session from "express-session";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import UserRoutes from "./users/routes.js";
import "./node_modules/dotenv/config.js";
mongoose.connect("mongodb://localhost:27017/kanbas");
const app = express();
app.use(express.json());
app.use(
  cors({ credentials: true, origin: process.env.FRONTEND_URL, origin: true })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));  

CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
Lab5(app);
app.listen(4000);
