import { moderateScale } from '@/utils/FontSizeUtils';
import { Pressable, Text, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

type TaskTagProps = {
  taskText: string;
  taskPressed: boolean;
  taskPressFunction?: () => void;
};

export default function TaskTag(props: TaskTagProps) {
  return (
    <Pressable
      backgroundColor={props.taskPressed ? 'deepEvergreen' : '#00000000'}
      alignSelf={'flex-start'}
      borderRadius={'full'}
      borderColor={'deepEvergreen'}
      borderWidth={'1px'}
      onPress={props.taskPressFunction}
      marginRight={w('.5%')}
      paddingLeft={w('3%')}
      paddingRight={w('3%')}
      paddingTop={h('1%')}
      paddingBottom={h('1%')}
      marginBottom={h('1%')}
      width={'auto'}
    >
      <Text
        fontFamily={'inter'}
        fontWeight={'600'}
        fontSize={moderateScale(11)}
        color={props.taskPressed ? '#FFFFFF' : 'deepEvergreen'}
      >
        {props.taskText}
      </Text>
    </Pressable>
  );
}
