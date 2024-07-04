import { getAllSubTasks } from '@/services/SubTasksService';
import { Button, HStack, Pressable, ScrollView, Text, View } from 'native-base';
import Icon from "react-native-vector-icons/Ionicons";
import React, { useCallback, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import CircleProgressSubtask from '@/components/reusable/CircleProgressSubtask';
import RightArrowIcon from '@/components/icons/RightArrowIcon';
import { ITask } from '@/interfaces/ITask';
import BackArrowIcon from '@/components/icons/BackArrow';
import ActivityLoader from '@/components/reusable/ActivityLoader';
import { ISubTask } from '@/interfaces/ISubTask';
import { RefreshControl } from 'react-native';
import { heightPercentageToDP as h, widthPercentageToDP as w } from 'react-native-responsive-screen';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import SubTaskCard from '@/components/task/SubTaskCard';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook

type SubTaskSummaryScreenProps = {
  route: any
  navigation: any
}

const SubTaskSummaryScreen = ({ route, navigation }: SubTaskSummaryScreenProps) => {
  const { task } = route.params as { task: ITask };
  const isFocused = useIsFocused(); // Hook to check if screen is focused

  const { isLoading, error, data: subtasks, refetch } = useQuery({
    queryKey: ['fetchSubTasks', task?.id],
    queryFn: () => getAllSubTasks(task?.id)
  });

  const refreshData = useCallback(async () => {
    await refetch();
  }, [refetch]);

  useEffect(() => {
    if (isFocused) {
      refreshData();
    }
  }, [isFocused, refreshData]);

  return (
    <ScrollView backgroundColor={'#FFFAF2'}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
          }}
          colors={['#ff0000', '#00ff00', '#0000ff']}
          tintColor={'gray'}
        />
      }>
      <View margin={'30px'} marginTop={'60px'}>
        <HStack flexDirection="row" justifyContent="center" flex={1}>
          <Pressable style={{ flexDirection: 'row', justifyContent: 'flex-start' }} flex={1} onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} flex={1}>
            <LegacyWordmark />
          </View>
        </HStack>
        <View
          width={'100%'}
          marginTop={h('2%')}
          flexDirection="column"
        >
          <Text
            marginBottom={h('2%')}
            fontSize={moderateScale(26)}
            lineHeight={verticalScale(29)}
            fontWeight={'400'}
            fontFamily={"Roca Regular"}
            color={'barkBrown'}
            justifyContent={'center'}
            textAlign={"center"}>
            {task?.task_name}
          </Text>
          <Text
            marginBottom={h('2%')}
            paddingX={w('10%')}
            fontWeight={'400'}
            fontSize={moderateScale(15)}
            lineHeight={verticalScale(19)}
            fontFamily={"Inter_400Regular"}
            color={'barkBrown'}
            justifyContent={'center'}
            textAlign={"center"}>
            {task?.task_description}
          </Text>
          <CircleProgressSubtask task={task} />
          <Text marginTop='25px' fontSize='24' fontWeight={'400'} fontFamily={"Roca Regular"} color={'barkBrown'}>
            Upcoming Tasks
          </Text>
        </View>
        <View
          marginTop={h('2%')}
          width={'100%'}
          flexDirection="column"
        >
          <View marginTop='5px' flexDirection='column' justifyContent='space-between' flex={1}>
            {isLoading && <ActivityLoader />}
            {error && <Text>Error: {error.message}</Text>}
            {subtasks?.length === 0 && <Text>No subtasks found</Text>}
            {subtasks?.map((item, index) => (
              <SubTaskCard subtask={item} navigation={navigation} key={index} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  )
};


export default SubTaskSummaryScreen;