import PersonaCard from '@/components/profile/PersonaCard';
import LegacyWordmarkWithBackArrow from '@/components/reusable/LegacyWordMarkWithBackArrow';
import { IPersona } from '@/interfaces/IPersona';
import { getAllPersonas } from '@/services/ProfileService';
import { useQuery } from '@tanstack/react-query';
import { ScrollView, Text, View } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import personaIcon from '@/utils/PersonaUtils';
/**
 * Screen to render all personas
 * @param route and navigation are props passed in by the react navigation stack
 * @returns All Peronas Screen
 */
export default function AllPersonasScreen({ route, navigation }) {
  /**
   * Sends user to the persona screen. Must pass in title and description of the persona.
   * @param title Title of persona
   * @param description Brief description of the persona
   */
  const toPersona = (title: string, description: string, icon: any) => {
    navigation.push('Persona Screen', {
      props: { title: title, description: description, icon: icon }
    });
  };

  /**
   * Fetch all data for this screen:
   * - All personas
   */
  const {
    isPending,
    data: personas,
    error
  } = useQuery({
    queryKey: ['allPersonas'],
    queryFn: async () => await getAllPersonas()
  });

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View width={340} marginTop={50} height={'auto'}>
          <LegacyWordmarkWithBackArrow
            handleOnPress={() => navigation.navigate('My Persona Screen')}
          />
          <Text
            style={{
              color: '#252525',
              fontFamily: 'Open Sans',
              fontSize: 15,
              fontWeight: '700',
              lineHeight: 20,
              marginTop: 18,
              marginBottom: 16
            }}
          >
            All Personas
          </Text>
          {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
          {error && <Text>Something went wrong ...</Text>}
          {personas?.map((value, index) => (
            <View marginBottom={h('1')} key={index}>
              <PersonaCard
                title={value.persona_title}
                image="https://i.postimg.cc/44Qn7BWC/temp-Image-KY7-Maq.jpg"
                border={true}
                icon={personaIcon(value.persona_title)}
                backgroundColor="white"
                handleOnPress={() =>
                  toPersona(value.persona_title, value.persona_description, personaIcon(value.persona_title))
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
