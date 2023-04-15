import dotenv from 'dotenv';
import cors from 'cors';
import UserController
  from "./controllers/userController.js";
import NewsController
  from "./controllers/newsController.js";
import ReviewController
  from "./controllers/reviewController.js";
import BookmarkController
  from "./controllers/bookmarkController.js";
import FollowingController from './controllers/followingController.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config();
const corsOptions = {
  origin: process.env.REACT_APP,
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING1;
mongoose.connect(CONNECTION_STRING);

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

UserController(app);
NewsController(app);
BookmarkController(app);
ReviewController(app);
FollowingController(app);

app.listen(process.env.PORT || 4000);
