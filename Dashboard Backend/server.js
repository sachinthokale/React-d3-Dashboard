import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDb.js";

import { insightRoute } from "./routes/insight.js";

const app = express();
connectDB();
dotenv.config();
app.use(express.json());

// app.use("/api", insightRoute);

app.listen(process.env.PORT, () =>
  console.log(`app running on port ${process.env.PORT}`)
);
