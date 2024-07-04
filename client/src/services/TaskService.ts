import { ITasksProgress } from '@/interfaces/IProgress';
import { ITask } from '@/interfaces/ITask';
import { API_BASE_URL } from '@/services/const';
import { sleep } from '@/utils/MockDelayUtil';
import axios from 'axios';

export const fetchUserTasks = async (userId: number, tag?: string[]) => {
  try {
    let response;
    const splitTag = tag?.join(',');
    if (tag) {
      response = await axios.get(`${API_BASE_URL}/tasks/${userId}/user`, {
        params: { tag: splitTag }
      });
    } else {
      response = await axios.get(`${API_BASE_URL}/tasks/${userId}/user`);
    }

    return response.data as ITask[];
  } catch (error) {
    console.log(
      'Error fetching user tasks',
      error,
      'userId',
      userId,
      'tag',
      tag
    );
    throw new Error('Error fetching user tasks');
  }
};

export const fetchTaskTag = async (taskId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}/tag`);
    return response.data as string;
  } catch (error) {
    console.log('Error fetching task tag', error);
    throw new Error('Error fetching task tag');
  }
};

export const fetchTask = async (taskId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data as ITask;
  } catch (error) {
    console.log('Error fetching task', error);
    throw new Error('Error fetching task');
  }
}

export const getTaskProgress = async (userID: number, taskID: number) => {
  console.log(`[TasksService] getTaskProgress(${userID}, ${taskID})`)
  try {
    const response = await axios.get(`${API_BASE_URL}/progresses/task/${userID}/${taskID}`);
    return response.data as ITasksProgress;
  } catch (error) {
    console.log('Error getting task progress', error);
    throw new Error('Error getting task progress');
  }
}