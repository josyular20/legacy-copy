import NotificationsToggle from '@/components/profile/NotificationsToggle';
import LegacyWordmarkWithBackArrow from '@/components/reusable/LegacyWordMarkWithBackArrow';
import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { Text, View } from 'native-base';

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Currently only stores user preferences in local storage and does not actually set up
// notifications.
export default function NotificationsScreen({ route, navigation }) {
  const [motivationReminders, setMotivationReminders] =
    useState<boolean>(false);
  const [progressReminders, setProgressReminders] = useState<boolean>(false);

  /**
   * Set Motivation Reminders to new value and store in local storage
   * @param newValue
   */
  const handleMotivationReminders = (newValue: boolean) => {
    setMotivationReminders(newValue);
    setItemAsync('motivationReminders', newValue.toString());
  };

  /**
   * Set Progress Reminders to new value and store in local storage
   * @param newValue
   */
  const handleProgressReminders = (newValue: boolean) => {
    setProgressReminders(newValue);
    setItemAsync('progressReminders', newValue.toString());
  };

  /**
   * Diplay users saved setings
   */
  const handleScreenSetup = async () => {
    setMotivationReminders(
      (await getItemAsync('motivationReminders')) === 'true'
    );
    setProgressReminders((await getItemAsync('progressReminders')) === 'true');
  };

  /**
   * Load in user's notifications settings from local storage
   */
  useEffect(() => {
    handleScreenSetup();
  }, []);

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <View width={340} marginTop={50} height={'auto'}>
        <LegacyWordmarkWithBackArrow
          handleOnPress={() => navigation.navigate('Profile Screen')}
        />
        <Text
          color="#252525"
          fontFamily="Roca Regular"
          fontSize={24}
          fontWeight={'700'}
          lineHeight={35}
          marginTop={18}
          marginBottom={10}
        >
          Notifications
        </Text>
        <NotificationsToggle
          title="Allow motivation reminders"
          toggle={motivationReminders}
          toggleChange={handleMotivationReminders}
        />
        <NotificationsToggle
          title="Allow progress reminders"
          toggle={progressReminders}
          toggleChange={handleProgressReminders}
        />
      </View>
    </SafeAreaView>
  );
}
