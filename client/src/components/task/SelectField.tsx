import { View, Text, Select } from 'native-base';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { ISelect } from '@/interfaces/IAction';

type SelectFieldProps = {
    action: ISelect;
    index: number;
    setFormState: React.Dispatch<React.SetStateAction<{}>>;
};

const SelectField: React.FC<SelectFieldProps> = (SelectFieldProps) => {
    const [selectedValue, setSelectedValue] = useState('');

    const { action, index, setFormState } = SelectFieldProps;

    const handleSelectChange = (name: string, value: string) => {
        setFormState((prevState) => ({ ...prevState, [name]: value }));
        setSelectedValue(value);
    }

    return (
        <View width={'100%'}>
            <Select
                minWidth="200"
                accessibilityLabel={action.placeholder}
                placeholder={action.placeholder}
                selectedValue={selectedValue}
                onValueChange={(value) => handleSelectChange(action.name, value)}
                mt={1}
                key={index}
                backgroundColor={'#F5EFE7'}

            >
                {action.options.map((option: string, idx: number) => (
                    <Select.Item
                        key={idx}
                        label={option}
                        value={option}
                        fontFamily={'Inter_400Regular'}
                        color={'barkBrown'}
                    />
                ))}
            </Select>
        </View>
    );
}

export default SelectField;