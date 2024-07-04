import { View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

export default function ScreenBody({ children }) {
  return (
    <View paddingLeft={w('8%')} paddingRight={w('8%')}>
      {children}
    </View>
  );
}
