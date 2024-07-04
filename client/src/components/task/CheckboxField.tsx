import React from 'react';
import { View, Text, Checkbox } from 'native-base';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';
import { ICheckbox } from '@/interfaces/IAction';

type CheckboxFieldProps = {
    action: ICheckbox;
    index: number;
    setFormState: React.Dispatch<React.SetStateAction<{}>>;
};

const CheckboxField: React.FC<CheckboxFieldProps> = (CheckboxFieldProps) => {
    const { action, index, setFormState } = CheckboxFieldProps;

    const handleCheckboxChange = (values: string[], name: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: values.reduce((obj, value) => {
                obj[value] = true;
                return obj;
            }, {})
        }));
    };

    return (
        <View width={'100%'}>
            <Checkbox.Group
                key={index}
                color="deepEvergreen"
                defaultValue={[]}
                onChange={(values) => handleCheckboxChange(values, action.name)}
                style={{ flexDirection: 'column' }}
            >
                {action.options.map((option: string, idx: number) => (
                    <Checkbox key={idx} value={option} my={1}>
                        <Text
                            fontFamily={'Inter_400Regular'}
                            color={'barkBrown'}
                            fontSize={h('1.5%')}
                            marginLeft={h('1%')}

                        >
                            {option}
                        </Text>
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </View >
    );
}

export default CheckboxField;