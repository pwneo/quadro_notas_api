import * as repository from '../repositories/grade.repository.js';
import {gradePatchSchema, gradePostOrPutSchema, validate} from "../utils/validation.utils.js";

export function save(data) {
    const result = validate(gradePostOrPutSchema, data);
    if (result.hasError) {
        throw new Error(JSON.stringify(result.messages));
    }
    return repository.insert(data);
}

export function listALl() {
    return repository.findAll();
}

export function findById(id) {
    return repository.findById(id);
}

export function remove(id) {
    return repository.deletebyId(id);
}

export function update(id, data) {
    const result = validate(gradePostOrPutSchema, data);
    if (result.hasError) {
        throw new Error(JSON.stringify(result.messages));
    }
    return repository.update(id, data);
}

export function patch(id, data) {
    const result = validate(gradePatchSchema, data);
    if (result.hasError) {
        throw new Error(JSON.stringify(result.messages));
    }
    return repository.patchProperty(id, data);
}