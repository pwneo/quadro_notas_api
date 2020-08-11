import express from "express";
import * as repository from "../repositories/grade.repository.js";

const router = express.Router();

router.post("/", ({ body }, response) => {
  try {
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

router.put("/:id", ({ params: { id }, body }, response) => {
  try {
    const grade = repository.update(id, body);
    response.send(grade);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", ({ params: { id } }, response) => {
  try {
    const grade = repository.deletebyId(id);
    response.send(grade);
  } catch (error) {
    console.log(error.message);
  }
});

router.patch("/:id", ({ body , params:{id}}, response) => {
    try {
        const grade = repository.patchProperty(id, body);
        response.send(grade);
    } catch (error) {
        console.log(error.message);
    }
});

export default router;
