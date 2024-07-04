// import * as DocumentPicker from 'expo-document-picker';
import FileList from '@/components/filecollection/FileList';
import NoTaskIcon from '@/components/icons/NoTaskIcon';
import ActivityLoader from '@/components/reusable/ActivityLoader';
import LegacyWordmark from '@/components/reusable/LegacyWordmark';
import Rectangle from '@/components/reusable/Rectangle';
import ScreenBody from '@/components/reusable/ScreenBody';
import SearchBar from '@/components/reusable/SearchBar';
import TaskTagGrid from '@/components/reusable/TaskTagGrid';
import { useUser } from '@/contexts/UserContext';
import { IFile } from '@/interfaces/IFile';
import { fetchUserFilesList, uploadFile } from '@/services/FileService';
import { moderateScale, verticalScale } from '@/utils/FontSizeUtils';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Fuse from 'fuse.js';
import {
  AddIcon,
  Button,
  ChevronDownIcon,
  Icon,
  Pressable,
  ScrollView,
  Square,
  Text,
  View
} from 'native-base';
import { background } from 'native-base/lib/typescript/theme/styled-system';

import React, { useRef, useState } from 'react';
import { Alert, RefreshControl, TouchableOpacity, ViewStyle } from 'react-native';
import {
  heightPercentageToDP as h,
  widthPercentageToDP as w
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FileCollectionScreen() {
  const { user } = useUser();
  const [selectedTags, setSelectedTags] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>([]);
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [reverse, setReverse] = useState(false);
  const [gallery, setGallery] = useState(false);

  const {
    isPending,
    data: files,
    error,
    refetch
  } = useQuery({
    queryKey: ['userfiles', user?.id, selectedTags],
    queryFn: () => fetchUserFilesList(user.id, selectedTags),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  console.log('Query Key:', ['userFiles', user?.id, selectedTags]);

  const filterFiles = (files: IFile[], keys: string[]): IFile[] => {
    if (search.length > 0) {
      const options = {
        keys: keys,
        threshold: 0.2
      };
      const fuse = new Fuse(files, options);
      const fuseResponse = fuse.search(search);
      return fuseResponse.map((item) => item.item);
    } else {
      return files;
    }
  };

  const selectDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      });
      console.log('result', result);

      if (result.canceled === false) {
        sendFile.mutate(result.assets[0], {
          onSuccess: () => {
            refetch();
          },
          onError: (error) => {
            Alert.alert('Error uploading file', error.message);
          }
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const sendFile = useMutation({
    mutationFn: async (file: DocumentPicker.DocumentPickerAsset) =>
      await uploadFile(file, user.id)
  });

  const handlePress = () => {
    setGallery(!gallery);
  };
  

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#FFF9EE' }}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isPending}
            onRefresh={() => {
              refetch();
            }}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            tintColor={'grey'}
          />
        }
      >
        <ScreenBody>
          <LegacyWordmark />
          <View
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            marginTop={h('2%')}
          >
            <View>
              <Text
                color={'barkBrown'}
                fontFamily={'rocaOne'}
                fontWeight={'Regular'}
                fontStyle={'normal'}
                fontSize={moderateScale(22)}
                lineHeight={verticalScale(21)}
              >
                Sort By
              </Text>
            </View>
            <View
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              flex={1}
            >
              <SearchBar
                isPending={isPending}
                inputSearch={search}
                keys={['file_name']}
                updateSearchValue={setSearch}
                filterItems={filterFiles}
                filteringType={files}
                updateFilteredValues={setFilteredFiles}
                width={h('22%')}
                height={h('4%')}
                justifyContent={'center'}
                alignItems={'center'}
                borderBottomWidth={1}
                borderRightWidth={0}
                borderLeftWidth={0}
                borderTopWidth={0}
                backgroundColor={'transparent'}
                placeholder={'Search'}
                display={'flex'}
              />
              <Button
                onPress={selectDocument}
                backgroundColor={'transparent'}
                height={h('5%')}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <AddIcon as={Icon} color={'#000'} size={h('2%')} />
              </Button>
            </View>
          </View>

          <TaskTagGrid
            selectedTags={selectedTags}
            pressfunc={setSelectedTags}
          />

          <AllFilesSelection
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            reverse={reverse}
            setReverse={setReverse}
          />

          {isPending && <ActivityLoader />}
          {error && <Text>Error: {error.message}</Text>}
          {filteredFiles && (
            <FileList
              files={filteredFiles}
              orderBy={orderBy}
              reverse={reverse}
              refetch={refetch}
              gallery={gallery}
            />
          )}
          {sendFile.isPending && <ActivityLoader />}
        </ScreenBody>
      </ScrollView>
      <TouchableOpacity onPress={handlePress} >
        {/* <View style={{
        position: 'absolute',
        bottom: 40, // Adjust as needed
        right: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 50,
        }}>

      {gallery ? <Rows /> : <Grid />}
      </View> */}

      </TouchableOpacity>

    </SafeAreaView>
  );
}

type AllFilesSelectionProps = {
  orderBy: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  reverse: boolean;
  setReverse: React.Dispatch<React.SetStateAction<boolean>>;
};

const AllFilesSelection = ({
  orderBy,
  setOrderBy,
  reverse,
  setReverse
}: AllFilesSelectionProps) => {
  const [rotated, setRotated] = useState(false);

  // name -> size -> date
  const handleOrderBy = () => {
    if (orderBy === 'name') {
      setOrderBy('size');
    } else if (orderBy === 'size') {
      setOrderBy('date');
    } else {
      setOrderBy('name');
    }
  };

  const handleReverse = () => {
    setReverse(!reverse);
  };

  return (
    <View
      marginTop={h('2%')}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Text
        color={'barkBrown'}
        fontFamily={'rocaOne'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        fontSize={moderateScale(22)}
        lineHeight={verticalScale(21)}
      >
        All Files
      </Text>
      <View
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-evenly'}
      >
        <Pressable onPress={() => handleOrderBy()}>
          <Text
            color={'barkBrown'}
            fontFamily={'rocaOne'}
            fontWeight={'Regular'}
            fontStyle={'normal'}
            fontSize={moderateScale(19)}
            lineHeight={verticalScale(21)}
            paddingRight={w('.5%')}
          >
            {orderBy === 'name'
              ? 'Name'
              : orderBy === 'name-reversed'
                ? 'Name'
                : orderBy === 'size'
                  ? 'Size'
                  : 'Last Modified'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handleReverse();
          }}
          style={{ transform: [{ rotate: reverse ? '180deg' : '0deg' }] }}
        >
          <ChevronDownIcon as={Icon} color={'#000'} size={h('2%')} />
        </Pressable>
      </View>
    </View>
  );
};

const Grid = () => {
  
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', marginBottom: 5 }}>
        <Rectangle/>
        <View style={{ marginLeft: 5 }} />
        <Rectangle/>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Rectangle/>
        <View style={{ marginLeft: 5 }} />
        <Rectangle/>
      </View>
    </View>
  ); 
};

const Rows = () => {
  return (
    <View style={{flexDirection: 'column',  alignItems: 'center'}}>
      <View style={{width: 25, height: 3, backgroundColor: 'white',  marginVertical: 3 }} />
      <View style={{width: 25, height: 3, backgroundColor: 'white',  marginVertical: 3 }} />
      <View style={{width: 25, height: 3, backgroundColor: 'white',  marginVertical: 3 }} />
    </View>
  );
}
