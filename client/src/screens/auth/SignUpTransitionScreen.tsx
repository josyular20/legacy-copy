import CircleProgressBar from '@/components/reusable/CircleProgressBar';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useUser } from '@/contexts/UserContext';
import { Button, Divider, KeyboardAvoidingView, Text, View } from 'native-base';

import React from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SignUpTransitionScreen({ route, navigation }) {
  const { page, setPage, onboardingFlow } = useOnboarding();
  const { user } = useUser();

  const next = async () => {
    const nextPage = onboardingFlow[page + 1];
    setPage(page + 1);
    navigation.push(nextPage.page, { props: nextPage.props });
  };
  return (
    <SafeAreaView style={{ backgroundColor: '#FFF9EE' }}>
      <View alignItems="center" height={'100%'} width={'100%'}>
        <View paddingTop={'7%'} />

        <LegacyWordmark />
        <View paddingTop={'4.5%'} paddingBottom={'2%'}>
          <CircleProgressBar totalCircles={6} completedCircles={0} />
        </View>
        <Divider marginTop={'2%'} width={'100%'} color={'#D9D9D9'} />

        <View
          width={'45%'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingTop={'4%'}
          paddingBottom={'5%'}
        >
          <Text fontSize={20} fontWeight={'semibold'} paddingRight={'2%'}>
            Welcome {user?.username ?? 'Invalid User'}
          </Text>
          <Icon name="flower-tulip-outline" size={30} color={'#0F4F43'} />
        </View>

        <View width={'80%'}>
          <Text
            fontSize={16}
            color={'#767676'}
            fontFamily={'inter'}
            fontWeight={'regular'}
            fontStyle={'normal'}
            textAlign="center"
          >
            Welcome to Legacy!
          </Text>
          <Text
            fontSize={16}
            color={'#767676'}
            fontFamily={'inter'}
            fontWeight={'regular'}
            fontStyle={'normal'}
            paddingBottom={'1%'}
            textAlign="center"
          >
            We are excited to have you on board
          </Text>
          <Text
            fontSize={16}
            color={'#767676'}
            fontFamily={'inter'}
            fontWeight={'regular'}
            fontStyle={'normal'}
            paddingTop={'3%'}
            paddingBottom={'4%'}
            textAlign="center"
          >
            We have a few questions before we get started.
          </Text>
        </View>
        <View paddingTop={'32%'} />

        <ScreenWideButton
          text="Get Started"
          textColor="#FFFFFF"
          backgroundColor="lightGreen"
          borderColor="lightGreen"
          onClick={next}
        />
      </View>

      <Button
        backgroundColor={'#D9D9D9'}
        borderRadius={20}
        width={'35%'}
        onPress={next}
      >
        <Text color={'#000000'} fontWeight={'bold'}>
          Get Started!
        </Text>
      </Button>
    </SafeAreaView>
  );
}
