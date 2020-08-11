import express from "express";
import cors from "cors";
import { createDataBase } from "./db/database.api.js";
import GradesRouter from "./routes/grades.router.js";
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/grades', GradesRouter);
app.listen(port, () => {
  createDataBase();
  console.log("API started!");
});
