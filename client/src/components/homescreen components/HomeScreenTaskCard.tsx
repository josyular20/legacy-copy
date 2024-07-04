import { ITask } from '@/interfaces/ITask';
import { fetchTaskTag, getTaskProgress } from '@/services/TaskService';
import { Text, View } from 'native-base';

import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';

import RightArrowIcon from '../icons/RightArrowIcon';
import CircleProgress from '../reusable/CircleProgress';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@/contexts/UserContext';
import { useIsFocused } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';


type HSTCProps = {
  task: ITask;
  isAllTasks?: boolean;
  handleOnPress?: () => void;
};

const HomeScreenTaskCard: React.FC<HSTCProps> = ({ task, isAllTasks, handleOnPress }) => {
  const { user } = useUser();
  const isFocused = useIsFocused(); 
  const [tag, setTag] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { isLoading, error: completeError, data: complete, refetch } = useQuery({
    queryKey: ['fetchTaskProgress', user?.id, task?.id],
    queryFn: () => getTaskProgress(user?.id, task?.id)
  });

  const refreshData = useCallback(async () => {
    await refetch();
  }, [refetch]);


  useEffect(() => {
    if (isFocused) {
      refreshData();
    }
  }, [isFocused, refetch]);

  useEffect(() => {
    if (!isAllTasks) {
      const fetchData = async () => {
        setIsPending(true);
        try {
          const fetchedTag = await fetchTaskTag(task?.id);
          setTag(fetchedTag);
        } catch (err) {
          setError(err);
        } finally {
          setIsPending(false);
        }
      };

      fetchData();
    }
  }, [isAllTasks, task.id]);

  if (isLoading) {
    return <Text>Loading...</Text>
  };

  if (completeError) {
    return <Text>Error</Text>
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      disabled={complete?.progress === 100}
    >
      <View
        paddingLeft={5}
        paddingTop={6}
        paddingBottom={6}
        bgColor={'#FFFFFF'}
        borderRadius={13}
        borderWidth={1}
        borderColor={'#0F4D3F'}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={4}
        position={'relative'}
      >
        <View
          flexDir={'row'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <View
            style={{
              flex: 1,
              paddingRight: 10,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              alignContent: 'flex-start'
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                marginBottom: 5
              }}
              color={complete?.progress === 100 ? '#00000033' : '#2F1D12'}
            >
              {task.task_name}
            </Text>
            <Text
              fontSize={h('1.7%')}
              color={complete?.progress === 100 ? '#00000033' : '#2F1D12'}
            >
              {task.task_description}
            </Text>
          </View>
          <CircleProgress task={task} />
          <View
            style={{
              alignSelf: 'flex-end',
              marginTop: 10,
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center'
            }}
          >
            <RightArrowIcon />
          </View>
        </View>

        {isPending && <View />}
        {error && <View />}
        {tag && (
          <View
            style={{
              position: 'absolute',
              top: -1,
              right: 0,
              backgroundColor: '#0F4D3F',
              borderTopRightRadius: 12,
              borderBottomLeftRadius: 12,
              paddingLeft: 3,
              paddingRight: 5,
              paddingTop: 2,
              paddingBottom: 2
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#FFFFFF'
              }}
            >
              {tag}
            </Text>
          </View>
        )}
      </View>
      </TouchableOpacity>
  );
};

export default HomeScreenTaskCard;
