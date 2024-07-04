import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import { useUser } from '@/contexts/UserContext';
import { ITask } from '@/interfaces/ITask';
import { fetchAllGuides } from '@/services/GuideService';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View
} from 'native-base';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RefreshControl } from 'react-native';
import { widthPercentageToDP as w } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeScreenGuides from '../../components/homescreen components/HomeScreenGuides';
import HomeScreenTasks from '../../components/homescreen components/HomeScreenTasks';
import { moderateScale } from '../../utils/FontSizeUtils';

export default function HomeScreen({ navigation }) {
  const { user, refetchUser } = useUser();

  const {
    isPending,
    data: guides,
    error,
    refetch
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchAllGuides
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#FFF9EE' }}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={() => {
              refetch();
              refetchUser();
            }}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            tintColor={'#ff0000'}
          />
        }
        bgColor={'#FFF9EE'}
        marginLeft={w('1%')}
        marginRight={w('1%')}
      >
        <View w={'95%'} flexDir={'column'} justifyContent={'space-between'}>
          <LegacyWordmark />
          <View>
            <View w={'100%'} mt={5} mb={5}>
              <Text
                w={'100%'}
                fontFamily={'rocaOne'}
                fontWeight={'Regular'}
                fontStyle={'normal'}
                color={'#252525'}
                fontSize={moderateScale(32)}
              >
                Hello {user?.username.split(' ')[0]}!{' '}
              </Text>
            </View>
            <View w={'100%'}>
              <View
                justifyContent={'space-between'}
                flexDir={'row'}
                alignContent={'center'}
                alignItems={'center'}
                width={'100%'}
                fontSize={15}
                fontFamily={'Open Sans'}
                fontWeight={'400'}
                textDecorationLine={'underline'}
                lineHeight={20}
              >
                <Text
                  color={'#252525'}
                  fontFamily={'rocaOne'}
                  fontWeight={'Regular'}
                  fontStyle={'normal'}
                  fontSize={24}
                  lineHeight={26.4}
                >
                  Your Journey
                </Text>
                <Pressable onPress={() => navigation.navigate('Task Screen')}>
                  <Text
                    color={'#909090'}
                    fontSize={15}
                    fontFamily={'Open Sans'}
                    fontWeight={'400'}
                    textDecorationLine={'underline'}
                    lineHeight={20}
                  >
                    See all
                  </Text>
                </Pressable>
              </View>
              <HomeScreenTasks user_id={user?.id} navigation={navigation} />
            </View>
          </View>

          <View w={'100%'} mt={5}>
            <View justifyContent={'space-between'} flexDir={'row'}>
              <Text
                color={'#252525'}
                fontSize={15}
                fontFamily={'Open Sans'}
                fontWeight={'700'}
                lineHeight={20}
              >
                Guides
              </Text>
              <Pressable onPress={() => navigation.navigate('Guide Collection Screen')}>
                <Text
                  color={'#909090'}
                  fontSize={15}
                  fontFamily={'Open Sans'}
                  fontWeight={'400'}
                  textDecorationLine={'underline'}
                  lineHeight={20}
                >
                  See all
                </Text>
              </Pressable>
            </View>
            {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
            {error && <Text>Error: {error.message}</Text>}
            {guides && (
              <HomeScreenGuides guides={guides} navigation={navigation} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
