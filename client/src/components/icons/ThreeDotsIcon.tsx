import { View } from 'native-base';

import * as React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import Svg, { Path } from 'react-native-svg';

const originalWidth = 24;
const originalHeight = 24;
const aspectRatio = originalWidth / originalHeight;

const ThreeDotsIcon = (props) => (
  <View width={w('8%')} style={{ aspectRatio }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={'100%'}
      height={'100%'}
      fill="none"
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      {...props}
    >
      <Path
        fill="#6B7280"
        d="M12 16.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0-6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0-6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
      />
    </Svg>
  </View>
);

export default ThreeDotsIcon;
