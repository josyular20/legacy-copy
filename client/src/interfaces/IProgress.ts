import { IModel } from './IModel';

export interface ISubtaskProgress extends IModel {
    sub_task_id: number;
    user_id: number;
    completed: boolean;
}

export interface ITasksProgress extends IModel {
    task_id: number;
    user_id: number;
    progress: number;
}
