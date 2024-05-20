import fs from "fs";
import path from "path";
import { Insight } from "../models/insight.js";

export const insertJsonData = async (req, res) => {
  try {
    const jsonPath = path.join(path.dirname(""), "jsondata.json");
    const jsonData = fs.readFileSync(jsonPath, "utf8");
    const documents = JSON.parse(jsonData);

    const result = await Insight.insertMany(documents);
    res.status(201).json({ message: `${result.length} documents inserted` });
  } catch (error) {
    console.error("Error inserting documents:", error);
    res
      .status(500)
      .json({ error: `Error inserting documents: ${error.message}` });
  }
};

export const getAllData = async (req, res) => {
  try {
    const data = await Insight.find();
    if (!data) {
      return res.status(400).json({
        message: "error while fetching data",
      });
    } else {
      return res.status(200).json({
        message: "data fetch successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
