import express from "express";
import cors from "cors";
import { createDataBase } from "./db/create.js";
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  createDataBase();
  console.log("API started!");
});
