import { API_BASE_URL } from '@/services/const';
import { sleep } from '@/utils/MockDelayUtil';
import axios from 'axios';

import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';
import { IPersona } from '../interfaces/IPersona';
import { IProfile } from '../interfaces/IProfile';

export const getProfile = async (user_id: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/users/${user_id}/profile`
    );
    console.log(
      '[profile service] fetching profile',
      `${API_BASE_URL}/users/${user_id}/profile`,
      response.data,
      'status',
      response.status
    );
    return response.data as IProfile;
  } catch (error) {
    console.log('Error fetching profile', error);
    throw new Error('Error fetching profile');
  }
};

export const updateProfile = async (
  profile: IProfile,
  profile_id: number
): Promise<void> => {
  try {
    await axios.patch(`${API_BASE_URL}/profiles/${profile_id}`, {
      name: profile.name,
      date_of_birth: profile.date_of_birth,
      phone_number: profile.phone_number,
      onboarding_response: profile.onboarding_response,
      completed_onboarding_response: profile.completed_onboarding_response,
      user_id: profile.user_id
    });
  } catch (error) {
    console.log('Error updating profile', error);
    throw new Error('Error updating profile');
  }
};

export const insertOnboardingResponse = async (
  onboardingResponse: IOnboardingFlowState,
  profile_id: number,
  user_id: number
): Promise<IProfile> => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/profiles/response/${profile_id}/${user_id}`,
      onboardingResponse
    );
    return response.data;
  } catch (error) {
    console.log('Error inserting onboarding response', error);
    throw new Error('Error inserting onboarding response');
  }
};

export const updateOnboardingToComplete = async (
  profile_id: number
): Promise<IProfile> => {
  console.log(
    '[profile service] updating onboarding to complete',
    `${API_BASE_URL}/profiles/complete/${profile_id}`
  );
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/profiles/complete/${profile_id}`
    );
    return response.data;
  } catch (error) {
    console.log('Error updating onboarding to complete', error);
    throw new Error('Error updating onboarding to complete');
  }
};

/**
 * Gets all the personas from the backend
 * @returns a list of personas
 */
export const getAllPersonas = async (): Promise<IPersona[]> => {
  try {
    const response = await axios.get<IPersona[]>(
      `http://localhost:8080/api/personas/`
    );
    return response.data;
  } catch (error) {
    console.log('Error fetching all personas', error);
    throw new Error('Error fetching all personas');
  }
};

/**
 * Gets the persona of the user with the given id
 * @param userID id for some user
 * @returns persona
 */
export const getPersona = async (userID: number): Promise<IPersona> => {
  console.log(
    '[profile service] getting persona',
    `${API_BASE_URL}/users/${userID}/persona`
  );
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userID}/persona`);
    return response.data as IPersona;
  } catch (error) {
    console.log('Error fetching persona', error);
    throw new Error('Error fetching persona');
  }
};
