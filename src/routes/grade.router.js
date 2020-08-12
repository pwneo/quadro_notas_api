import express from "express";
import * as repository from "../repositories/grade.repository.js";
import * as service from "../services/grade.service.js";

const router = express.Router();

router.post("/", ({ body }, response) => {
  try {
    const newGrade = service.save(body);
    response.send(newGrade);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/", (request, response) => {
  try {
    const grades = service.listALl();
    response.send(grades);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", ({ params: { id } }, response) => {
  try {
    const grade = service.findById(id);
    response.send(grade);
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", ({ params: { id }, body }, response) => {
  try {
    const grade = service.update(id, body);
    response.send(grade);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", ({ params: { id } }, response) => {
  try {
    const grade = service.remove(id);
    response.send(grade);
  } catch (error) {
    console.log(error.message);
  }
});

router.patch("/:id", ({ body , params:{id}}, response) => {
    try {
        const grade = service.patch(id, body);
        response.send(grade);
    } catch (error) {
        console.log(error.message);
    }
});

export default router;
