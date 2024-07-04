import HomeScreenGuideCard from '@/components/homescreen components/HomeScreenGuideCard';
import { IGuide } from '@/interfaces/IGuide';
import { ScrollView, Text, View } from 'native-base';

import React from 'react';
import { Pressable } from 'react-native';

type GuidesProps = {
  guides: IGuide[];
  navigation: any;
};

const GuidesComponent: React.FC<GuidesProps> = ({ guides, navigation }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} mt={5}>
      {guides.map((item, index) => (
        <Pressable
          onPress={() =>
            navigation.navigate('Guide Screen', { guideName: item.guide_name })
          }
        >
          <View key={index} marginRight={5}>
            <HomeScreenGuideCard guide={item} />
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default GuidesComponent;
