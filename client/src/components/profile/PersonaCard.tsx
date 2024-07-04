import { Image, Text, View } from 'native-base';

import { useEffect } from 'react';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ActivityIndicator, Alert, Modal } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
export type PersonaCardProps = {
  image?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  subheading?: string;
  border?: boolean;
  backgroundColor?: string;
  handleOnPress?: () => void;
};

export default function PersonaCard(props: PersonaCardProps) {
  const containerBorderStyle =
    props.border !== undefined && props.border === true
      ? containerWithBoarder
      : containerWithOutBoarder;

  useEffect(() => {
    console.log('props', props);
  }, []);

  return (
    <TouchableOpacity onPress={props.handleOnPress}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 76,
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : '#FFFAF2'
          },
          containerBorderStyle
        ]}
      >
        {props.icon !== undefined && (
          <View
            style={{
             
              width: w('15%'),
              height: h('10%'),
              borderRadius: 255,
              marginLeft: w('3%'),
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
           {props.icon}
          </View>
        )}
        <View
          style={{
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
            width: 197
          }}
        >
          <Text
            style={{
              color: '#252525',
              fontFamily: 'Inter',
              fontSize: 15,
              fontWeight: '600',
              lineHeight: 20
            }}
          >
            {props.title}
          </Text>
          {props.subtitle !== undefined && (
            <Text
              style={{
                color: '#252525',
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 20
              }}
            >
              {props.subtitle}
            </Text>
          )}
          {props.subheading !== undefined && (
            <Text
              style={{
                color: '#C1C3C7',
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 20
              }}
            >
              {props.subheading}
            </Text>
          )}
        </View>
        <View style={{ marginLeft: 'auto', marginRight: 16 }}>
          <Svg width="10" height="20" viewBox="0 0 10 20" fill="none">
            <Path
              d="M9.50026 10C9.50026 10.7315 9.2181 11.463 8.66424 12.0169L1.85066 18.8305C1.5476 19.1336 1.04598 19.1336 0.74292 18.8305C0.43986 18.5274 0.43986 18.0258 0.74292 17.7228L7.5565 10.9092C8.05812 10.4076 8.05812 9.59243 7.5565 9.09082L0.742919 2.27719C0.439859 1.97413 0.439859 1.47252 0.742919 1.16946C1.04598 0.8664 1.54759 0.8664 1.85065 1.16946L8.66424 7.98308C9.2181 8.53695 9.50026 9.26847 9.50026 10Z"
              fill="#D9D9D9"
            />
          </Svg>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const containerWithBoarder: StyleProp<ViewStyle> = {
  borderColor: '#D9D9D9',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 13
};

const containerWithOutBoarder: StyleProp<ViewStyle> = {
  borderBottomColor: '#D9D9D9',
  // borderBottomColor: "#EFEFEF",
  borderBottomWidth: 1,
  borderStyle: 'solid'
};
