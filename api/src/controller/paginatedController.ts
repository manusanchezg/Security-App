import { bossModel, supervisorModel } from '../models/user';
import toDosModel from '../models/toDos';

//* funcion que reemplaza el operador LIKE en las busquedas por nombre
function escapeStringRegexp(string:any) {
    if (typeof string !== 'string') {
        throw new TypeError('Expected a string');
    }
    return string
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
}

//*Controlador Paginado de Usuarios
//* query
//* id = identifica sobre que usuario hacer el paginado Boss/Supervisor
//* limit = cantidad de usuario para ver por pagina
//* skip = Desde que usuario empieza a contar ej: 0 igual al primer usuario
//* name = realiza el paginado segun el resultado de la busqueda de nombre
async function getEmployeesPaginatedManager (id:string, limit:number, skip:number, name:string){
    try{
        if(id && limit && skip && !name){
            return await getPaginatedAll(id, limit, skip)
        }else if(id && limit && skip && name){
            return await getPaginatedEmployeesByName(id, limit, skip, name)
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

//* Realiza el paginado sobre todos los usuarios segun limit y skip.
async function getPaginatedAll (id:string, limit:number, skip:number){
    try{
        let boss = await bossModel.findById(id);
        if(boss){
            let number = await bossModel.find({id:id}).populate({path:'supervisor'});
            let count:any;
             if (number){
                 count = { count : (number[0].supervisor).length}
             }else{
                 count = { count : 0}
             }
             let boss:any = await bossModel.find({id:id}).populate({
                 path:'supervisor',
                 options:{ limit, skip}
                })
            let response = [...boss, count]
            return response;
        }else{
            let number = await supervisorModel.find({id:id}).populate({path:'watcher'});
            let count:any
            if(number){
               count = {count :(number[0].watcher).length}
            }else{
                count= {count : 0}
            }
            let supervisor = await supervisorModel.find({id:id}).populate({
                path:'watcher',
                options:{ limit, skip }
            })
            let response = [...supervisor,count] 
          return response
        }
    }catch(error:any){
        throw new Error(error.message);
    }
}

//*Realiza un filtrado especifico segun el resultado de busqueda del nombre con limit y skip.
async function getPaginatedEmployeesByName (id:string, limit:number, skip:number, name:string){
    let $regex = escapeStringRegexp(name)
    try{
        let boss = await bossModel.findById(id);
        if(boss){
            let number = await bossModel.find({id:id}).populate({path:'supervisor',match:{ name: {$regex} }});
            let count:any;
            if(number){
                count = { count: (number[0].supervisor).length}
            }else{
                count = { count: 0 }
            }
            let boss = await bossModel.find({id:id}).populate({
                path: 'supervisor',
                match: { name: {$regex}},
                options: { limit, skip}
            })
            let response = [...boss, count]
            return response
        }else {
            let number = await supervisorModel.find({id:id}).populate({path:'watcher', match: { name: {$regex}}});
            let count:any;
            if(number){
                count={ count :(number[0].watcher).length}
            }else{
                count={ count: 0}
            }
            let supervisor:any = await supervisorModel.find({id:id}).populate({
                path:'watcher',
                match: { name: {$regex}},
                options:{ limit, skip }
            })
            let response = [...supervisor, count]
            return response
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

//*Controlador de paginado para Tareas
//* query
//* id = identifica sobre que usuario hacer el paginado Supervisor/Watcher
//* limit = cantidad de tareas para ver por pagina
//* skip = Desde que tarea empieza a contar ej: 0 igual a la primer tarea del usuario
//* name = realiza el paginado segun el resultado de la busqueda de nombre.
async function getTodosPaginatedManager(id:string, limit:number, skip:number, name:string){
    try{
        if(id && limit && skip && !name){
            return await getToDosPaginatedAll(id, limit, skip)
        }else if (id && limit && skip && name){
            return await getToDosPaginatedFilterName(id, limit, skip, name)
        }
    }catch(error:any){
        throw new Error(error.message)
    }
}

//* Realiza el paginado sobre todas las tareas segun limit y skip
async function getToDosPaginatedAll (id:string, limit:number, skip:number) {
    try{
        let response = await toDosModel.find({responsible: id}).skip(skip).limit(limit)
        return response
    }catch(error:any){
        throw new Error(error.message)
    }
}
//* Realiza un filtrado especifico segun el resultado de busqueda del nombre con limit y skip
async function getToDosPaginatedFilterName (id:string, limit:number, skip:number, name:string){
    let $regex = escapeStringRegexp(name)
    try{
        return await toDosModel.find({$and:[
            {responsible:id},
            {name:{$regex}}
        ]}).skip(skip).limit(limit)
    }catch(error:any){
        throw new Error(error.message)
    }
}

module.exports = {
    getEmployeesPaginatedManager,
    getTodosPaginatedManager,
}