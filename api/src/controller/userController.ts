import UserModel from '../models/user';

async function SignIn(name:string,lastName:string,password:string,dni:number,role:string, environment:string) {
    let findInDb = await UserModel.findOne({
        dni: dni,
    })

    if(findInDb===null){
        let createUser = await UserModel.create({
            name,
            lastName,
            password,
            role,
            dni,
            environment
        }) 
        createUser.save()
        return 'Usuario creado correctamente...'
    }
    return 'El usuario ya existe...'
}

module.exports = {
    SignIn,
}