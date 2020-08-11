import { promises as fs } from "fs";
import { path } from "../environment.js";

const { readFile, writeFile } = fs;

export async function createDataBase() {
  try {
    await readFile(path.DATABASE_URL);
    console.log('Database found!');
  } catch (error) {
    const data = { grades: [] };
    await writeFile(path.DATABASE_URL, JSON.stringify(data))
        .then(() => {
            console.log('Database created!');
        });
  }
}