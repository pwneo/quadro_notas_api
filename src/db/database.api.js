import { promises as fs } from "fs";
import { env } from "../environment.js";

const { readFile, writeFile } = fs;

export async function createDataBase() {
  try {
    await readFile(env.DATABASE_URL);
    console.log('Database found!');
  } catch (error) {
    const data = { grades: [] };
    await writeFile(env.DATABASE_URL, JSON.stringify(data))
        .then(() => {
            console.log('Database created!');
        });
  }
}

export async function readToDatabase() {
  return JSON.parse(await readFile(env.DATABASE_URL));
}

export async function writeToDatabase(cacheDatabase) {
  await writeFile(env.DATABASE_URL, JSON.stringify(cacheDatabase));
}