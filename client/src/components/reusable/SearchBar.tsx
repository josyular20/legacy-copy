import { IInputProps, Input } from 'native-base';

import React, { useEffect } from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';

type SearchBarProps<T> = {
  isPending: boolean;
  inputSearch: string;
  debounceTime?: number;
  keys: string[];
  updateSearchValue: (text: string) => void;
  filterItems: (itemsList: T[], keys: string[]) => T[];
  filteringType: T[];
  updateFilteredValues: (filteredValues: T[]) => void;
  style?: ViewStyle;
} & IInputProps;

export default function SearchBar<T>(props: SearchBarProps<T>) {
  const [loading, setLoading] = React.useState(false);
  let debounceTimer: NodeJS.Timeout;

  useEffect(() => {
    const debounce = (func: () => void, delay: number) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        func();
      }, delay);
    };

    const filterAndSetLoading = () => {
      setLoading(true); // Set isLoading to true when filtering starts
      const filteredTasks = props.filterItems(props.filteringType, props.keys);
      props.updateFilteredValues(filteredTasks);

      debounce(() => {
        setLoading(false); // Set isLoading to false after filtering
        const filteredTasks = props.filterItems(props.filteringType, props.keys);
        props.updateFilteredValues(filteredTasks);
      }, props.debounceTime || 300);
    }

    debounce(filterAndSetLoading, props.debounceTime || 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [props.inputSearch, props.filteringType]);

  return (
    <Input
      placeholder="Search"
      size="md"
      isDisabled={props.isPending ? true : false}
      value={props.inputSearch}
      onChangeText={(text) => props.updateSearchValue(text)}
      style={props.style}
      {...props}
      rightElement={
        loading ? (
          <>
            <ActivityIndicator
              size="small"
              color="#0F4D3F"
              style={{ marginRight: 10 }}
            />
          </>
        ) : (
          <></>
        )
      }
    />
  );
}
