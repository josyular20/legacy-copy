import { useUser } from '@/contexts/UserContext';
import { IAction } from '@/interfaces/IAction';
import { createFile } from '@/services/FileService';
import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  ScrollView,
  Select,
  Text,
  View,
  Pressable,
  Input,
  DeleteIcon
} from 'native-base';
import { heightPercentageToDP as h, widthPercentageToDP as w } from 'react-native-responsive-screen';

import React, { useCallback, useEffect, useState } from 'react';
import { ZodIssue, z } from 'zod';
import InputField from '@/components/task/InputField';
import SelectField from '@/components/task/SelectField';
import TextAreaField from '@/components/task/TextAreaField';
import CheckboxField from '../../../components/task/CheckboxField';
import RadioField from '../../../components/task/RadioField';
import { Alert, GestureResponderEvent } from 'react-native';
import { ISubTask } from '@/interfaces/ISubTask';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getActions } from '@/services/ActionsService';
import BackArrowIcon from '@/components/icons/BackArrow';
import NoTaskIcon from '@/components/icons/NoTaskIcon';
import ActivityLoader from '@/components/reusable/ActivityLoader';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import { fetchTask } from '@/services/TaskService';
import { completeSubTask } from '@/services/SubTasksService';
import ListField from '@/components/task/ListField';

type ActionScreenProps = {
  navigation: any;
  route: any
};

const ActionScreen = ({ navigation, route }: ActionScreenProps) => {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState<ZodIssue[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const { user } = useUser();
  const { subtask } = route.params as { subtask: ISubTask };


  const { isLoading, error, data: actions } = useQuery({
    queryKey: ['fetchActions', subtask?.id],
    queryFn: () => getActions(subtask?.id)
  });

  const handleSubmit = async (e: GestureResponderEvent) => {
    e.preventDefault();


    try {
      try {
        validateFormState();
      } catch (err: string | any) {
        // remove underscore from field name
        const errorResponse = err.message;
        const errorField = errorResponse.split(' ')[1].replace(/_/g, ' ');

        Alert.alert('Error', `Please fill out the ${errorField} field.`);
        return;
      }
      setDisabled(true);
      setFormState({ ...formState, user_id: user?.id, sub_task_name: subtask.sub_task_name, timestamp: Date.now() })
      await createFile(user?.id, subtask.sub_task_name, formState);
      await completeSubTask(user?.id, subtask?.id)
      const task = await fetchTask(subtask?.task_id);
      navigation.navigate('SubTask Summary Screen', { task: task });

    } catch (err) {
      console.log(err);
    }
  }

  const validateFormState = useCallback(() => {
    for (const action of actions['actions']) {
      if (action.required && (!formState[action.name] || formState[action.name] === '')) {
        throw new Error(`Field '${action.name}' is required but not filled.`);
      }
    }
    return true; // Return true if all validations pass
  }, [formState, actions]);


  const renderField = (action, index: number) => {
    switch (action.action_type) {
      case 'input':
        return <InputField action={action} index={index} setFormState={setFormState} formErrors={formErrors} setFormErrors={setFormErrors} />
      case 'select':
        return <SelectField action={action} index={index} setFormState={setFormState} />
      case 'textarea':
        return <TextAreaField action={action} index={index} setFormState={setFormState} setFormErrors={setFormErrors} />
      case 'checkbox':
        return <CheckboxField action={action} index={index} setFormState={setFormState} />
      case 'radio':
        return <RadioField action={action} index={index} setFormState={setFormState} formState={formState} />
      case 'list':
        return <ListField action={action} index={index} setFormState={setFormState} />
      default:
        return null;
    }
  };

  if (isLoading) {
    return <ActivityLoader />
  }

  if (error) {
    return (
      <View marginTop={h('10%')} justifyContent="center" alignItems="center">
        <Text> error </Text>
      </View>
    )
  }

  return (
    <ScrollView backgroundColor={'#FFFAF2'}>
      <View marginX={w('5%')} marginTop={h('8%')}>
        <HStack flexDirection="row" justifyContent="center" flex={1}>
          <Pressable flex={1} onPress={() => navigation.goBack()}>
            <BackArrowIcon />
          </Pressable>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} flex={1}>
            <LegacyWordmark />
          </View>
        </HStack>
        <View
          width={'100%'}
          marginTop={h('2%')}
        >
          <Text
            marginBottom={h('1%')}
            fontSize='24'
            fontWeight={'400'}
            fontFamily={"Roca Regular"}
            color={'barkBrown'}>
            {subtask.sub_task_name}
          </Text>
          <Text
            marginBottom={h('1%')}
            fontSize={moderateScale(16)}
            lineHeight={verticalScale(19)}
            fontWeight={'400'}
            fontFamily={"Inter_400Regular"}
            color={'barkBrown'} >
            {subtask.sub_task_description}
          </Text>
        </View>
        {isLoading && <ActivityLoader />}
        {error && <Text> error </Text>}
        {actions === null || (actions && Object.keys(actions).length === 0) ? (
          <View width={"100%"} marginTop={h('10%')} justifyContent="center" alignItems="center">
            <NoTaskIcon />

            <Text
              marginTop={h('2%')}
              fontSize={moderateScale(16)}
              lineHeight={verticalScale(19)}
              fontWeight={'400'}
              fontFamily={"Inter_400Regular"}
              color={'gray.500'}
            >
              No Actions Available (yet)
            </Text>
          </View>
        ) : (
          <View>
            {actions['actions'].map((action: IAction, index: number) => (
              <ScrollView key={index}>
                <FormControl
                  isRequired={action.required}
                  key={index}
                  mt={4}
                >
                  <FormControl.Label>
                    <Text>{action.label}</Text>
                  </FormControl.Label>
                  {renderField(action, index)}
                </FormControl>
              </ScrollView>
            ))}
              <SubmitButton handleSubmit={handleSubmit} isDisabled={disabled} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default ActionScreen;

type SubmitButtonProps = {
  handleSubmit: (e: GestureResponderEvent) => void
  isDisabled?: boolean
}

const SubmitButton = ({ handleSubmit, isDisabled }: SubmitButtonProps) => {
  return (
    <View
      marginBottom={h('3%')}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      marginTop={h('3%')}
      width={'100%'}
      backgroundColor={'#FFFAF2'}
    >
      <Button
        textDecorationColor={'#FFFFFF'}
        backgroundColor={'#43A573'}
        borderColor={'#43A573'}
        onPress={handleSubmit}
        flex={0.9}
        isDisabled={isDisabled ? isDisabled : false}
      >
        Submit
      </Button>
    </View>
  )
}