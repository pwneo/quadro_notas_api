import { env } from "../environment";

export function isNotNullAndNotUndefined(data){
    return env.ALL_PROPERTIES
        .every(property => (
            Reflect.get(data, property) !== undefined 
            && Reflect.get(data, property) !== null    
        ));
}

export function isValuesValidated(data, properties = null){
    if (properties === null){
        properties = env.ALL_PROPERTIES;
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

export function isPropertiesValidated(data){
    return env.ALL_PROPERTIES.every(property => Reflect.has(data, property));
}