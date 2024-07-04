import { getMonth } from '@/utils/DateUtils';
import { Button, FormControl, Input, Text, View } from 'native-base';

import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

type ScreenWideInputProps = {
  title?: string;
  password?: boolean;
  placeholderText?: string;
  onChangeText: (value) => void;
  iconName?: string;
  value?: string;
  disabled?: boolean;
  isDatePicker?: boolean; // New prop to indicate if it's a date picker
};

export default function ScreenWideInput(props: ScreenWideInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const inputLeftIcon = props.iconName ? (
    <View paddingLeft={w('4%')} paddingRight={w('1%')}>
      <Icon name={props.iconName} size={20} color={'#CDCBCB'} />
    </View>
  ) : null;

  const inputRightElement = props.password ? (
    <Button
      size={'xs'}
      rounded={'none'}
      width={w('20%')}
      height={h('80%')}
      backgroundColor={'transparent'}
      color={'black'}
      onPress={toggleShowPassword}
    >
      <Text color={'#000000'} fontWeight={'bold'} fontSize={'8'}>
        {showPassword ? 'HIDE' : 'SHOW'}{' '}
      </Text>
    </Button>
  ) : undefined;

  return (
    <>
      <View>
        <FormControl>{props.title}</FormControl>
        {props.isDatePicker ? (
          <>
            <Input
              isDisabled={props.disabled}
              type="text"
              width={w('80%')}
              height={h('5%')}
              paddingX={'auto'}
              value={
                getMonth(date.getMonth()) +
                ' ' +
                date.getDate() +
                ', ' +
                date.getFullYear()
              }
              // outlineColor={'#CDCBCB'}
              backgroundColor={'#F5F1E8'}
              InputLeftElement={
                <View paddingLeft={w('4%')} paddingRight={w('1%')}>
                  <Icon name={'calendar'} size={20} color={'#CDCBCB'} />
                </View>
              }
              onPressIn={() => setOpenDatePicker(true)}
              fontFamily={'inter'}
              fontWeight={'Regular'}
              fontStyle={'normal'}
              rounded={'full'}
            />
            {openDatePicker && (
              <DatePicker
                modal
                mode="date"
                open={openDatePicker}
                date={date}
                maximumDate={new Date()}
                onConfirm={(selectedDate) => {
                  setOpenDatePicker(false);
                  setDate(selectedDate);
                  props.onChangeText(selectedDate);
                }}
                onCancel={() => {
                  setOpenDatePicker(false);
                }}
              />
            )}
          </>
        ) : (
          <Input
            isDisabled={props.disabled}
            type={showPassword || !props.password ? 'text' : 'password'}
            width={w('80%')}
            height={h('5%')}
            paddingX={'auto'}
            value={props.value}
            // outlineColor={'#CDCBCB'}
            backgroundColor={'#F5F1E8'}
            onChangeText={(value) => props.onChangeText(value)}
            placeholder={props.placeholderText}
            InputLeftElement={inputLeftIcon}
            InputRightElement={inputRightElement}
            fontFamily={'inter'}
            fontWeight={'Regular'}
            fontStyle={'normal'}
            rounded={'full'}
          />
        )}
      </View>
    </>
  );
}
