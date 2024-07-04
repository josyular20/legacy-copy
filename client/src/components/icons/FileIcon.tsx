import { View } from 'native-base';

import * as React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import Svg, { Path } from 'react-native-svg';

const originalWidth = 26;
const originalHeight = 32;
const aspectRatio = originalWidth / originalHeight;

const FileIcon = (props) => (
  <View width={w('8%')} style={{ aspectRatio }}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      {...props}
    >
      <Path
        fill="#4A4A4A"
        d="M16.125 0h-12.5A3.125 3.125 0 0 0 .5 3.125v25a3.125 3.125 0 0 0 3.125 3.125h18.75a3.125 3.125 0 0 0 3.125-3.125V9.375L16.125 0Zm6.25 28.125H3.625v-25h10.938v7.813h7.812v17.187Z"
      />
    </Svg>
  </View>
);
export default FileIcon;
