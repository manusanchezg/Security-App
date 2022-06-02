import { bossModel, supervisorModel, watcherModel } from '../models/user';

async function logIn(dni:number, password:string){
    if(dni && password){
        try{
            let findBoss = await bossModel.find({dni, password})
            let findSupervisor= await supervisorModel.find({dni, password})
            let findWatcher= await watcherModel.find({dni, password})
            if(findBoss!==null) return findBoss
            if(findSupervisor!==null) return findSupervisor
            if(findWatcher!==null) return findWatcher
            return false
        }catch(err){
            console.log(err)
        }
    } else {
        throw new Error('complete the required fields')
    }
}

module.exports={
    logIn
}