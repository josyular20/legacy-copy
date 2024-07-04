import { IFile } from '@/interfaces/IFile';
import { API_BASE_URL } from '@/services/const';
import { sleep } from '@/utils/MockDelayUtil';
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

/**
 * Fetches a list of file object from the server
 * @param userId the user id of the user to fetch files for
 * @param tag optional tag to filter files by
 * @returns a list of file objects
 */
export const fetchUserFilesList = async (userId: number, tag?: string[]) => {
  try {
    let response;
    const splitTag = tag?.join(',');
    if (tag) {
      response = await axios.get(`${API_BASE_URL}/files/${userId}/user`, {
        params: { tag: splitTag }
      });
    } else {
      response = await axios.get(`${API_BASE_URL}/files/${userId}/user`);
    }

    return response.data as IFile[];
  } catch (error) {
    console.log('Error fetching user files list', error);
    throw new Error('Error fetching user files list');
  }
};

/**
 * Fetches a file url from the server
 * @param fileId the id of the file to fetch
 * @returns the url of the file
 */
export const fetchFileURL = async (fileId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files/${fileId}`);
    return response.data as string;
  } catch (error) {
    console.log('Error fetching file URL', error);
    throw new Error('Error fetching file URL');
  }
};

/**
 * Uploads a file to the server
 * @param file a file object from the DocumentPicker
 * @param userId the user id of the user uploading the file
 * @returns the response from the server
 */
export const uploadFile = async (file: DocumentPicker.DocumentPickerAsset, userId: number) => {
  try {
    const uploadResumable = FileSystem.createUploadTask(
      `${API_BASE_URL}/files/${userId}`,
      file.uri,
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file_data',
      }
    );

    const response = await uploadResumable.uploadAsync();

    if (response.status === 200) {
      console.log('File uploaded!');
      return response;
    } else {
      console.log('Upload failed!');
      throw new Error('Upload failed!');
    }
  } catch (error) {
    console.log('Error uploading file', error);
    throw new Error('Error uploading file');
  }
}

export const createFile = async (
  userID: number,
  sub_task_name: string,
  data: object
) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/files/makepdf/${userID}/${sub_task_name}`,
      data
    );

    console.log('Response:', res.data);
  } catch (error) {
    console.log('Error:', error);
  }
};

/**
 * Deletes a file url from the server
 * @param fileId the id of the file to delete
 * @returns the response status
 */
export const deleteFile = async (fileId: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/files/${fileId}`);
    if (response.status === 200) {
      console.log('File deleted!');
      return response.status;
    } 
    
    console.log('Delete failed!');
    throw new Error('Delete failed!');
  } catch (error) {
    console.log('Error deleting the file', error);
    throw new Error('Error deleting the file');
  }
}
