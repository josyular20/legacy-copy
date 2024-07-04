import { Button, Text } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

type ScreenWideButtonProps = {
  text: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
  onClick?: (input) => any;
};

export default function HalfScreenWideButton(props: ScreenWideButtonProps) {
  return (
    <>
      <Button
        backgroundColor={props.backgroundColor}
        width={w('37.5%')}
        height={h('5%')}
        borderRadius={w('80%') / 2}
        onPress={props.onClick}
        borderColor={props.borderColor}
        borderWidth={1}
      >
        <Text color={props.textColor}>{props.text}</Text>
      </Button>
    </>
  );
}
