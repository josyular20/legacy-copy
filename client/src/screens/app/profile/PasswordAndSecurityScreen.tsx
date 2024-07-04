import PasswordInput from '@/components/profile/PasswordInput';
import LegacyWordmarkWithBackArrow from '@/components/reusable/LegacyWordMarkWithBackArrow';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import { Text, View } from 'native-base';
import { Alert } from 'react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { useUser } from '@/contexts/UserContext';

export default function PasswordAndSecurityScreeen({ route, navigation }) {
  const [curentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');
  
  //
  const { user, changePassword } = useUser();

  /**
   * Navigate to Profile Screen
   */
  const toProfile = () => {
    navigation.navigate('Profile Screen');
  };

  const resetFields = () => {
    setCurrentPassword('');
    setNewPassword('');
    setRetypeNewPassword('');
  }

  /**
   * Save password and navigate to Profile Screen
   */
  const handleSavePassword = async () => {
    console.log('pressed save password');
    if (newPassword !== retypeNewPassword) {
      Alert.alert('Error', 'Passwords do not match', [{ text: 'OK', onPress: () => resetFields() }]);
      return;
    }
    try {
      passwordSchema.parse(newPassword);
      await changePassword(curentPassword, newPassword);
      Alert.alert('Succesful', 'Password changed',[{ text: 'OK', onPress: () => toProfile() }]);
    }
    catch (error) {
      if (error instanceof z.ZodError) {
          Alert.alert('Error','Password must be at least 8 characters long', [{ text: 'OK', onPress: () => resetFields() }]);
          return;
      }
      else {
        Alert.alert('Error', error.message, [{ text: 'OK', onPress: () => resetFields() }]);
        return;
      }
      
    }
  };

  /**
   * Password schema for validation. Passwords must be at least 8 characters long
   */
  const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long');

 

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <View width={340} marginTop={50} height={'auto'}>
        <LegacyWordmarkWithBackArrow handleOnPress={() => toProfile()} />
        <Text
          color="#252525"
          fontFamily="Open Sans"
          fontSize={15}
          fontWeight={'700'}
          lineHeight={20}
          marginTop={18}
          marginBottom={5}
        >
          Change Password
        </Text>
        <PasswordInput
          title={'Type your current password'}
          password={curentPassword}
          handleOnChange={setCurrentPassword}
        />
        <PasswordInput
          title={'Retype your new password'}
          password={newPassword}
          handleOnChange={setNewPassword}
        />
        <PasswordInput
          title={'Type your new password'}
          password={retypeNewPassword}
          handleOnChange={setRetypeNewPassword}
        />
        <ScreenWideButton
          text={'Save password'}
          textColor="white"
          backgroundColor="#43A573"
          borderColor="#43A573"
          width={'100%'}
          onClick={() => {
            handleSavePassword();
          }}
        />
        <View alignItems={'center'} marginTop={5}>
          <Pressable
            onPress={() => {
              console.log('pressed forgot password');
            }}
          >
            <Text underline>Forgot Password</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
