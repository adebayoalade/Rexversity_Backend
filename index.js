import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
config();

import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import { verifyToken } from "./middleware/jwt.js";

const app = express();
app.use(cookieParser());
app.use(helmet());

// connect our code to the database (MongoDB)
mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connection Established"))
.catch((err) => console.log(err));


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/post", verifyToken, postRoute);

// to listen to the application
app.listen(process.env.PORT || 3001, () => {
    console.log("Backend services is running");
    });