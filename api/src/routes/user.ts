import { Router } from 'express';
import {
    bossModel,
    supervisorModel,
    watcherModel,
    neighbourModel } from '../models/user'

const { signUp, GetUser, GetUserById } = require('../controller/userController');

const router = Router();
//* GET trae los usuarios segun la clase desde la Base de Datos
//http://localhost:3001/boss/?name={name}
router.get('/', async(req,res)=>{
    try{
        let {name} = req.query
        res.status(200).json(await GetUser(name))
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})
//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/boss/:id
router.get('/:id', async(req,res) => {
    try{
        let {id} = req.params
        let dataUser = await GetUserById(id)
        res.json(dataUser)
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

router.post('/', async (req, res) => {
    let { name, lastName, password, dni, role } = req.body;
    try {
        let data = signUp(name, lastName, password, dni, role);
        res.json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;