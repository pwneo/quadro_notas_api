import express from "express";
import * as service from "../services/grade.service.js";
import { logger } from "../logs/grade.logs.js";

const router = express.Router();

router.get("/", ({method, baseUrl}, response, next) => {
  try {
    const grades = service.listAll();
    response.send(grades);
    logger.info(`${method} ${baseUrl}: list all grades: ${JSON.stringify(grades)}`);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", ({ params: { id }, method, baseUrl }, response, next) => {
  try {
    const gradeFound = service.findById(id);
    response.send(gradeFound);
    logger.info(`${method} ${baseUrl}: grade found: ${JSON.stringify(gradeFound)}`);
  } catch (error) {
    next(error);
  }
});

router.post("/", ({ body, method, baseUrl }, response, next) => {
    try {
        const newGrade = service.save(body);
        response.send(newGrade);
        logger.info(`${method} ${baseUrl}: grade added: ${JSON.stringify(newGrade)}`);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", ({ params: { id }, body, method, baseUrl }, response, next) => {
    try {
        const gradeUpdated = service.update(id, body);
        response.send(gradeUpdated);
        logger.info(`${method} ${baseUrl}: grade updated: ${JSON.stringify(gradeUpdated)}`);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", ({ params: { id }, method, baseUrl }, response, next) => {
    try {
        const gradeDeleted = service.remove(id);
        response.send(gradeDeleted);
        logger.info(`${method} ${baseUrl}: grade deleted. Id: ${id}`);
    } catch (error) {
        next(error);
    }
});

router.patch("/:id", ({ body , params:{id}, method, baseUrl}, response, next) => {
    try {
        const gradeProperty = service.patch(id, body);
        response.send(gradeProperty);
        logger.info(`${method} ${baseUrl}: property updated: ${JSON.stringify(gradeProperty)}`);
    } catch (error) {
        next(error);
    }
});

router.get("/average-student-subject/:student/:subject", ({params:{student, subject}, method, baseUrl}, response, next) => {
   try {
    const gradeAverage = service.gradeAverage({student, subject});
    response.send(gradeAverage);
    logger.info(`${method} ${baseUrl}: grade average: ${JSON.stringify(gradeAverage)}`);
  } catch (error) {
    next(error);
  }
});

router.get("/average-subject-type/:subject/:type", ({params:{subject, type}, method, baseUrl}, response, next) => {
   try {
    const gradeAverage = service.gradeAverage({subject, type});
    response.send(gradeAverage);
    logger.info(`${method} ${baseUrl}: grade average: ${JSON.stringify(gradeAverage)}`);
  } catch (error) {
    next(error);
  }
});

router.get("/top-three-grades/:subject/:type", ({params:{subject, type}, method, baseUrl}, response, next) => {
    try {
        const gradeAverage = service.topThreeGrades({subject, type});
        response.send(gradeAverage);
        logger.info(`${method} ${baseUrl}: Top Three Grades: ${JSON.stringify(gradeAverage)}`);
    } catch (error) {
        next(error);
    }
});

/*caputa todos os erros que ocorrerem nas requisições que vem pelo router*/
router.use(({message}, {method, baseUrl}, response, next) => {
  response.status(400).send({ error: message });
  logger.error(`${method} ${baseUrl}: ${message}`);
});

export default router;
