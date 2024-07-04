import { IModel } from './IModel';
import { ITag } from './ITag';

export interface IGuide extends IModel {
  guide_name: string;
  title: string;
  sub_title: string;
  author: string;
  author_image_url: string;
  mins_read: Number;
  date: Date;
  full_text: string;
  tags: ITag[];
}
