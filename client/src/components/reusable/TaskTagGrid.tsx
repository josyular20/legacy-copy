import { View } from 'native-base';

import React, { useState } from 'react';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';

import TaskTag from './TaskTag';

type TaskTagGridProps = {
  selectedTags: string[];
  pressfunc?: (tags: string[]) => void;
};

export default function TaskTagGrid(props: TaskTagGridProps) {
  const [selectedTags, setSelectedTags] = useState(props.selectedTags);

  const pressTag = (tag: string) => {
    const tagIndex = selectedTags.indexOf(tag);
    let updatedTags: string[] = [];

    if (tagIndex === -1) {
      updatedTags = [...selectedTags, tag];
    } else {
      updatedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    }

    setSelectedTags(updatedTags);
    props.pressfunc && props.pressfunc(updatedTags);
  };

  return (
    <View flexDirection={'row'} flexWrap={'wrap'} mt={h('1%')} width={w('100%')}>
      <TaskTag
        taskText={'Emotional'}
        taskPressed={selectedTags.includes('Emotional')}
        taskPressFunction={() => pressTag('Emotional')}
      />
      <TaskTag
        taskText={'Financial'}
        taskPressed={selectedTags.includes('Financial')}
        taskPressFunction={() => pressTag('Financial')}
      />
      <TaskTag
        taskText={'Value Based'}
        taskPressed={selectedTags.includes('Value Based')}
        taskPressFunction={() => pressTag('Value Based')}
      />
      <TaskTag
        taskText={'Holistic'}
        taskPressed={selectedTags.includes('Holistic')}
        taskPressFunction={() => pressTag('Holistic')}
      />
    </View>
  );
}
