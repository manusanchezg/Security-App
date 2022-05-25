import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import {ToDos} from './toDos';

class User {
    @prop({ required: true, lowercase:true,trim:true})
    public name!: string;

    @prop({ required: true, lowercase:true,trim:true})
    public lastName!: string;

    @prop({ required: true })
    public password!: string;
        
    @prop({ required: true })
    public dni!: number;
    
    @prop()
    public workingHours?: string;
    
    @prop({lowercase:true,trim:true})
    public probilePic?: string;
}

export class Boss extends User {
        
    @prop()
    public environment: string;
}

export class Supervisor extends User {
        
    @prop({ required: true })
    public environment: string;

    @prop({ ref: () => ToDos })
    public toDos: Ref<ToDos>;
}

export class Watcher extends User {
        
    @prop({ required: true })
    public environment: string;

    @prop({ ref: () => ToDos })
    public toDos: Ref<ToDos>;
}

export class Neighbour extends User {
        
    @prop({ required: true })
    public environment: string;
}

const UserModel = getModelForClass(User);
export default UserModel;