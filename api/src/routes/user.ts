import { Router } from 'express';
const { getEmployeesAriel, signUp, getUserById, getUserByHierarchy, deleteUser, updateUser } = require('../controller/userController');
const {logIn} = require('../controller/logInController')
const router = Router();

// //* GET trae los usuarios segun la clase desde la Base de Datos
// //http://localhost:3001/user/?name={name}
// router.get('/', async(req,res)=>{
//     try{
//         let { role } = req.query;
//         let users = await getUsers(role);
//         res.status(200).json(users);
//     }catch(error){
//         if (error instanceof Error) {
//             res.status(404).json(error.message);
//         } else {
//             console.log('Unexpected Error', error);
//         }
//     }
// })
// const isAuth= async(req,res,next)=>{
//     let {id} = req.cookies
//     let findUser = await getUserById(id)
//     if(findUser!==null){
//         res.redirect('/:id')
//     }
//     next()
// }

//* GET trae los usuarios segun el id desde la Base de Datos
//http://localhost:3001/user/:id   //*id por params
router.get('/:id', async(req,res) => {
    try{
        let {id}=req.cookies
        //let {id} = req.params
        let dataUser = await getUserById(id)
        res.json(dataUser)
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//Login (prueba)
router.post('/login', async(req, res)=>{
    try{
        let {dni, password}= req.body
        let findUser = await logIn(dni, password)
        console.log("acaaaaaaa",findUser[0].id)
        if(findUser!==false){
            res.cookie('id',findUser[0].id)
            res.redirect(`/:id`)
        }else{
            res.redirect('/login')
        }
    }catch(err){
        console.log(err)
    }
})



//*GET trae de un Boss por id los supervisores que tiene a su cargo
//* y si el id es de supervisor trae del mismo los watchers a su cargo
//http://localhost:3001/user/:id?name=name
router.get('/employees/:id', async (req, res)=> {
    try{
        let { id } = req.params;
        let { name } = req.query;
        let userData = await getUserByHierarchy(id, name);
        res.json(userData);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})


//* POST crea un usuario segun el role: boss/supervisor/watcher
//http://localhost:3001/user  //*datos enviados por body
router.post('/:id', async (req, res) => {
    let { id } = req.params;
    let { name, lastName, password, dni, email, telephone, workingHours, profilePic } = req.body;
    try {
        let data = await signUp(id, name, lastName, password, dni, email, telephone, workingHours, profilePic);
        res.json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*PUT modifica los datos de un usuario segun su role: supervisor/watcher
//http://locahost:3001/user/:id   //*id por params, datos por body
router.put('/:id', async (req, res)=>{
    let { id } = req.params;
    let {  role, name, lastName, password, dni, workingHours, probilePic } = req.body
    try{
        let data = await updateUser(id,role, name, lastName, password, dni, workingHours, probilePic);
        res.json(data)
    }catch(error){
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

//*DELETE elimina un usuario segun su rol: supervisor/watcher
//http://localhost:3001/user/:id  //*id por params
router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    let { role } = req.body;
    try{
        let message = await deleteUser(id, role);
        res.json(message);
    }catch(error){        
        if (error instanceof Error) {
            res.status(404).json(error.message);
        } else {
            console.log('Unexpected Error', error);
        }
    }
})

export default router;