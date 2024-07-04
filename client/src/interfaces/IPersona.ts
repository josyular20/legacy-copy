import { IModel } from './IModel';
import { ITask } from './ITask';

export interface IPersona extends IModel {
  persona_description: string;
  persona_title: string;
  tasks: ITask[];
}
