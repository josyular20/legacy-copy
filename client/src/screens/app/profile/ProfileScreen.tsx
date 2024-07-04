import PersonaCard from '@/components/profile/PersonaCard';
import ProfileCard from '@/components/profile/ProfileCard';
import LegacyWordmarkWithBackArrow from '@/components/reusable/LegacyWordMarkWithBackArrow';
import OurModal from '@/components/reusable/Modal';
import { useUser } from '@/contexts/UserContext';
import { IPersona } from '@/interfaces/IPersona';
import { getPersona } from '@/services/ProfileService';
import { useQuery } from '@tanstack/react-query';
import { AlertDialog, Button, Skeleton, Text, View } from 'native-base';

import { useEffect, useState } from 'react';
import React from 'react';
import { ActivityIndicator, Alert, Modal } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import personaIcon from '@/utils/PersonaUtils';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';

/**
 * Screen to render the user's profile
 * @returns
 */
export default function ProfileScreen({ route, navigation }) {
  const { user, logout } = useUser();
  const { setCompletedOnboarding } = useUser();

  /**
   * Fetch all data for this screen:
   * - My Persona
   */
  const {
    isPending,
    data: persona,
    error
  } = useQuery({
    queryKey: ['persona', user?.id],
    queryFn: async () => await getPersona(user?.id)
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Delete Pressed')
        }
      ],
      { cancelable: false }
    );
  };

  const handleShare = () => {
    Alert.alert(
      'Share Legacy',
      'Share Legacy with your friends!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'Share',
          style: 'default',
          onPress: () => console.log('Share Pressed')
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView
      style={{ alignItems: 'center', flex: 1, backgroundColor: '#FFFAF2' }}
    >
      <View width={340} marginTop={50} height={'auto'}>
        {/* TODO: FIX this */}
        <LegacyWordmark/>
        <Text
          color={'#252525'}
          fontSize={24}
          fontWeight={'700'}
          fontFamily={'Roca Regular'}
          lineHeight={h('5%')}
          marginTop={h('2.5%')}
          marginBottom={h('2.5%')}
        >
          Profile
        </Text>
        {isPending && <ActivityIndicator size="small" color="#43A573" />}
        {error && <Text>Something went wrong...</Text>}
        {persona && (
          <PersonaCard
            title={user?.username}
            subtitle={persona?.persona_title}
            subheading={'View My Persona'}
            image="https://i.postimg.cc/44Qn7BWC/temp-Image-KY7-Maq.jpg"
            icon={personaIcon(persona?.persona_title)}
            border={true}
            backgroundColor="white"
            handleOnPress={() => navigation.navigate('My Persona Screen')}
          />
        )}

        <ProfileCard
          title={'Notification Settings'}
          handleOnPress={() => navigation.navigate('Notifications Screen')}
        />
        <ProfileCard
          title={'Password and Security'}
          handleOnPress={() =>
            navigation.navigate('Password and Security Screen')
          }
        />
        <ProfileCard title={'Personal Access'} />
        <ProfileCard
          title={'Share and Rate Legacy'}
          handleOnPress={() => handleShare()}
        />
      </View>


      <Button
        width={w('80%')}
        height={h('5%')}
        borderRadius={w('80%') / 2}
        borderColor={'#43A573'}
        borderWidth={1}
        backgroundColor={'#FFF9EE'}
        justifyContent={'center'}
        alignItems={'center'}
        marginBottom={h('2%')}
        bottom={0}
        position="absolute"
        onPress={handleLogout}
      >
          <Text
            color={'#2F1D12'}
            fontFamily={'Inter'}
            fontWeight={'600'}
            fontSize={12}
          >
            Logout
          </Text>
      </Button>
    </SafeAreaView>
  );
}
