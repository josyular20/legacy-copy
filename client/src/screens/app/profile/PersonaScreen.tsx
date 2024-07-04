import Persona from '@/components/profile/Persona';
import LegacyWordmarkWithBackArrow from '@/components/reusable/LegacyWordMarkWithBackArrow';
import { Pressable, Text, View } from 'native-base';

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

export type PersonScreenProps = {
  title: string;
  description: string;
  icon: any;
};

/**
 * Screen for a single persona that comes from all personas screen
 * @param
 * @returns
 */
export default function PersonaScreen({ route, navigation }) {
  const { props } = route.params;

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <View width={340} marginTop={50} height={'auto'} justifyContent={'center'}>
        <LegacyWordmarkWithBackArrow
          handleOnPress={() => navigation.navigate('All Personas Screen')}
        />
        <View alignItems={'center'} > 
        <View height={h('40%')} width={w('70%')}>
        {props.icon}
        </View>
      
        </View>
     
        <Persona
          personaTitle={props.title}
          personaDescription={props.description}
        />
        
      </View>
    </SafeAreaView>
  );
}
