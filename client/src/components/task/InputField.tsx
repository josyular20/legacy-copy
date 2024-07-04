import { IInput } from "@/interfaces/IAction";
import { Input, View, Text } from "native-base";
import { ZodIssue, z } from "zod";
import React, { useCallback } from "react";
import { heightPercentageToDP as h } from "react-native-responsive-screen";

type InputFieldProps = {
  action: IInput;
  index: number;
  setFormState: React.Dispatch<React.SetStateAction<{}>>;
  setFormErrors: React.Dispatch<React.SetStateAction<ZodIssue[]>>;
  formErrors: ZodIssue[];
};

const InputField: React.FC<InputFieldProps> = (InputFieldProps) => {
  const { action, index, setFormState, setFormErrors, formErrors } = InputFieldProps;

  const handleInputChange = useCallback((name: string, value: string) => {
    const errorMessage = validateInput(value);

    setFormState((prevState) => ({ ...prevState, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  }, []);

  const validateInput = (value: string) => {
    try {
      const schema = z.string().min(1).max(50);
      schema.parse(value);
      return undefined;
    } catch (error) {
      return error.errors as ZodIssue[];
    }
  }


  return (
    <View width={'100%'}>
      <Input
        key={index}
        placeholder={action.placeholder}
        type={action.type}
        onChangeText={(value) => handleInputChange(action.name, value)}
        borderBottomWidth={h('0.1%')}
        borderTopWidth={0}
        borderLeftWidth={0}
        borderRightWidth={0}
        borderBottomColor={'Brown'}
        backgroundColor={'#F5EFE7'}
      />
      {formErrors[action.name] && formErrors[action.name].map((error: ZodIssue, index: number) => (
        <Text key={index} color={'red.500'}>
          {error.message}
        </Text>
      ))}
    </View>
  );
}

export default InputField;