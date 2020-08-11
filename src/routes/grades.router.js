import express from 'express';
import * as repository from '../repositories/grades.repository.js';

const router = express.Router();

router.post('/', (request, response) => {
    try{
        const {body} = request;
        const newGrade = repository.insert(body);
        response.send(newGrade);
    } catch (error){
        console.log(error.message);
    }
});

export default router;