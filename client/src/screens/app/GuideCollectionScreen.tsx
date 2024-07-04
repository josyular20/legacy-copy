import GuideCard from '@/components/guideCollection/GuideCard';
import { IGuide } from '@/interfaces/IGuide';
import { fetchAllGuides } from '@/services/GuideService';
import { useQuery } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { Input, ScrollView, Text, View } from 'native-base';

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { moderateScale } from '../../utils/FontSizeUtils';
import BackArrowIcon from '@/components/icons/BackArrow';

export default function GuideCollectionScreen({ navigation }) {
  const [tagsGuides, setTagsGuides] = useState<Map<string, IGuide[]>>(
    new Map<string, IGuide[]>()
  );
  const {
    isPending,
    data: guides,
    error,
    refetch
  } = useQuery({
    queryKey: [],
    queryFn: async () => await fetchAllGuides()
  });

  const initCollection = () => {
    const newTagsGuides = new Map<string, IGuide[]>();
    if (!guides) {
      return;
    }
    guides.forEach((guide) => {
      guide.tags.forEach((tag) => {
        if (!newTagsGuides.has(tag.name)) {
          newTagsGuides.set(tag.name, []);
          newTagsGuides.get(tag.name).push(guide);
        } else {
          newTagsGuides.get(tag.name).push(guide);
        }
      });
    });
    setTagsGuides(newTagsGuides);
  };

  useEffect(() => {
    console.log(guides);
    initCollection();
  }, [guides]);

  if (isPending) {
    return (
      <View
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'#FFF9EE'}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
        bg={'#FFF9EE'}
      >
        <Text>Error!</Text>
      </View>
    );
  }

  return (
    guides && (
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={{
          flex: 1,
          backgroundColor: '#FFF9EE'
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isPending}
              onRefresh={async () => {
                refetch();
                initCollection();
              }}
              colors={['#ff0000', '#00ff00', '#0000ff']}
              tintColor={'#ff0000'}
            />
          }
          bgColor={'#FFF9EE'}
          contentContainerStyle={{ alignItems: 'center' }}
          paddingLeft={w('1.5%')}
          paddingRight={w('1.5%')}
        >
          <View width={'100%'} marginTop={h('2%')} marginBottom={h('2%')} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Pressable onPress={() => navigation.goBack()}>
              <View flexDirection={'row'} alignItems={'center'}>
                <BackArrowIcon />
              </View>
            </Pressable>
            <Text
              fontSize={moderateScale(32)}
              fontFamily={'rocaOne'}
              fontWeight={'Regular'}
              fontStyle={'normal'}
              color={'barkBrown'}
              margin={h('2%')}
              alignSelf={'center'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              Guides
            </Text>
          </View>

            <View>
              <Input
                placeholder={'Search'}
                size="md"
                isDisabled={isPending ? true : false}
                width={w('85%')}
                backgroundColor={'creamyCanvas'}
                borderRadius={20}
                marginBottom={'20px'}
            />
          </View>
          <View paddingTop={h('2%')} paddingBottom={h('4%')}>
            {[...tagsGuides.keys()].map((tag, key) => (
              <View flexDirection={'column'} key={key}>
                <Text
                  fontSize={moderateScale(20)}
                  fontFamily={'rocaOne'}
                  fontWeight={'Regular'}
                  fontStyle={'normal'}
                  color={'barkBrown'}
                  paddingTop={key === 0 ? 0 : h('3%')}
                  paddingBottom={h('.5%')}
                >
                  {tag}
                </Text>
                <View flexDirection={'row'}>
                  <ScrollView horizontal={true}>
                    {tagsGuides.get(tag).map((guide, key2) => (
                      <Pressable
                        onPress={() =>
                          navigation.navigate('Guide Screen', {
                            guideName: guide.guide_name
                          })
                        }
                        key={key2}
                      >
                        <View paddingLeft={key2 === 0 ? 0 : h('1.5%')}>
                          <GuideCard
                            key={guide.id}
                            guideName={guide.guide_name}
                            randomNumber={
                              Math.floor(Math.random() * 3) /* 0, 1, or 2 */
                            }
                          />
                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
}
