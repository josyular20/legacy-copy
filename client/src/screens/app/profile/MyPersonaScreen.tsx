import Persona from '@/components/profile/Persona';
import LegacyWordmarkWithBackArrow from '@/components/reusable/LegacyWordMarkWithBackArrow';
import ScreenWideButton from '@/components/reusable/ScreenWideButton';
import { useUser } from '@/contexts/UserContext';
import { IPersona } from '@/interfaces/IPersona';
import { getPersona } from '@/services/ProfileService';
import { useQuery } from '@tanstack/react-query';
import { Text, View } from 'native-base';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import personaIcon from '@/utils/PersonaUtils';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

export default function MyPersonaScreen({ route, navigation }) {
  const { user } = useUser();
  const [myPersona, setMyPersona] = useState<IPersona | undefined>(undefined);

  /**
   * Fetches the persona of the current user
   */
  const {
    isPending,
    data: persona,
    error
  } = useQuery({
    queryKey: ['persona', user?.id],
    queryFn: async () => await getPersona(user?.id)
  });

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <View width={340} marginTop={50} height={'auto'}>
        <LegacyWordmarkWithBackArrow
          handleOnPress={() => navigation.navigate('Profile Screen')}
        />
            <View alignItems={'center'} > 
        <View height={h('40%')} width={w('70%')}>
        {personaIcon(persona?.persona_title)}
        </View>
      
        </View>
        {/* <Text
          color="#252525"
          fontFamily="Open Sans"
          fontSize={20}
          fontWeight={'700'}
          lineHeight={20}
          marginTop={18}
          marginBottom={5}
        >
          You are an
        </Text> */}
        {isPending && <ActivityIndicator size="small" color="#000000" />}
        {error && <Text>Something went wrong ...</Text>}
        {persona && (
          <Persona
            personaTitle={persona?.persona_title}
            personaDescription={persona?.persona_description}
          />
        )}
      </View>
      <View marginTop={'auto'}>
        <ScreenWideButton
          text={'See All Personas'}
          textColor={'#000000'}
          backgroundColor={'#ECECEC'}
          borderColor={'#000000'}
          onClick={() => navigation.navigate('All Personas Screen')}
        />
      </View>
    </SafeAreaView>
  );
}
