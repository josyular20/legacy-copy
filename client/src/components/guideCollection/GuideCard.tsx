import { Box, Image, Text, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

import { moderateScale } from '../../utils/FontSizeUtils';
import CoupleIcon from '../icons/CoupleIcon';
import SheWritingIcon from '../icons/SheWritingIcon';
import SittingIcon from '../icons/SittingIcon';

type GuideCardProps = {
  guideName: string;
  randomNumber: number;
};

const GuideCard: React.FC<GuideCardProps> = ({ guideName, randomNumber }) => {
  const couple = (
    <View paddingTop={h('2.7%')} paddingBottom={h('1.3%')}>
      <CoupleIcon />
    </View>
  );

  const writing = (
    <View paddingTop={h('1.6%')}>
      <SheWritingIcon />
    </View>
  );

  const sitting = (
    <View paddingTop={h('4.5%')} paddingBottom={h('2.2%')}>
      <SittingIcon />
    </View>
  );

  const randomIcon = () => {
    if (randomNumber == 0) {
      return couple;
    } else if (randomNumber == 1) {
      return writing;
    } else {
      return sitting;
    }
  };

  return (
    <Box
      width={w('29.7%')}
      height={h('20%')}
      borderStyle="solid"
      bgColor={'#FFF'}
      flexDirection="column"
      alignItems="center"
      borderRadius={6}
      borderWidth={1}
      borderColor={'#0F4D3F'}
    >
      {randomIcon()}
      <Text
        fontFamily={'inter'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        textAlign={'center'}
        fontSize={moderateScale(12)}
      >
        {guideName}
      </Text>
    </Box>
  );
};

export default GuideCard;
