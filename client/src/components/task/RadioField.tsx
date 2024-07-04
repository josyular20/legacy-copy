import { IRadio } from "@/interfaces/IAction";
import { View, Text, Radio } from "native-base";
import { heightPercentageToDP as h } from "react-native-responsive-screen";
import React from "react";

type RadioFieldProps = {
    action: IRadio;
    index: number;
    setFormState: React.Dispatch<React.SetStateAction<{}>>;
    formState: any;
};

const RadioField: React.FC<RadioFieldProps> = (RadioFieldProps) => {
    const { action, index, setFormState, formState } = RadioFieldProps;

    const handleRadioChange = (name: string, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <View width={'100%'}>
            <Radio.Group
                key={index}
                name={action.name}
                accessibilityLabel={action.label}
                value={formState[action.name]}
                onChange={(value) => handleRadioChange(action.name, value)}
                style={{ flexDirection: 'column' }}
            >
                {action.options.map((option: string, idx: number) => (
                    <Radio key={idx} value={option} my={1}>
                        <Text
                            fontFamily={'Inter_400Regular'}
                            color={'barkBrown'}
                            fontSize={h('1.5%')}
                            marginLeft={h('1%')}
                        >
                            {option}
                        </Text>
                    </Radio>
                ))}
            </Radio.Group>
        </View>
    );
}

export default RadioField;