import { useUser } from '@/contexts/UserContext';
import { ITask } from '@/interfaces/ITask';
import { getTaskProgress } from '@/services/TaskService';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Text, View } from 'native-base';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type CircleProgressProps = {
  task: ITask;
};

const CircleProgress = ({ task }: CircleProgressProps) => {
  const { user } = useUser();
  const isFocused = useIsFocused(); // Hook to check if screen is focused

  const { isLoading, error, data: progress, refetch } = useQuery({
    queryKey: ['fetchTaskProgress', task?.id],
    queryFn: () => getTaskProgress(user?.id, task?.id)
  });


  const refreshData = useCallback(async () => {
    console.log(progress)
    await refetch();
  }, [refetch]);


  useEffect(() => {
    if (isFocused) {
      refreshData();
    }
  }, [isFocused, refetch]);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const strokeWidth = 13;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (progress?.progress !== undefined) {
      Animated.timing(animatedValue, {
        toValue: progress.progress || 0,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }
  }, [animatedValue, progress?.progress]);

  const progressStrokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0]
  });

  const textPosition = {
    left: 53 - (progress?.progress < 10 ? 6 : 10),
    top: 45 - (progress?.progress < 10 ? 6 : 10)
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="110" width="110" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#0F4D3F"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="round"
          fill="transparent" 
        />
        <AnimatedCircle
          cx="50"
          cy="50"
          r={radius}
          stroke="#43A573"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressStrokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform="rotate(-90 50 50)"
        />
      </Svg>
      <Text
        position={'absolute'}
        left={`${textPosition.left}%`}
        top={`${textPosition.top}%`}
        fontSize={18}
        fontWeight={'600'}
      >
        {progress?.progress || 0}%
      </Text>
    </View>
  );
};

export default CircleProgress;
