import { Text, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

import OpenLinkButton from './OpenLinkButton';

export default function Footer() {
  return (
    <>
      <View
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'row'}
      >
        <OpenLinkButton url={'https://www.example.com'}>
          Terms of Service
        </OpenLinkButton>
        <Text fontSize={12} fontFamily={'inter'} fontWeight={'Regular'}>
          {' '}
          |{' '}
        </Text>
        <OpenLinkButton url={'https://www.example.com'}>
          Privacy Policy
        </OpenLinkButton>
      </View>
    </>
  );
}
