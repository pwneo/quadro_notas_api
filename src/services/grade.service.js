import * as repository from '../repositories/grade.repository.js';

export function save(data){
    if (!(validateProperties(data) && validateValues(data))){
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
    if (!(validateProperties(data) && validateValues(data))){
        throw new Error('Invalid Data');
    }
    return repository.update(id, data);
}

export function patch(id, data){
  return repository.patchProperty(id, data);   
} 

function validateValues(data){
    const notNulAndNotUndefined = repository.getAllProperties()
        .every(property => (
            Reflect.get(data, property) !== undefined 
            && Reflect.get(data, property) !== null    
        ));

    const isValid =  repository.getAllProperties()
        .every(property => (
                typeof Reflect.get(data, property) === 'string' 
                && Reflect.get(data, property) !== ''
            ) || 
            (
                typeof Reflect.get(data, property) === 'number' 
                && Reflect.get(data, property) >= 0
            )
        );
   
    return isValid && notNulAndNotUndefined;
}

function validateProperties(data){
    return repository.getAllProperties().every(property => Reflect.has(data, property));
}