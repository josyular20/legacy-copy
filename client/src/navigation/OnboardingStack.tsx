import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import { OnboardingProvider } from '../contexts/OnboardingContext';
import HomeScreen from './BottomTabNavigator';
import PersonaScreen from '../screens/auth/PersonaScreen';
import QuestionaireScreen from '../screens/auth/QuestionaireScreen';
import QuizSectionIntroScreen from '../screens/auth/QuizSectionIntroScreen';
import SignUpTransitionScreen from '../screens/auth/SignUpTransitionScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  return (
    <OnboardingProvider>
      <Stack.Navigator
        initialRouteName={'Sign Up Transition Screen'}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Questionaire Screen"
          component={QuestionaireScreen}
        />
        <Stack.Screen
          name="Sign Up Transition Screen"
          component={SignUpTransitionScreen}
        />
        <Stack.Screen
          name="Quiz Section Intro Screen"
          component={QuizSectionIntroScreen}
        />
        <Stack.Screen name="Persona Screen" component={PersonaScreen} />
      </Stack.Navigator>
    </OnboardingProvider>
  );
}
