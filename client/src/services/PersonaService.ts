import { API_BASE_URL } from '@/services/const';
import axios from 'axios';

import { IPersona } from '../interfaces/IPersona';
import { IUser } from '../interfaces/IUser';

export const fetchUserPersona = async (user_id: number): Promise<IPersona> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${user_id}/persona`
    );
    return response.data;
  } catch (error) {
    console.log('Error fetching user persona', error);
    throw new Error('Error fetching user persona');
  }
};
