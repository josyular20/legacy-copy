import HomeScreenGuides from '@/components/homescreen components/HomeScreenGuides';
import GuideCollectionScreen from '@/screens/app/GuideCollectionScreen';
import GuideScreen from '@/screens/app/GuideScreen';
import SubTaskSummaryScreen from '@/screens/app/tasks/SubTaskSummaryScreen';
import TaskScreen from '@/screens/app/tasks/TaskScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';

import HomeScreen from './BottomTabNavigator';
// import TaskStack from './TaskStack';
import ActionScreen from '@/screens/app/tasks/ActionScreen';
import GuidesComponent from '@/components/homescreen components/HomeScreenGuides';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Group>
        <Stack.Screen name="Task Screen" component={TaskScreen} />
        <Stack.Screen name="SubTask Summary Screen" component={SubTaskSummaryScreen} />
        <Stack.Screen name="Action Screen" component={ActionScreen} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Guide Collection Screen" component={GuideCollectionScreen} />
        <Stack.Screen name="Home Screen Guides" component={HomeScreenGuides} />
        <Stack.Screen name="Guide Screen" component={GuideScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
