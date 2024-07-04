import { z } from 'zod';

import { IModel } from './IModel';

/* Example of data validation with zod */
export const UserSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  persona_id: z.number().optional(),
  firebase_id: z.string()
});

export type User = z.infer<typeof UserSchema>;

export interface IUser extends IModel {
  username: string;
  email: string;
  password: string;
  persona_id?: number;
  firebase_id: string;
}
