import React, { useCallback, useEffect } from 'react'
import { View, Text, Pressable, Button } from 'native-base'
import { moderateScale } from '@/utils/FontSizeUtils'
import { heightPercentageToDP as h, widthPercentageToDP as w } from 'react-native-responsive-screen'
import RightArrowIcon from '@/components/icons/RightArrowIcon'
import { ISubTask } from '@/interfaces/ISubTask'
import { isLoading } from 'expo-font';
import { useQuery } from '@tanstack/react-query'
import { getSubtaskProgress } from '@/services/SubTasksService'
import { useUser } from '@/contexts/UserContext'
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook

type SubTasksProps = {
    subtask: ISubTask
    navigation: any
}

const SubTaskCard = ({ subtask, navigation }: SubTasksProps) => {
    const { user } = useUser();
    const isFocused = useIsFocused();

    const { isLoading, error, data: complete, refetch } = useQuery({
        queryKey: ['fetchSubtaskProgress', user?.id, subtask?.id],
        queryFn: () => getSubtaskProgress(user?.id, subtask?.id)
    });

    const refreshData = useCallback(async () => {
        await refetch();
    }, [refetch]);


    useEffect(() => {
        if (isFocused) {
            refreshData();
        }
    }, [isFocused, refetch]);

    if (isLoading) {
        return <Text>Loading...</Text>
    };

    if (error) {
        return <Text>Error</Text>
    };

    return (
        <Pressable
            onPress={() => navigation.navigate('Action Screen', { subtask: subtask })}
            isDisabled={complete?.completed}
        >
            <View
                paddingLeft={h('2%')}
                paddingTop={h('2%')}
                paddingBottom={h('2%')}
                bgColor={complete?.completed ? '#0F4D3F' : '#FFFFFF'}
                borderRadius={13}
                borderWidth={1}
                borderColor={'#0F4D3F'}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginBottom={h('2%')}
            >
                <View flexDir={'row'} alignItems={'flex-start'} justifyContent={'space-between'} width={'100%'}>
                    <View
                        flexDir={'column'}
                        alignItems={'flex-start'}
                        justifyContent={'space-between'}
                        width={'100%'}
                        marginRight={w('2%')}
                        flex={1}
                    >
                        <Text
                            fontSize={moderateScale(15)}
                            fontWeight={'500'}
                            marginBottom={h('.5%')}
                            color={complete?.completed ? '#FFFFFF' : '#2F1D12'}
                        >
                            {subtask?.sub_task_name}
                        </Text>
                        <Text
                            fontSize={moderateScale(12)}
                            fontWeight={'400'}
                            color={complete?.completed ? '#FFFFFF' : '#2F1D12'}
                            marginBottom={h('.5%')}
                        >
                            {subtask?.sub_task_description}
                        </Text>
                    </View>
                    <View alignSelf={'center'} alignItems={'center'} justifyContent={'center'}>
                        <RightArrowIcon color={complete?.completed ? '#FFFFFF' : '#2F1D12'} />
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default SubTaskCard;