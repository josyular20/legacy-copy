import Slider from '@react-native-community/slider';
import { Text, View } from 'native-base';

import React, { useState } from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

import QuestionairePark from '../icons/QuestionairePark';

type QuestionaireBoxProps = {
  text1: string;
  text2: string;
  initialSliderValue: number;
  field: string;
  lowerSpectrumValue: string;
  upperSpectrumValue: string;
  handleChange: (name, value) => void; // TODO: add types
};

// TODO: export image to separate file + use arrow function
export default function QuestionaireBox(props: QuestionaireBoxProps) {
  return (
    <View
      backgroundColor={'#FFFFFF'}
      borderRadius={10}
      width={'80%'}
      height={'auto'}
      paddingTop={h('2%')}
      paddingBottom={h('2%')}
      alignItems={'center'}
      borderColor={'darkGreen'}
      borderWidth={1}
    >
      <View alignItems={'center'} width={w('70%')}>
        <Text
          fontSize={20}
          fontFamily={'rocaOne'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
          paddingBottom={h('1.5%')}
          color={'darkGreen'}
        >
          {props.text1}
        </Text>
        <Text
          fontSize={14}
          fontFamily={'inter'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
          color={'darkGreen'}
          textAlign={'center'}
          paddingBottom={h('2%')}
        >
          {props.text2}
        </Text>
      </View>

      <View paddingTop={h('5%')}></View>

      <QuestionairePark />

      <View
        width={w('68%')}
        flexDirection="row"
        justifyContent={'space-between'}
        alignItems="center"
        paddingBottom={h('0.5%')}
      ></View>

      <View paddingTop={h('5%')}></View>

      <Slider
        style={{ width: w('68%') }}
        minimumValue={1}
        maximumValue={5}
        step={1}
        maximumTrackTintColor={'#C4C4C4'}
        minimumTrackTintColor={'#C4C4C4'}
        thumbTintColor={'#0F4F43'}
        onValueChange={(value) => props.handleChange(props.field, value)}
      />
      <View
        width={w('68%')}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Text
          fontSize={14}
          fontFamily={'inter'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
          color={'darkGreen'}
        >
          {props.lowerSpectrumValue}
        </Text>
        <Text
          fontSize={14}
          fontFamily={'inter'}
          fontWeight={'Regular'}
          fontStyle={'normal'}
          color={'darkGreen'}
        >
          {props.upperSpectrumValue}
        </Text>
      </View>
    </View>
  );
}
