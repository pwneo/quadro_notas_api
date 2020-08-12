import * as repository from '../repositories/grade.repository.js';
import * as utils from '../utils/grade.utils.js';

export function save(data){
    if (!(utils.isPropertiesValidated(data) && utils.isValuesValidated(data) && utils.isNotNullAndNotUndefined(data))){
       throw new Error('Invalid Data');
    }
    return repository.insert(data); 
}

export function listALl(){
    return repository.findAll();
}

export function findById(id){
    return repository.findById(id);
}

export function remove(id){
    return repository.deletebyId(id);
}

export function update(id, data){
    if (!(utils.isPropertiesValidated(data) && utils.isValuesValidated(data) && utils.isNotNullAndNotUndefined(data))){
        throw new Error('Invalid Data');
    }
    return repository.update(id, data);
}

export function patch(id, data){
    const propertiesData = Reflect.ownKeys(data);
    const validValues = utils.isValuesValidated(data, propertiesData);
    if (!validValues){
        throw new Error('Invalid Data');
    }
    return repository.patchProperty(id, data);   
}