import express from "express";
import * as repository from "../repositories/grade.repository.js";

const router = express.Router();

router.post("/", (request, response) => {
  try {
    const { body } = request;
    const newGrade = repository.insert(body);
    response.send(newGrade);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/", (request, response) => {
  try {
    const grades = repository.findAll();
    response.send(grades);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", ({ params: { id } }, response) => {
  try {
    const grade = repository.findById(id);
    response.send(grade);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
