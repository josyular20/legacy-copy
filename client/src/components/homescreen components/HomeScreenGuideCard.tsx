import { IGuide } from '@/interfaces/IGuide';
import { Text, View } from 'native-base';

import React from 'react';

type HSGCProps = {
  guide: IGuide;
};
const HomeScreenGuideCard: React.FC<HSGCProps> = ({ guide }) => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFB017',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#0F4D3F',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
      }}
    >
      <View style={{ flex: 1, marginHorizontal: 5 }}>
        <Text
          style={{
            fontFamily: 'inter',
            fontSize: 15,
            fontWeight: '600',
            marginBottom: 4
          }}
        >
          {guide.title}
        </Text>
        <Text
          style={{
            fontFamily: 'inter',
            fontSize: 12,
            color: '#2F1D12',
            width: '80%'
          }}
        >
          {guide.sub_title}
        </Text>
      </View>
    </View>
  );
};

export default HomeScreenGuideCard;
