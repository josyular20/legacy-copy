import ProfileScreen from '@/screens/app/profile/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import AllPersonasScreen from '../screens/app/profile/AllPersonasScreen';
import MyPersonaScreen from '../screens/app/profile/MyPersonaScreen';
import NotificationsScreen from '../screens/app/profile/NotificationsScreen';
import PasswordAndSecurityScreeen from '../screens/app/profile/PasswordAndSecurityScreen';
import PersonaScreen from '../screens/app/profile/PersonaScreen';

const Stack = createNativeStackNavigator();
/**
 * The Profile Stack contains all the screens related to the user's profile
 * - Profile Screen
 *  - My Persona Screen
 *     - All Personas Screen
 *      - Persona Screen
 *   - Password and Security Screen
 *   - Personal Access Screen
 *   - Notifications Screen
 * Currently the Personal Access Screen comoonent is not implemented
 * @returns ProfileStack
 */
export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile Screen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Profile Screen" component={ProfileScreen} />
      <Stack.Screen name="My Persona Screen" component={MyPersonaScreen} />
      <Stack.Screen name="All Personas Screen" component={AllPersonasScreen} />
      <Stack.Screen name="Persona Screen" component={PersonaScreen} />
      <Stack.Screen
        name="Password and Security Screen"
        component={PasswordAndSecurityScreeen}
      />
      <Stack.Screen
        name="Personal Access Screen"
        component={NotificationsScreen}
      />
      <Stack.Screen
        name="Notifications Screen"
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
}
