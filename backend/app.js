// require('dotenv').config
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";


const app = express();
config({ path: "./config/.env"});

//connection btw fronted and backend is complete here using cors
app.use(
cors(
    {
        origin:[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
        methods: ["GET","POST","PUT","DELETE"],
        credentials: true,
    }
)
);

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.get("/",(req,res) => {
  res.json({
    success: true,
    message: "welcome to my first app",
  });
});
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();

app.use(errorMiddleware);

export default app;