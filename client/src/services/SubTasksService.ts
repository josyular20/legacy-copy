import axios from 'axios';

import { ISubTask } from '../interfaces/ISubTask';
import { API_BASE_URL } from './const';
import { sleep } from '@/utils/MockDelayUtil';
import { ISubtaskProgress } from '@/interfaces/IProgress';

export const getAllSubTasks = async (taskID: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskID}/subtasks`);
    return response.data as ISubTask[];
  } catch (error) {
    console.log('Error fetching subtasks', error);
    throw new Error('Error fetching subtasks');
  }
}

export const completeSubTask = async (userID: number, subTaskID: number) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/progresses/subtask/${userID}/${subTaskID}/complete`);
    return response.data as ISubTask;
  } catch (error) {
    console.log('Error completing subtask', error);
    throw new Error('Error completing subtask');
  }
}

export const getSubtaskProgress = async (userID: number, subTaskID: number) => {
  console.log(`[SubTasksService] getSubtaskProgress(${userID}, ${subTaskID})`)
  try {
    const response = await axios.get(`${API_BASE_URL}/progresses/subtask/${userID}/${subTaskID}`);
    return response.data as ISubtaskProgress;
  } catch (error) {
    console.log('Error getting subtask progress', error);
    throw new Error('Error getting subtask progress');
  }
}