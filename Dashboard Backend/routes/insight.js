import express from "express";
import { getAllData, insertJsonData } from "../contollers/insight.js";

export const insightRoute = express.Router();

// insightRoute.route("/insert-json").post(insertJsonData);
insightRoute.route("/getdata").get(getAllData);
