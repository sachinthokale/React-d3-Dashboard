import express from "express";
import { insertJsonData } from "../contollers/insight.js";

export const insightRoute = express.Router();

insightRoute.route("/insert-json").post(insertJsonData);
