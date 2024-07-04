import Footer from '@/components/reusable/Footer';
import ScreenWideButton from '@/components/reusable/HalfScreenWideButton';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import LetsGo from '@/components/reusable/LetsGo';
import ScreenWideInput from '@/components/reusable/ScreenWideInput';
import SmallRoundedButton from '@/components/reusable/SmallRoundedButton';
import { useUser } from '@/contexts/UserContext';
import { View } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { z } from 'zod';

type SignupData = {
  firstName: string;
  lastName: string;
  phone: string;
  date: Date;
};

// TODO: signup is still not fully reistant
export default function SignUpScreen({ route, navigation }) {
  const { createAccount } = useUser();

  const [signupData, setSignupData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    phone: '',
    date: new Date()
  });

  const signUp = () => {
    const signup = async () => {
      const { firstName, lastName, phone, date } = signupData;

      if (!firstName || !lastName || !phone || !date) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }


      // TODO: Date doesnt actually get passed through
      const response = await createAccount(firstName, lastName, phone)
      if (response instanceof Error) {
        Alert.alert('Error', response.message)
        setSignupData({
            firstName: '',
          lastName: '',
          phone: '',
          date: new Date()
        });
        return;
      }
      navigation.setOptions();
      navigation.navigate('Onboarding Stack');
    }

    signup();
  };

  // for debugging
  useEffect(() => {
    console.log('firstName: ', signupData.firstName)
    console.log('lastName: ', signupData.lastName)
    console.log('password: ', signupData.phone)
    console.log('date: ', signupData.date)
  }, [signupData]);

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
            title="First Name"
            iconName="user-o"
            onChangeText={(value) => setSignupData({ ...signupData, firstName: value })}
            value={signupData.firstName}
          />
          <View paddingTop={h('3%')}>
            <ScreenWideInput
              placeholderText="Example"
              title="Last Name"
              iconName="user-o"
              onChangeText={(value) => setSignupData({ ...signupData, lastName: value })}
              value={signupData.lastName}
            />
          </View>
          <View paddingTop={h('3%')} paddingBottom={h('4%')}>
            <ScreenWideInput
              placeholderText="In the format of 1234567890"
              title="Phone"
              iconName="lock"
              password={true}
              onChangeText={(value) => setSignupData({ ...signupData, phone: value })}
              value={signupData.phone}
            />
          </View>
          {/* TODO: move this to a valid section for user data collection*/}
          <View paddingTop={h('3%')} paddingBottom={h('3%')}>
            <ScreenWideInput
              title="Date of Birth"
              onChangeText={(value) => setSignupData({ ...signupData, date: value })}
              placeholderText="Select your date of birth"
              iconName="calendar"
              disabled={false}
              password={false}
              isDatePicker={true}
            />
          </View>
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
