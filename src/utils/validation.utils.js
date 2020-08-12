import Joi from '@hapi/joi';

export const gradePostOrPutSchema = Joi.object({
    student: Joi.string().min(3).max(100).regex(/^[a-zA-Z]/).required(),
    subject: Joi.string().min(3).max(100).required(),
    type: Joi.string().min(3).max(100).required(),
    value: Joi.number().min(0).max(100).required()
});

export const gradePatchSchema = Joi.object({
    student: Joi.string().min(3).max(100).regex(/^[a-zA-Z]/),
    subject: Joi.string().min(3).max(100),
    type: Joi.string().min(3).max(100),
    value: Joi.number().min(0).max(100)
});

export function validate(schema, data) {
    const {error} = schema.validate(data);
    const result = {
        hasError: false,
        messages: []
    };

    if (error){
        result.hasError = true;
        result.messages = error.details[0].message;
    }
    return result;
}