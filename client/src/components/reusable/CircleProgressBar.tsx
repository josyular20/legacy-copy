import Circle from '@/components/reusable/Circle';
import { View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

type CircleProgressBarProps = {
  totalCircles: number;
  completedCircles: number;
};

export default function CircleProgressBar(props: CircleProgressBarProps) {
  const circles = [];

  for (let i = 0; i < props.totalCircles; i++) {
    const uniqueKey = `circle_${i}`;

    if (i === 0 && props.completedCircles === 0) {
      circles.push(<Circle color="#FFFFFF" border={true} key={uniqueKey} />);
    } else if (i < props.completedCircles) {
      circles.push(<Circle color="darkGreen" key={uniqueKey} />);
    } else if (i === props.completedCircles) {
      circles.push(<Circle color="#D9D9D9" border={true} key={uniqueKey} />);
    } else {
      circles.push(<Circle color="#D9D9D9" key={uniqueKey} />);
    }
  }

  return (
    <View
      width={w('80%') * (props.totalCircles / 6)}
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      {circles}
    </View>
  );
}
