import { View } from 'native-base';
import * as React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import Svg, { Path } from 'react-native-svg';

type RightArrowIconProps = {
  color?: string;
};

const RightArrowIcon = ({ color }: RightArrowIconProps) => (
  <View width={w('8%')}>
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M10.2249 18.7606L15.5179 13.4676C15.8929 13.0925 16.1036 12.5839 16.1036 12.0536C16.1036 11.5232 15.8929 11.0146 15.5179 10.6396L10.2249 5.34656L8.81093 6.76056L14.0999 12.0536L8.80693 17.3466L10.2249 18.7606Z"
        fill={color ? color : '#0F4D3F'}
      />
    </Svg>
  </View>
);

export default RightArrowIcon;
