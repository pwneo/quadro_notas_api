import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";
import { path } from "../environment.js";

const { readFile, writeFile } = fs;

let cacheDatabase = [];

export function insert({ student, subject, type, value }) {
  try {
    const grade = {
      id: uuid(),
      student,
      subject,
      type,
      value,
      timestamp: new Date(),
    };

    cacheDatabase.grades.push(grade);
    writeToDatabase();
    return grade;
  } catch (error) {
    return { error: error.message };
  }
}

export function findAll() {
  return cacheDatabase;
}

export function findById(id) {
  const grade = cacheDatabase.grades.find((grade) => grade.id === id);
  if (!grade) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  return grade;
}

export function update(id,{student, subject, type, value}) {
  const index = cacheDatabase.grades.findIndex((grade) => grade.id === id);
  if (index < 0) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  const updatedGrade = cacheDatabase.grades[index];
  updatedGrade.student = student;
  updatedGrade.subject = subject;
  updatedGrade.type = type;
  updatedGrade.value = value;
  cacheDatabase.grades[index] = updatedGrade;

  writeToDatabase();
  return updatedGrade;
}

export function deletebyId(id) {
  const index = cacheDatabase.grades.findIndex((grade) => grade.id === id);
  if (index < 0) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  cacheDatabase.grades.splice(index, 1);
  writeToDatabase();
}

async function readToDatabase() {
  cacheDatabase = JSON.parse(await readFile(path.DATABASE_URL));
}

async function writeToDatabase() {
  await writeFile(path.DATABASE_URL, JSON.stringify(cacheDatabase));
}

readToDatabase();
