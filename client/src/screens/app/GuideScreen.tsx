import Markdown from '@ronradtke/react-native-markdown-display';
import { useQuery } from '@tanstack/react-query';
import { Box, Image, ScrollView, Text, View } from 'native-base';

import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

import { fetchGuideByName } from '../../services/GuideService';
import { getMonth } from '../../utils/DateUtils';
import { moderateScale, verticalScale } from '../../utils/FontSizeUtils';
import BackArrowIcon from '@/components/icons/BackArrow';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';

const MarkdownWrapper: React.FC<any> = ({ children }) => {
  return (
    <View px={wp('14%')} py={hp('5.5%')}>
      <Text
        fontFamily={'dmSans'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        fontSize={moderateScale(12)}
        color={'muteEggplant'}
      >
        <Markdown>{children}</Markdown>
      </Text>
    </View>
  );
};

type GuideScreenProps = {
  navigation: any;
  route: any;
};

const GuideScreen: React.FC<GuideScreenProps> = ({ navigation, route }) => {
  // props should include a guideName field.
  const { guideName } = route.params;
  const {
    isPending,
    data: guide,
    error
  } = useQuery({
    queryKey: ['guide', guideName],
    queryFn: () => fetchGuideByName(guideName)
  });

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
    guide && (
      <ScrollView bg="#FFB017" w={wp('100%')} height={hp('100%')}>
        <View>
          <View
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            px={wp('5%')}
            py={hp('2.5%')}
            marginTop={hp('5%')}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <View flexDirection={'row'} alignItems={'center'}>
                <BackArrowIcon />
                <Text
                  fontFamily={'dmSans'}
                  fontWeight={'Bold'}
                  fontStyle={'normal'}
                  fontSize={moderateScale(14)}
                  color={'deepEvergreen'}
                >
                  Back
                </Text>
              </View>
            </Pressable>
            <View>
              <LegacyWordmark />
            </View>
          </View>
          <View alignItems={'center'}>
            <View flexDirection={'column'} w={wp('75%')}>
              <Text
                maxW={wp('90%')}
                py={hp('1.25%')}
                fontFamily={'madeDillan'}
                fontSize={moderateScale(43)}
                lineHeight={verticalScale(35)}
                bold
                color={'deepEvergreen'}
              >
                {guide.title}
              </Text>
              <Text
                maxW={wp('65%')}
                fontFamily={'dmSans'}
                fontWeight={'Regular'}
                fontStyle={'normal'}
                fontSize={moderateScale(24)}
                lineHeight={verticalScale(25)}
                max-width
                color={'deepEvergreen'}
              >
                {guide.sub_title}
              </Text>
              <View py={hp('2%')} flexDirection={'row'} alignItems={'center'}>
                <Image
                  size={50}
                  borderRadius={35}
                  source={{
                    uri: guide.author_image_url
                  }}
                  alt="barack"
                />
                <Text
                  px={wp('1.25%')}
                  fontFamily={'dmSans'}
                  fontWeight={'Bold'}
                  fontStyle={'normal'}
                  fontSize={moderateScale(10.5)}
                  color={'deepEvergreen'}
                >
                  Written by {guide.author}
                </Text>
              </View>
              <View pb={hp('4%')} flexDirection={'row'}>
                <Text
                  fontFamily={'dmSans'}
                  fontWeight={'Bold'}
                  fontStyle={'normal'}
                  fontSize={moderateScale(10.5)}
                  color={'deepEvergreen'}
                >
                  {guide.mins_read.toString()} min read
                </Text>
                <Text
                  px={wp('2%')}
                  fontFamily={'dmSans'}
                  fontWeight={'Bold'}
                  fontStyle={'normal'}
                  fontSize={moderateScale(10.5)}
                  color={'deepEvergreen'}
                >
                  {getMonth(new Date(guide.date).getMonth())}{' '}
                  {new Date(guide.date).getDay().toString()},{' '}
                  {new Date(guide.date).getFullYear().toString()}
                </Text>
              </View>
            </View>
            <View>
              <Box roundedTop={wp('5%')} bg="#FAF8F2" w={wp('100%')}>
                <MarkdownWrapper>{guide.full_text}</MarkdownWrapper>
              </Box>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  );
};

export default GuideScreen;
