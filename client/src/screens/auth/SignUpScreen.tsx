import Footer from '@/components/reusable/Footer';
import ScreenWideButton from '@/components/reusable/HalfScreenWideButton';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import LetsGo from '@/components/reusable/LetsGo';
import ScreenWideInput from '@/components/reusable/ScreenWideInput';
import SmallRoundedButton from '@/components/reusable/SmallRoundedButton';
import { useUser } from '@/contexts/UserContext';
import { View } from 'native-base';
import { z } from 'zod';

import { useEffect, useState } from 'react';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

type SignupData = {
  username: string;
  email: string;
  password: string;
  date: Date;
};

// TODO: signup is still not fully reistant
export default function SignUpScreen({ route, navigation }) {
  const { createAccount } = useUser();

  const emailSchema = z.string().email('Invalid email format');
  const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long');

  const [signupData, setSignupData] = useState<SignupData>({
    username: '',
    email: '',
    password: '',
    date: new Date()
  });

  const signUp = () => {
    const signup = async () => {
      const { username, email, password, date } = signupData;

      if (!username || !email || !password || !date) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      try {
        emailSchema.parse(signupData.email);
        passwordSchema.parse(signupData.password);
      } catch (error) {
        if (error instanceof z.ZodError) {
          Alert.alert('Error', error.issues[0].message);
          return;
        }
      }

      // TODO: Date doesnt actually get passed through
      const response = await createAccount(username, email, password);
      if (response instanceof Error) {
        Alert.alert('Error', response.message);
        setSignupData({
          username: '',
          email: '',
          password: '',
          date: new Date()
        });
        return;
      }
      navigation.setOptions();
      navigation.navigate('Onboarding Stack');
    };

    signup();
  };

  // for debugging
  // useEffect(() => {
  //   console.log('username: ', signupData.username);
  //   console.log('email: ', signupData.email);
  //   console.log('password: ', signupData.password);
  //   console.log('date: ', signupData.date);
  // }, [signupData]);

  const switchToLogin = () => {
    navigation.navigate('Login Screen');
  };

  return (
    <>
      <View bg={'creamyCanvas'} alignItems="center" h={h('100%')} w={w('100%')}>
        <View
          alignItems="center"
          width={w('80%')}
          flexDirection="row"
          justifyContent="space-between"
          justifyItems={'center'}
          paddingTop={h('8%')}
        >
          <LegacyWordmark />
          <SmallRoundedButton title="Login" onClick={switchToLogin} />
        </View>
        <View paddingTop={h('7%')}>
          <LetsGo />
        </View>
        <View alignItems={'center'} paddingTop={h('6.5%')}>
          <ScreenWideInput
            placeholderText="Example"
            title="Username"
            iconName="user-o"
            onChangeText={(value) =>
              setSignupData({ ...signupData, username: value })
            }
            value={signupData.username}
          />
          <View paddingTop={h('3%')}>
            <ScreenWideInput
              placeholderText="example@email.com"
              title="Email"
              iconName="envelope-o"
              onChangeText={(value) =>
                setSignupData({ ...signupData, email: value })
              }
              value={signupData.email}
            />
          </View>
          <View paddingTop={h('3%')} paddingBottom={h('4%')}>
            <ScreenWideInput
              placeholderText="Must be at least 8 characters long"
              title="Password"
              iconName="lock"
              password={true}
              onChangeText={(value) =>
                setSignupData({ ...signupData, password: value })
              }
              value={signupData.password}
            />
          </View>
          {/* TODO: move this to a valid section for user data collection*/}
          {/* <View paddingTop={h('3%')} paddingBottom={h('3%')}>
            <ScreenWideInput
              title="Date of Birth"
              onChangeText={(value) => setSignupData({ ...signupData, date: value })}
              placeholderText="Select your date of birth"
              iconName="calendar"
              disabled={false}
              password={false}
              isDatePicker={true}
            />
          </View> */}
          <View
            width={w('80%')}
            alignItems={'center'}
            flexDirection={'row'}
            justifyContent={'space-between'}
          >
            <ScreenWideButton
              text="Sign up with SSO"
              textColor={'#000000'}
              backgroundColor={'transparent'}
              borderColor={'lightGreen'}
              onClick={() => Alert.alert('Not implemented yet')}
            />
            <ScreenWideButton
              text="Sign up to Legacy"
              textColor={'#FFFFFF'}
              backgroundColor={'lightGreen'}
              borderColor={'lightGreen'}
              onClick={signUp}
            />
          </View>
          <View paddingTop={h('20%')}>
            <Footer />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16
  }
});
