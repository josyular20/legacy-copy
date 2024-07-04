import CircleProgressBar from '@/components/reusable/CircleProgressBar';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import QuestionaireBox from '@/components/reusable/QuestionaireBox';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button, Divider, KeyboardAvoidingView, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function QuestionaireScreen({ route, navigation }) {
  const {
    page,
    setPage,
    onboardingState,
    setOnboardingState,
    onboardingFlow,
    handleChange
  } = useOnboarding();
  const { props } = route.params;

  const back = async () => {
    const prevPage = onboardingFlow[page - 1];
    setPage(page - 1);
    navigation.pop();
  };

  const next = async () => {
    const nextPage = onboardingFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };

  const nextButton =
    props.completedCircles > 0 ? (
      <View paddingTop={h('2%')}>
        <ScreenWideButton
          text={'Back'}
          textColor="#FFFFFF"
          backgroundColor="lightGreen"
          borderColor="lightGreen"
          onClick={back}
        />
      </View>
    ) : null;
  return (
    <SafeAreaView style={{ backgroundColor: '#FFF9EE' }}>
      <View alignItems="center" h={h('100%')} w={w('100%')}>
        <View
          width={w('80%')}
          flexDirection="row"
          justifyContent="space-between"
          justifyItems={'center'}
          paddingBottom={h('3%')}
        >
          <Button backgroundColor={'transparent'} onPress={back}>
            <Icon name="chevron-back" size={20} color={'#374957'}></Icon>
          </Button>
          <LegacyWordmark />
        </View>

        <View paddingBottom={h('1%')}>
          <CircleProgressBar
            totalCircles={props.totalCircles}
            completedCircles={props.completedCircles}
          />
        </View>
        <Divider
          marginTop={h('2%')}
          marginBottom={h('4%')}
          width={w('100%')}
          color={'#D9D9D9'}
        />
        <QuestionaireBox
          text1={'Question ' + props.questionNumber}
          text2={props.question}
          initialSliderValue={onboardingState[props.inputName]}
          field={props.inputName}
          handleChange={handleChange}
          lowerSpectrumValue={props.lowerSpectrumValue}
          upperSpectrumValue={props.upperSpectrumValue}
        />

        <View paddingTop={h('5%')}>
          <ScreenWideButton
            text={'Next'}
            textColor="#FFFFFF"
            backgroundColor="lightGreen"
            borderColor="lightGreen"
            onClick={next}
          />
        </View>

        {nextButton}
      </View>
    </SafeAreaView>
  );
}
