import { IProfile } from '@/interfaces/IProfile';
import { IUser } from '@/interfaces/IUser';
import { API_BASE_URL } from '@/services/const';
import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';

/**
 * Fetches a user from the API
 * @param userID the ID of the user to fetch
 * @returns the user [IUser]
 */
export const fetchUser = async (userID: number): Promise<IUser> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userID}`);
    console.log(
      '[user service] fetching user',
      `${API_BASE_URL}/users/${userID}`,
      'with status',
      response.status
    );
    return response.data;
  } catch (error) {
    console.log('Error fetching user', error);
    throw new Error('Error fetching user');
  }
};

export const fetchUserByFirebaseID = async (
  firebaseID: string
): Promise<IUser> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/firebase/${firebaseID}`
    );
    console.log(
      '[user service] fetching user by firebase id',
      `${API_BASE_URL}/users/firebase/${firebaseID}`,
      'with status',
      response.status
    );
    return response.data;
  } catch (error) {
    console.log('Error fetching user using firebase id', error);
    throw new Error('Error fetching user using firebase id');
  }
};

export const fetchProfile = async (userID: number): Promise<IProfile> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userID}/profile`);
    console.log(
      '[user service] fetching profile',
      `${API_BASE_URL}/users/${userID}/profile`,
      'with status',
      response.status
    );
    return response.data;
  } catch (error) {
    console.log('Error fetching profile', error);
    throw new Error('Error fetching profile');
  }
};

export const fetchUserAndProfile = async (
  firebaseID: string
): Promise<{
  user: IUser;
  profile: IProfile;
}> => {
  try {
    const user = await fetchUserByFirebaseID(firebaseID);
    console.log('USER', user);
    const profile = await fetchProfile(user.id);
    console.log('PROFILE', profile);
    return { user, profile };
  } catch (error) {
    console.log('Error fetching user and profile', error);
    throw new Error('Error fetching user and profile');
  }
};

export const createUserAndProfile = async (user: IUser) => {
  try {
    const newUser: AxiosResponse<IUser> = await axios
      .post(`${API_BASE_URL}/users/`, {
        username: user.username,
        password: user.password,
        email: user.email,
        firebase_id: user.firebase_id
      })
      .catch((err) => {
        return err;
      });

    const newProfile: AxiosResponse<IProfile> = await axios
      .post(`${API_BASE_URL}/profiles/`, {
        name: user.email.split('@')[0],
        date_of_birth: new Date(2000, 10, 7),
        phone_number: '123456789',
        user_id: newUser.data.id
      })
      .catch((err) => {
        return err;
      });

    return { user: newUser.data, profile: newProfile.data };
  } catch (error) {
    console.log('Error creating user and profile', error);
    throw new Error('Error creating user and profile');
  }
};

export const initalizeAllProgress = async (userID: number) => {
  console.log('INITIALIZING PROGRESS');
  try {
    await axios
      .post(`${API_BASE_URL}/users/${userID}/progress`)
      .then((res) => console.log(res.data));
  } catch (error) {
    console.log('Error initializing progress', error);
    throw new Error('Error initializing progress');
  }
};
