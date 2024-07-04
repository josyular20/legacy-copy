import Tree from '@/components/icons/Tree';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import { useUser } from '@/contexts/UserContext';
import { Text, View } from 'native-base';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

// TODO: arrow functionssss
export default function AccessScreen({ navigation }) {
  const toSignUp = () => {
    navigation.navigate('Sign Up Screen');
  };

  const toLogin = () => {
    navigation.navigate('Login Screen');
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF9EE' }}>
      <View h={h('100%')} w={w('100%')} alignItems="center">
        <View height={h('10%')}></View>
        <View width={w('80%')} paddingBottom={h('3%')} alignItems="center">
          <View alignItems="center">
            <Text
              color={'darkGreen'}
              fontFamily={'rocaOne'}
              fontWeight={'Regular'}
              fontStyle={'normal'}
              fontSize={'40'}
            >
              More Life.
            </Text>
            <Text
              color={'darkGreen'}
              fontFamily={'rocaOne'}
              fontWeight={'Regular'}
              fontStyle={'normal'}
              fontSize={'40'}
            >
              Less Stress.
            </Text>
          </View>
          <View height={h('3%')}></View>

          <Tree />

          <View paddingTop={h('5%')}>
            <ScreenWideButton
              text={'Sign Up'}
              textColor={'#FFFFFF'}
              backgroundColor={'lightGreen'}
              borderColor={'#8F8F8F'}
              onClick={toSignUp}
            />
          </View>

          <View paddingTop={h('2%')}>
            <ScreenWideButton
              text={'Login'}
              textColor={'#000000'}
              backgroundColor={'creamyCanvas'}
              borderColor={'lightGreen'}
              onClick={toLogin}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
