import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import { useUser } from '@/contexts/UserContext';
import AppStack from '@/navigation/AppStack';
import AuthStack from '@/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { Animated, Easing } from 'react-native';
import { View } from 'native-base';

import React, { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';

export default function Router() {
  const { completedOnboarding, loading } = useUser();
  // const fadeAnim = useRef(new Animated.Value(0)).current;

  // const fadeInAndOut = () => {
  //   Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(fadeAnim, {
  //         toValue: 1,
  //         duration: 1500, // Adjust the duration to control the speed of the fade-in
  //         easing: Easing.bezier(0.23, 0.46, 0.61, 0.75),
  //         useNativeDriver: true,
  //       }),
  //       Animated.timing(fadeAnim, {
  //         toValue: 0, // Adjust the opacity to which it fades out
  //         duration: 1500, // Adjust the duration to control the speed of the fade-out
  //         easing: Easing.bezier(0.23, 0.46, 0.61, 0.75),
  //         useNativeDriver: true,
  //       }),
  //     ]),
  //     { iterations: loading ? -1 : 0 }
  //   ).start();
  // };

  // useEffect(() => {
  //   if (loading) {
  //     fadeInAndOut();
  //   } else {
  //     fadeAnim.setValue(0);
  //   }
  // }, [loading, fadeAnim]);

  if (completedOnboarding === undefined) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // if (loading) {
  //   return (
  //     <View
  //       flex={1}
  //       justifyContent="center"
  //       alignItems="center"
  //       backgroundColor="#FFF9EE"
  //     >
  //       <Animated.View
  //         style={{
  //           opacity: fadeAnim,
  //         }}
  //       >
  //         <LegacyWordmark />
  //       </Animated.View>
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {completedOnboarding ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
