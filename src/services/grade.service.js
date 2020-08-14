import * as repository from '../repositories/grade.repository.js';
import {gradeNotRequiredSchema, gradeRequiredSchema, validate} from "../utils/validation.utils.js";

export function save(data) {
    const result = validate(gradeRequiredSchema, data);
    if (result.hasError) {
        throw new Error(JSON.stringify(result.messages));
    }
    return repository.insert(data);
}

export function listAll() {
    return repository.findAll();
}

export function findById(id) {
    console.log('Entrou no service ')
    return repository.findById(id);
}


export function remove(id) {
    return repository.deletebyId(id);
}

export function update(id, data) {
    const result = validate(gradeRequiredSchema, data);
    if (result.hasError) {
        throw new Error(JSON.stringify(result.messages));
    }
    return repository.update(id, data);
}

export function patch(id, data) {
    const result = validate(gradeNotRequiredSchema, data);
    if (result.hasError) {
        throw new Error(JSON.stringify(result.messages));
    }
    return repository.patchProperty(id, data);
}

export function gradeAverage(data) {
    const result = validate(gradeNotRequiredSchema, data);
    if (result.hasError) {
        throw new Error(JSON.stringify(result.messages));
    }
    let total = 0;
    let grades = [];
    if (Reflect.has(data, 'student') && Reflect.has(data, 'subject')) {
        grades = listAll().grades.filter(grade => grade.student === data.student && grade.subject === data.subject);
    } else {
        grades = listAll().grades.filter(grade => grade.subject === data.subject && grade.type === data.type);
    }
    grades.forEach(({value}) => total += value);
    return {average: (total / grades.length).toFixed(2)};
}

export function topThreeGrades(data) {
    const result = validate(gradeNotRequiredSchema, data);

    if (result.hasError) {
        throw new Error(JSON.stringify(result.messages));
    }

    let grades = [];
    grades = listAll().grades
        .filter(grade => grade.subject === data.subject && grade.type === data.type)
        .sort((a, b) => b.value - a.value)
        .filter((grade, index) =>{
          if (index < 3) {
              return grade;
          }
    })
    return {topThreeGrades: grades};
}