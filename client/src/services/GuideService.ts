import { IGuide } from '@/interfaces/IGuide';
import { API_BASE_URL } from '@/services/const';
import { sleep } from '@/utils/MockDelayUtil';
import axios from 'axios';

export const fetchAllGuides = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guides/`);
    return response.data as IGuide[];
  } catch (error) {
    console.log('Error fetching all guides', error);
    throw new Error('Error fetching all guides');
  }
};

export const fetchGuideByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/guides/${name}`);
    return response.data as IGuide;
  } catch (error) {
    console.log('Error fetching guide by name', error);
    throw new Error('Error fetching guide by name');
  }
};
