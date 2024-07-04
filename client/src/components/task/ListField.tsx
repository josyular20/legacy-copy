import { HStack, Input, DeleteIcon, Button, Pressable, View } from "native-base";
import React, { useState, useCallback } from "react";
import { heightPercentageToDP as h } from "react-native-responsive-screen";

type ListFieldProps = {
    action: IList;
    index: number;
    setFormState: React.Dispatch<React.SetStateAction<{}>>;
};

type IList = {
    name: string;
    label: string;
    placeholder: string;
};

const ListField: React.FC<ListFieldProps> = ({ action, index, setFormState }) => {
    const [listItems, setListItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState<string>('');

    const handleAddItem = useCallback(() => {
        if (newItem.trim() !== '') {
            setListItems((prevItems) => [...prevItems, newItem]);
            setFormState((prevState) => ({ ...prevState, [action.name]: [...listItems, newItem] }));
        }
    }, [newItem, listItems, action.name, setFormState]);

    const handleRemoveItem = useCallback((idx: number) => {
        setListItems((prevItems) => prevItems.filter((_, i) => i !== idx));
    }, []);

    return (
        <View width={'100%'}>
            <HStack flexDirection="row" alignItems="center" marginBottom={h('1%')} space={3}>
                <Input
                    flex={1}
                    placeholder={action.placeholder}
                    onChangeText={(newItem) => setNewItem(newItem)}
                    borderBottomWidth={h('0.1%')}
                    borderTopWidth={0}
                    borderLeftWidth={0}
                    borderRightWidth={0}
                    borderBottomColor={'Brown'}
                    backgroundColor={'#F5EFE7'}
                />
                <Button
                    onPress={handleAddItem}
                    flex={0.3}
                    backgroundColor={'#43A573'}
                    borderColor={'#43A573'}
                    borderWidth={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={h('4%')}
                    padding={0}
                >
                    Add
                </Button>
            </HStack>
            <View>
                {listItems.map((item, idx) => (
                    <HStack key={idx} flexDirection="row" alignItems="center" marginBottom={h('1%')} space={3}>
                        <Input
                            isReadOnly={true}
                            flex={1}
                            value={item}
                            borderBottomWidth={h('0.1%')}
                            borderTopWidth={0}
                            borderLeftWidth={0}
                            borderRightWidth={0}
                            borderBottomColor={'Brown'}
                            backgroundColor={'#F5EFE7'}
                        />

                        <Pressable
                            onPress={() => handleRemoveItem(idx)}
                            flex={0.3}
                            backgroundColor={'red.500'}
                            borderColor={'red.500'}
                            borderWidth={1}
                            borderRadius={4}
                            justifyContent={'center'}
                            alignItems={'center'}
                            height={h('4%')}
                            width={h('2%')}
                            padding={0}
                        >
                            <DeleteIcon
                                size={h('2%')}
                                color={'white'}
                            />
                        </Pressable>
                    </HStack>
                ))}
            </View>
        </View >
    );
};

export default ListField;