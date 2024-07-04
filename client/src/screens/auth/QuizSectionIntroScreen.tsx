import CircleProgressBar from '@/components/reusable/CircleProgressBar';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Divider, Text, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function QuizSectionIntroScreen({ route, navigation }) {
  const { page, setPage, onboardingFlow } = useOnboarding();

  const next = async () => {
    const nextPage = onboardingFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };
  const { props } = route.params;
  return (
    <SafeAreaView style={{ backgroundColor: '#FFF9EE' }}>
      <View alignItems="center" h={h('100%')} w={w('100%')}>
        <LegacyWordmark />

        <View paddingTop={h('4.5%')} paddingBottom={h('2%')}>
          <CircleProgressBar
            totalCircles={props.totalCircles}
            completedCircles={0}
          />
        </View>
        <Divider marginTop={h('2%')} width={w('100%')} color={'#D9D9D9'} />

        <View
          width={w('50%')}
          flexDirection={'row'}
          alignItems={'center'}
          paddingTop={h('4%')}
          paddingBottom={h('3.5%')}
        >
          <View marginLeft={'auto'}>
            <Text
              paddingRight={w('3%')}
              fontSize={20}
              fontFamily={'rocaOne'}
              fontWeight={'Regular'}
              fontStyle={'normal'}
            >
              {props.title}
            </Text>
          </View>
          <View marginRight={'auto'}>
            <Icon name="flower-tulip-outline" size={30}></Icon>
          </View>
        </View>

        <View width={w('80%')}>
          <Text
            fontSize={18}
            color={'#767676'}
            fontFamily={'inter'}
            fontWeight={'Regular'}
            fontStyle={'normal'}
            paddingBottom={h('1%')}
            textAlign="center"
          >
            {props.description
              ? props.description
              : 'Insert section description here'}
          </Text>
        </View>

        <View paddingTop={h('32%')}>
          <ScreenWideButton
            text={'Get Started'}
            textColor="#FFFFFF"
            backgroundColor="lightGreen"
            borderColor="lightGreen"
            onClick={next}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
