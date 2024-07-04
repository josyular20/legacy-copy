import { IModel } from './IModel';

export interface ITask extends IModel {
  task_description: string;
  task_name: string;
}
