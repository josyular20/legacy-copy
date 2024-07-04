import { IFile } from '@/interfaces/IFile';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import { HStack, Text, VStack, View } from 'native-base';

import React from 'react';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';

import NoTaskIcon from '../icons/NoTaskIcon';
import FileRow from './FileRow';

type FileListProps = {
  files: IFile[];
  orderBy?: string;
  reverse?: boolean;
  gallery?: boolean;
  refetch: Function;
};

const FileList: React.FC<FileListProps> = ({
  files,
  orderBy,
  reverse,
  gallery,
  refetch
}: FileListProps) => {
  console.log('FileListProps', { orderBy, reverse });
  let sortedFiles = [...files];

  if (orderBy === 'name') {
    sortedFiles = sortedFiles.sort((a, b) =>
      a.file_name.localeCompare(b.file_name)
    );
  } else if (orderBy === 'date') {
    sortedFiles = sortedFiles.sort((a, b) =>
      a.updated_at > b.updated_at ? -1 : 1
    );
  } else if (orderBy === 'size') {
    sortedFiles = sortedFiles.sort((a, b) =>
      a.file_size > b.file_size ? -1 : 1
    );
  }

  if (reverse) {
    sortedFiles.reverse();
  }

  const itemsPerRow = 2;

  // Split the items into rows of 2
  const rows = Array.from({ length: Math.ceil(sortedFiles.length / itemsPerRow) }, (_, index) =>
  sortedFiles.slice(index * itemsPerRow, (index + 1) * itemsPerRow)
  );

  return (
    <View paddingTop={h('2%')}>
      {gallery ?  // Use HStack for horizontal layout if gallery is true
        <View>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row' }}>
            {row.map((item, itemIndex) => (
              <View key={itemIndex} style={{ marginRight: 10 }}>
                <FileRow key={item.id} file={item} refetch={refetch} />
              </View>
            ))}
          </View>
        ))}
      </View>
       : (
        <VStack space={1}>
          {sortedFiles.length === 0 && <NoTasks />}
          {sortedFiles.map((file) => (
            <FileRow key={file.id} file={file} refetch={refetch} />
          ))}
        </VStack>
      )}
    </View>
  );
};

export default FileList;

const NoTasks = () => {
  return (
    <View marginTop={h('2%')} justifyContent={'center'} alignItems={'center'}>
      <NoTaskIcon />
      <Text
        color={'#00000066'}
        fontFamily={'rocaOne'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        fontSize={moderateScale(21)}
        lineHeight={verticalScale(21)}
      >
        Whoops!
      </Text>
      <Text
        color={'#00000066'}
        fontFamily={'rocaOne'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        fontSize={moderateScale(12)}
        lineHeight={verticalScale(21)}
      >
        No files found.
      </Text>
    </View>
  );
};
