import BackArrowIcon from '@/components/icons/BackArrow';
import Footer from '@/components/reusable/Footer';
import HalfScreenWideButton from '@/components/reusable/HalfScreenWideButton';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import LetsGo from '@/components/reusable/LetsGo';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import ScreenWideInput from '@/components/reusable/ScreenWideInput';
import SmallRoundedButton from '@/components/reusable/SmallRoundedButton';
import { useUser } from '@/contexts/UserContext';
import { View } from 'native-base';
import { z } from 'zod';

import { useState } from 'react';
import React from 'react';
import { Alert } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

export default function LoginScreen({ route, navigation }) {
  const { login } = useUser();

  const emailSchema = z.string().email('Invalid email format');
  const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    const handleLogin = async () => {
      if (email === '' || password === '') {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      try {
        emailSchema.parse(email);
        passwordSchema.parse(password);
      } catch (error) {
        if (error instanceof z.ZodError) {
          Alert.alert('Error', error.issues[0].message);
          return;
        }
      }

      const response = await login(email, password);
      console.log('[login screen] RESPONSE', response);

      if (response instanceof Error) {
        Alert.alert('Error', response.message);
        setEmail('');
        setPassword('');
        return;
      } else if (response === true) {
        navigation.navigate('Onboarding Stack');
      }
    };

    handleLogin();
  };

  const switchToSignUp = () => {
    navigation.navigate('Sign Up Screen');
  };

  return (
    <View bg={'creamyCanvas'} alignItems="center" h={h('100%')} w={w('100%')}>
      <View height={h('8%')}></View>
      <View
        width={w('80%')}
        flexDirection="row"
        justifyContent="space-between"
        justifyItems={'center'}
      >
        <LegacyWordmark />
        <SmallRoundedButton title="Sign Up" onClick={switchToSignUp} />
      </View>
      <View paddingTop={h('7%')}>
        <LetsGo />
      </View>
      <View alignItems={'center'} paddingTop={h('6.5%')}>
        <ScreenWideInput
          placeholderText="example@email.com"
          title="Email"
          iconName="envelope-o"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <View paddingTop={h('3%')} paddingBottom={h('4%')}>
          <ScreenWideInput
            placeholderText="Must be at least 8 characters long"
            title="Password"
            iconName="lock"
            password={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>
        <View
          width={w('80%')}
          alignItems={'center'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <HalfScreenWideButton
            text={'Login with SSO'}
            textColor={'#000000'}
            backgroundColor={'transparent'}
            borderColor={'lightGreen'}
          />
          <HalfScreenWideButton
            text={'Login to Legacy'}
            textColor={'#FFFFFF'}
            backgroundColor={'lightGreen'}
            borderColor={'lightGreen'}
            onClick={signIn}
          />
        </View>
        <View paddingTop={h('31%')}>
          <Footer />
        </View>
      </View>
    </View>
  );
}
