import { IModel } from '@/interfaces/IModel';

export interface IFile extends IModel {
  file_name: string;
  user_id: number;
  file_size: number;
  object_key: string;
  tags: string[];
}
