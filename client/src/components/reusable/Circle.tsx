import { View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

type CircleProps = {
  color: string;
  border?: boolean;
};

export default function Circle(props: CircleProps) {
  const borderWidth = props.border ? 1 : 0;

  return (
    <>
      <View
        height={h('1.6%')}
        width={h('1.6%')}
        backgroundColor={props.color}
        borderRadius={w('80%') / 2}
        borderColor={'darkGreen'}
        borderWidth={borderWidth}
      ></View>
    </>
  );
}
