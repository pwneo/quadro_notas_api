import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";
import { path } from "../environment.js";

const { readFile, writeFile } = fs;

let cacheDatabase = [];

export function insert({ student, subject, type, value }) {
  try {
    const grade = { id: uuid(), student, subject, type, value, timestamp: new Date() };
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
  const grade = cacheDatabase.grades[findIndex(id)];
  if (!grade) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  return grade;
}

export function update(id, body) {
  const gradeFound = findById(id);
  if (!gradeFound) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  const propertiesDbObject = Reflect.ownKeys(gradeFound);
  propertiesDbObject.forEach(property => {
    Reflect.set(gradeFound, property, Reflect.get(body, property));
  });

  writeToDatabase();
  return gradeFound;
}

export function deletebyId(id) {
  const index = findIndex(id);
  if (index < 0) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  cacheDatabase.grades.splice(index, 1);
  writeToDatabase();
}

export function patchProperty(id, body) {
  const gradeFound = findById(id);
  if (!gradeFound) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  const propertiesDbObject = Reflect.ownKeys(gradeFound);
  propertiesDbObject.forEach(property => {
    if (Reflect.has(body, property)){
      Reflect.set(gradeFound, property, Reflect.get(body, property));
    }
  });

  writeToDatabase();
  return gradeFound;
}

function findIndex(id){
  return cacheDatabase.grades.findIndex(grade => grade.id === id);
}

async function readToDatabase() {
  cacheDatabase = JSON.parse(await readFile(path.DATABASE_URL));
}

async function writeToDatabase() {
  await writeFile(path.DATABASE_URL, JSON.stringify(cacheDatabase));
}

readToDatabase();
