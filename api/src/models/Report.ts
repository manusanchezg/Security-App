import { prop, Ref, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { Boss, Supervisor, Watcher } from './user';

class Report {

   @prop({ required: true })
   public title: string;

   @prop()
   public description?: string;

   @prop()
   public picture?: string;

   @prop({ required: true, ref: () => Watcher || Supervisor })
   public sender: Ref<Watcher> | Ref<Supervisor>;

   @prop({ required: true, ref: () => Supervisor || Boss })
   public receiver: Ref<Supervisor> | Ref<Boss>;

}

const reportModel = getModelForClass(Report);
export default reportModel;