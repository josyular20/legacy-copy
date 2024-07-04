import { Icon, Input, Pressable, Text, View } from 'native-base';

import React, { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type PasswordInputProps = {
  title: string;
  password: string;
  handleOnChange: (newPassword: string) => void;
};

export default function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 76
        }
      ]}
    >
      <View
        style={{
          // marginLeft: 16,
          // marginTop: 16,
          marginBottom: 16,
          width: '100%'
        }}
      >
        <Text
          style={{
            color: '#2F1D12',
            fontFamily: 'Inter',
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 20,
            marginBottom: 10
          }}
        >
          {props.title}
        </Text>
        <Input
          value={props.password}
          w="100%"
          h={12}
          type="password"
          onChangeText={props.handleOnChange}
        />
      </View>
    </View>
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
  borderBottomWidth: 1,
  borderStyle: 'solid'
};
