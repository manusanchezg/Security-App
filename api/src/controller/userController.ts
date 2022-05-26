import {bossModel, neighbourModel, supervisorModel, watcherModel} from '../models/user';

async function SignUp(name:string, lastName:string, password:string, dni:number, role:string) {
    try {
        if(!role){
            var findDNI = await bossModel.findOne({dni: dni});
            if(!findDNI) {
                const boss = await bossModel.create({name, lastName, password, dni});
                boss.save();
            } else {
                throw new Error ("El usuario ya existe");
            }
        }
        if (role === "supervisor") {
            let findDNI = await supervisorModel.findOne({
                dni: dni
            })
            if (!findDNI) {
                const supervisor = await supervisorModel.create({
                    name, lastName, password, dni
                })
                supervisor.save()
            } else {
                throw new Error ("¡El supervisor con ese DNI ya existe!");
            }
        }
        if (role === "watcher") {
            let findDNI = await watcherModel.findOne({
                dni:dni
            })
            if(!findDNI){
                const watcher = await watcherModel.create({
                    name, lastName, password, dni
                })
                watcher.save();
            } else {
                throw new Error ("¡El guardia con ese DNI ya existe!");
            }
        }
    } catch (err:any) {
        throw new Error (err);
    }
}

async function GetUser(classOfuser:string) {
    try{   
        if(classOfuser==='supervisor') return await supervisorModel.find() 
        if(classOfuser==='watcher') return await watcherModel.find()
        if(classOfuser==='neighbour') return await neighbourModel.find()
    }catch(err:any){
        throw new Error(err)
    }    
}

async function GetUserById(id:any) {
    try{
        let findSupervisor= await supervisorModel.findById(id)
        let findWatcher= await watcherModel.findById(id)
        let findNeighbour= await neighbourModel.findById(id)
        if(findSupervisor!==null) return findSupervisor 
        if(findWatcher!==null) return findWatcher
        if(findNeighbour!==null) return findNeighbour
    }catch(err:any){
        throw new Error(err)
    }    
}

module.exports = {
    SignUp,
    GetUser,
    GetUserById
}