import { Text, View } from 'native-base';

import React from 'react';

export type PersonaProps = {
  personaTitle: string;
  personaDescription: string;
};

export default function Persona(props: PersonaProps) {
  return (
    <View>
      <Text
        style={{
          color: '#252525',
          fontFamily: 'Open Sans',
          fontSize: 24,
          fontWeight: '600',
          lineHeight: 25,
          marginTop: 20,
          marginBottom: 12,
          marginRight: 'auto',
          marginLeft: 'auto'
        }}
      >
        {props.personaTitle}
      </Text>
      <Text
        style={{
          color: '#000',
          fontFamily: 'Open Sans',
          fontSize: 12,
          fontWeight: '300',
          lineHeight: 20,
          marginBottom: 16
        }}
      >
        {props.personaDescription}
      </Text>
    </View>
  );
}
