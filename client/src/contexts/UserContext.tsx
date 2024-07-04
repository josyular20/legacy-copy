import { IOnboardingFlowState } from '@/interfaces/IOnboardingFlowState';
import { IProfile } from '@/interfaces/IProfile';
import { IUser } from '@/interfaces/IUser';
import {
  insertOnboardingResponse,
  updateOnboardingToComplete
} from '@/services/ProfileService';
import {
  createUserAndProfile,
  fetchProfile,
  fetchUserByFirebaseID,
  initalizeAllProgress
} from '@/services/UserService';
import { auth } from '@/utils/firebase';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import {
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword
} from 'firebase/auth';

import React, { useCallback, useContext, useEffect, useState } from 'react';

type UserContextData = {
  user: IUser | null;
  profile: IProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  completedOnboarding: boolean;
  setCompletedOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  refetchUser: () => Promise<void>;
  refetchProfile: () => Promise<void>;
  createAccount: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void | Error>;
  login: (email: string, password: string) => Promise<boolean | Error>;
  logout: () => Promise<void>;
  finishOnboarding: (
    onboardingFlowState: IOnboardingFlowState
  ) => Promise<void>;
  toggleOnboarding: (userID: number) => Promise<void>;
  changePassword: (oldPassowrd: string, newPassword: string) => Promise<void>;
};

type UserProviderProps = {
  children?: React.ReactNode;
};

const UserContext = React.createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [completedOnboarding, setCompletedOnboarding] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (fuser) => {
      // const user = await fetchUserByFirebaseID(fuser?.uid);
      console.log('[user context] fuser', fuser);

      if (fuser) {
        const userData = await fetchUserByFirebaseID(fuser.uid);

        console.log('[user context] UE userData', userData);
        console.log('[user context] UE user', user);
        console.log('[user context] UE profile', profile);
        console.log(
          '[user context] UE completedOnboarding',
          completedOnboarding
        );
        console.log('[user context] UE firebaseUser', firebaseUser);

        if (userData.persona_id !== null) {
          const profileData = await fetchProfile(userData.id);

          setProfile(profileData);
          setUser(userData);
          setFirebaseUser(fuser);
          setCompletedOnboarding(profileData.completed_onboarding_response);

          console.log('[user context] profileData', profileData);
          console.log(
            '[user context] completedOnboarding',
            profileData.completed_onboarding_response
          );

          await setItemAsync('firebaseUser', JSON.stringify(user));
          await setItemAsync('user', JSON.stringify(userData));
          await setItemAsync('profile', JSON.stringify(profile));
          await setItemAsync(
            'completedOnboarding',
            JSON.stringify(profileData.completed_onboarding_response)
          );
        } else {
          // If onboarding isn't completed, clear stored data
          await deleteItemAsync('firebaseUser');
          await deleteItemAsync('user');
          await deleteItemAsync('profile');
          await deleteItemAsync('completedOnboarding');
          setUser(null);
          setProfile(null);
          setCompletedOnboarding(false);
          setFirebaseUser(null);
          signOut(auth);
        }
        setLoading(false);

      } else {
        loadStorageData();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadStorageData = async (): Promise<void> => {
    try {
      const firebaseUserSeralized = await getItemAsync('firebaseUser');
      const userSeralized = await getItemAsync('user');
      const completedOnboardingSeralized = await getItemAsync(
        'completedOnboarding'
      );
      const profileSeralized = await getItemAsync('profile');

      if (
        !firebaseUserSeralized ||
        !userSeralized ||
        !completedOnboardingSeralized ||
        !profileSeralized
      ) {
        return;
      }

      const loadedFirebaseUser: FirebaseUser = JSON.parse(
        firebaseUserSeralized
      );
      const loadedUser: IUser = JSON.parse(userSeralized);
      const loadedProfile: IProfile = JSON.parse(profileSeralized);
      const loadedCompletedOnboarding: boolean = JSON.parse(
        completedOnboardingSeralized
      );

      console.log('[user context] loaded user', loadedUser);
      setUser(loadedUser);
      setFirebaseUser(loadedFirebaseUser);
      setProfile(loadedProfile);
      setCompletedOnboarding(loadedCompletedOnboarding);
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  };

  const refetchUser = async (): Promise<void> => {
    if (!user) return;

    try {
      const userResponse = await fetchUserByFirebaseID(user.firebase_id);
      setUser(userResponse);
      await setItemAsync('user', JSON.stringify(userResponse));
    } catch (error) {
      console.error(`Error refetching user:`, error);
    }
  };

  const refetchProfile = async (): Promise<void> => {
    if (!user) return;

    try {
      const profileResponse = await fetchProfile(user.id);
      setProfile(profileResponse);
      setCompletedOnboarding(profileResponse.completed_onboarding_response);
      await setItemAsync('profile', JSON.stringify(profileResponse));
      await setItemAsync(
        'completedOnboarding',
        JSON.stringify(profileResponse.completed_onboarding_response)
      );
    } catch (error) {
      console.error(`Error refetching profile:`, error);
    }
  };

  const finishOnboarding = useCallback(
    async (onboardingFlowState: IOnboardingFlowState): Promise<void> => {
      if (!profile) return;

      const updatedProfile: IProfile = {
        ...profile,
        onboarding_response: onboardingFlowState
      };

      try {
        console.log('[profile context] updated profile', updatedProfile);
        console.log('[profile context] updated profile profile id', profile.id);
        console.log(
          '[profile context] updated profile user id',
          profile.user_id
        );

        const profileResponse = await insertOnboardingResponse(
          updatedProfile.onboarding_response,
          profile.id,
          profile.user_id
        );
        setProfile(profileResponse);
        await setItemAsync('profile', JSON.stringify(profileResponse));
      } catch (error) {
        console.error(`Error updating onboardingFlowState in profile:`, error);
        // Handle error - show message or perform recovery action
      }
    },
    [profile]
  );

  const toggleOnboarding = async (userID: number): Promise<void> => {
    try {
      console.log('[profile context] user id', userID);
      const profile = await fetchProfile(userID);
      const profileRespnse = await updateOnboardingToComplete(profile.id);
      setProfile(profileRespnse);
      setCompletedOnboarding(profileRespnse.completed_onboarding_response);

      await initalizeAllProgress(userID);
      await setItemAsync('profile', JSON.stringify(profileRespnse));
      await setItemAsync(
        'completedOnboarding',
        JSON.stringify(profileRespnse.completed_onboarding_response)
      );
    } catch (error) {
      console.error(`Error setting onboarding to complete in profile:`, error);
      // Handle error - show message or perform recovery action
    }
  };

  const createAccount = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<Error> => {
    let firebaseUserCredential: UserCredential;
    try {
      firebaseUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setFirebaseUser(firebaseUserCredential.user);
      await setItemAsync(
        'firebaseUser',
        JSON.stringify(firebaseUserCredential.user)
      );
    } catch (error) {
      console.error('Error creating account:', error);

      if (error.code === 'auth/email-already-in-use') {
        return new Error('Email already in use');
      }

      if (error.code === 'auth/invalid-email') {
        return new Error('Invalid email');
      }

      if (error.code === 'auth/weak-password') {
        return new Error('Weak password');
      }

      return error;
    }

    try {
      const { user, profile } = await createUserAndProfile({
        username: fullName,
        email: email,
        password: password,
        firebase_id: firebaseUserCredential.user.uid
      });

      console.log('[user context] new user', user);
      console.log('[user context] new profile', profile);

      setUser(user);
      setProfile(profile);
      setCompletedOnboarding(profile.completed_onboarding_response);

      // await setItemAsync('user', JSON.stringify(user));
      // await setItemAsync('profile', JSON.stringify(profile));
      // await setItemAsync('completedOnboarding', JSON.stringify(profile.completed_onboarding_response));
    } catch (error) {
      return new Error('Something went wrong');
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean | Error> => {
    let stillInOnboarding: boolean;
    let user: IUser;
    let firebaseUserCredential: UserCredential;
    try {
      firebaseUserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(
        '[user context] firebaseUserCredential',
        firebaseUserCredential
      );

      setFirebaseUser(firebaseUserCredential.user);
      await setItemAsync(
        'firebaseUser',
        JSON.stringify(firebaseUserCredential.user)
      );
    } catch (error) {
      console.error('Error logging in:', error);

      if (error.code === 'auth/invalid-email') {
        return new Error('Invalid email');
      }

      if (error.code === 'auth/user-disabled') {
        return new Error('User disabled');
      }

      if (error.code === 'auth/user-not-found') {
        return new Error('User not found');
      }

      if (error.code === 'auth/wrong-password') {
        return new Error('Wrong password');
      }

      return error;
    }

    console.log('[user context] firebaseUser', firebaseUserCredential.user.uid);

    try {
      console.log(
        '[user context] firebaseUserId',
        firebaseUserCredential.user.uid
      );
      user = await fetchUserByFirebaseID(firebaseUserCredential.user.uid);

      console.log('[user context] user', user);
      setUser(user);
      await setItemAsync('user', JSON.stringify(user));
    } catch (error) {
      return new Error('Something went wrong');
    }

    // handle profile
    try {
      const profile = await fetchProfile(user.id);
      console.log('[user context] profile', profile);
      setProfile(profile);
      setCompletedOnboarding(profile.completed_onboarding_response);

      stillInOnboarding = !profile.completed_onboarding_response;
      console.log('[user context] stillInOnboarding', stillInOnboarding);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // return new Error('Error fetching profile');
    }

    if (profile && profile.completed_onboarding_response) {
      await setItemAsync('profile', JSON.stringify(profile));
      await setItemAsync(
        'completedOnboarding',
        JSON.stringify(profile.completed_onboarding_response)
      );
      await setItemAsync(
        'firebaseUser',
        JSON.stringify(firebaseUserCredential.user)
      );
    }

    console.log('[user context] LOGIN --------------------------');
    console.log('[user context] stillInOnboarding', stillInOnboarding);
    console.log('[user context] completedOnboarding', completedOnboarding);
    console.log('[user context] profile', profile);
    console.log('[user context] user', user);
    console.log('[user context] firebaseUser', firebaseUser);
    console.log('[user context] --------------------------');

    return stillInOnboarding;
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
      setProfile(null);
      setCompletedOnboarding(false);
      setFirebaseUser(null);
      await deleteItemAsync('firebaseUser');
      await deleteItemAsync('user');
      await deleteItemAsync('profile');
      await deleteItemAsync('completedOnboarding');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const changePassword = async (oldPassword: string, newPassword:string): Promise<void> => {
    try {
      console.log('[user context] oldPassword', oldPassword);
      await signInWithEmailAndPassword(auth, user?.email, oldPassword);
      console.log('logged in')
      // Get the user from the UserCredential
      await updatePassword(firebaseUser, newPassword);
      console.log('password changed')
    } catch (error) {
      throw error
    }
  }


  const contextValue: UserContextData = {
    user,
    profile,
    loading,
    completedOnboarding,
    setCompletedOnboarding,
    firebaseUser,
    refetchUser,
    refetchProfile,
    createAccount,
    login,
    logout,
    finishOnboarding,
    toggleOnboarding,
    changePassword,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
