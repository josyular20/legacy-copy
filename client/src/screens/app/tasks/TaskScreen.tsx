import { useUser } from '@/contexts/UserContext';
import { Input, ScrollView, Text, View } from 'native-base';

import React, { useState } from 'react';

import HomeScreenTaskCard from '../../../components/homescreen components/HomeScreenTaskCard';
import LegacyWordmark from '../../../components/reusable/LegacyWordmark';
import { fetchUserTasks } from '@/services/TaskService';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Pressable, RefreshControl } from 'react-native';
import { ITask } from '@/interfaces/ITask';
import BackArrowIcon from '@/components/icons/BackArrow';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';
import SearchBar from '@/components/reusable/SearchBar';
import Fuse from 'fuse.js';

type TaskScreenProps = {
  navigation: any;
};

export default function TaskScreen({ navigation }: TaskScreenProps) {
  const { user } = useUser();
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [fileteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  let debounceTimer;

  const { isPending, data: tasks, error, refetch } = useQuery({
    queryKey: ['tasks', user?.id, selectedTags],
    queryFn: async () => await fetchUserTasks(user?.id, selectedTags),
    staleTime: 60000 // TEMP, unsolved refetch when unncessary
  });

  const filterTasks = (tasks: ITask[], keys: string[]): ITask[] => {
    if (search.length > 0) {
      const options = {
        keys: keys,
        threshold: 0.2
      };
      const fuse = new Fuse(tasks, options);
      const fuseResponse = fuse.search(search);
      return fuseResponse.map((item) => item.item);
    } else {
      return tasks;
    }
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={() => {
              refetch();
            }}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            tintColor={'#ff0000'}
          />
        }
        backgroundColor={'#FFFAF2'}>
        <View margin={'30px'} marginTop={'60px'}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <LegacyWordmark />
          </View>
          <Pressable onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <View width={'100%'} marginTop={'20px'}>
            <Text
              marginBottom="20px"
              fontSize="24"
              fontWeight={'200'}
              fontFamily={'madeDillan'}
            >
              All Tasks
            </Text>
            <View>
              <SearchBar
                isPending={isPending}
                inputSearch={search}
                keys={['task_name']}
                updateSearchValue={setSearch}
                filterItems={filterTasks}
                filteringType={tasks}
                updateFilteredValues={setFilteredTasks}
                width={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
              />
            </View>
            <View flexDirection={'row'}>
              <TaskTagGrid selectedTags={selectedTags} pressfunc={setSelectedTags} />
            </View>
          </View>
          <View
            marginTop="20px"
            flexDirection="column"
            justifyContent="space-between"
          >
            {isPending && <ActivityIndicator style={{ marginTop: 50 }} />}
            {error && <Text>Error: {error.message}</Text>}
            {fileteredTasks && fileteredTasks.length === 0 && <Text>No tasks found</Text>}
            {fileteredTasks && fileteredTasks.map((item: ITask, index: number) =>
              <View key={index} mb={0}>
                <HomeScreenTaskCard task={item} isAllTasks={false} handleOnPress={() => navigation.navigate('SubTask Summary Screen', { task: item })} />
              </View> 
            )}
          </View>
          <View marginTop={'20px'}></View>
        </View>
      </ScrollView>
    </>
  );
}
