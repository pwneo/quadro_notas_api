import { v4 as uuid } from 'uuid';
import { promises as fs } from "fs";
import { path } from '../environment.js';

const { readFile, writeFile } = fs;

let cacheDatabase = [];

export function insert({student, subject, type, value}) {
    try {
      const grade = { id: uuid(), student, subject, type, value, timestamp: new Date() };
      cacheDatabase.grades.push(grade);
      writeToDatabase();
      return grade;
    } catch (error) {
      return { error: error.message };
    }
  }
  
  async function readToDatabase() {
    cacheDatabase = JSON.parse(await readFile(path.DATABASE_URL));
  }
  
  async function writeToDatabase() {
    await writeFile(path.DATABASE_URL, JSON.stringify(cacheDatabase));
  }

  readToDatabase();