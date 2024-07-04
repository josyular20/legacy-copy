import { Image, Text, View } from 'native-base';

import { useEffect } from 'react';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export type ProfileCardProps = {
  title: string;
  handleOnPress?: () => void;
};

export default function ProfileCard(props: ProfileCardProps) {
  return (
    <TouchableOpacity onPress={props.handleOnPress}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 76,
            backgroundColor: '#FFFAF2',
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
            borderStyle: 'solid'
          }
        ]}
      >
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
