import AccessScreen from '@/screens/auth/AccessScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignUpScreen from '@/screens/auth/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import { useUser } from '../contexts/UserContext';
import OnboardingStack from './OnboardingStack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const { user } = useUser();
  const screenToDisplay = user === null ? 'Access Screen' : 'Onboarding Stack';

  console.log('[auth stack] user', user, 'screenToDisplay', screenToDisplay);

  return (
    <Stack.Navigator
      initialRouteName={screenToDisplay}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Access Screen" component={AccessScreen} />
      <Stack.Screen name="Login Screen" component={LoginScreen} />
      <Stack.Screen name="Sign Up Screen" component={SignUpScreen} />
      <Stack.Screen name="Onboarding Stack" component={OnboardingStack} />
    </Stack.Navigator>
  );
}
