import * as repository from '../repositories/grade.repository.js';

export function save(data){
    if (!(isPropertiesValidated(data) && isValuesValidated(data) && isNotNullAndNotUndefined(data))){
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
    if (!(isPropertiesValidated(data) && isValuesValidated(data) && isNotNullAndNotUndefined(data))){
        throw new Error('Invalid Data');
    }
    return repository.update(id, data);
}

export function patch(id, data){
    const propertiesData = Reflect.ownKeys(data);
    const validValues = isValuesValidated(data, propertiesData);
    if (!validValues){
        throw new Error('Invalid Data');
    }
    return repository.patchProperty(id, data);   
} 


function isNotNullAndNotUndefined(data){
    return repository.getAllProperties()
        .every(property => (
            Reflect.get(data, property) !== undefined 
            && Reflect.get(data, property) !== null    
        ));
}

function isValuesValidated(data, properties = null){
    if (properties === null){
        properties = repository.getAllProperties();
    }

    return properties
        .every(property => (
                typeof Reflect.get(data, property) === 'string' 
                && Reflect.get(data, property) !== ''
            ) || 
            (
                typeof Reflect.get(data, property) === 'number' 
                && Reflect.get(data, property) >= 0
            )
        );   
}

function isPropertiesValidated(data){
    return repository.getAllProperties().every(property => Reflect.has(data, property));
}