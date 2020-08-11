import { v4 as uuid } from "uuid";
import * as db from '../db/database.api.js';

let cacheDatabase = [];
db.readToDatabase().then( database => cacheDatabase = database);

export function insert({ student, subject, type, value }) {
  try {
    const grade = { id: uuid(), student, subject, type, value, timestamp: new Date() };
    cacheDatabase.grades.push(grade);
    db.writeToDatabase(cacheDatabase);    
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
  const index = findIndex(id);
  
  if (index < 0) {
    throw new Error(`Grade not found. Id: ${id}`);
  }

  const gradeFound = findById(id);
  Reflect.ownKeys(cacheDatabase.grades[0])
    .filter(property => property !== 'id' && property !== 'timestamp')
    .forEach(property => {
      Reflect.set(gradeFound, property, Reflect.get(body, property));
    });
  
  cacheDatabase.grades[index] = gradeFound;
  db.writeToDatabase(cacheDatabase);
  return gradeFound;
}

export function deletebyId(id) {
  const index = findIndex(id);
  
  if (index < 0) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  
  cacheDatabase.grades.splice(index, 1);
  writeToDatabase(cacheDatabase);
}

export function patchProperty(id, body) {
  const index = findIndex(id);
  
  if (index < 0) {
    throw new Error(`Grade not found. Id: ${id}`);
  }
  
  const gradeFound = findById(id);
  Reflect.ownKeys(gradeFound)
    .forEach(property => {
      if (Reflect.has(body, property)){
        Reflect.set(gradeFound, property, Reflect.get(body, property));
      }
    });
  
  cacheDatabase.grades[index] = gradeFound;
  db.writeToDatabase(cacheDatabase);
  return gradeFound;
}

function findIndex(id){
  return cacheDatabase.grades.findIndex(grade => grade.id === id);
}