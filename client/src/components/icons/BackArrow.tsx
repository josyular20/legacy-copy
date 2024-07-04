import { View } from 'native-base';

import * as React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import Svg, { Path } from 'react-native-svg';

const BackArrowIcon = () => (
  <View width={w('8%')}>
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M13.7751 18.7606L8.48206 13.4676C8.10712 13.0925 7.89648 12.5839 7.89648 12.0536C7.89648 11.5232 8.10712 11.0146 8.48206 10.6396L13.7751 5.34656L15.1891 6.76056L9.90006 12.0536L15.1931 17.3466L13.7751 18.7606Z"
        fill="#374957"
      />
    </Svg>
  </View>
);
export default BackArrowIcon;
