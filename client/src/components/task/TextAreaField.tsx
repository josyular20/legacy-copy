import React from 'react';
import { View, Text, TextArea } from 'native-base';
import { heightPercentageToDP as h } from 'react-native-responsive-screen';
import { ITextArea } from '@/interfaces/IAction';
import { ZodIssue, z } from 'zod';

type TextAreaFieldProps = {
    action: ITextArea
    index: number;
    setFormState: React.Dispatch<React.SetStateAction<{}>>;
    setFormErrors: React.Dispatch<React.SetStateAction<ZodIssue[]>>;
};

const TextAreaField: React.FC<TextAreaFieldProps> = (TextAreaFieldProps) => {
    const { action, index, setFormState, setFormErrors } = TextAreaFieldProps;

    const handleTextAreaChange = (name: string, value: string) => {
        const errorMessage = validateTextArea(value);

        setFormState((prevState) => ({ ...prevState, [name]: value }));
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    const validateTextArea = (value: string) => {
        try {
            const schema = z.string().min(1).max(200);
            schema.parse(value);
            return undefined;
        } catch (error) {
            return error.errors as ZodIssue[];
        }
    }

    return (
        <View width={'100%'}>
            <TextArea
                key={index}
                area-label={action.label}
                placeholder={action.placeholder}
                numberOfLines={4}
                onChangeText={(value) => handleTextAreaChange(action.name, value)}
                autoCompleteType="off"
                backgroundColor={'#F5EFE7'}
            />
        </View>
    );
}

export default TextAreaField;