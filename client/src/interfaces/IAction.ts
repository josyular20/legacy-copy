export type IAction = IInput | ISelect | ITextArea | ICheckbox | IRadio;

export type IInput = {
  action_type: string;
  label: string;
  name: string;
  required: boolean;
  type: 'text' | 'password';
  placeholder: string;
  description?: string;
};

export type ISelect = {
  action_type: string;
  label: string;
  name: string;
  required: boolean;
  options: string[];
  placeholder: string;
  description: string;
};

export type ITextArea = {
  action_type: string;
  label: string;
  name: string;
  required: boolean;
  placeholder: string;
  description: string;
};

export type ICheckbox = {
  action_type: string;
  label: string;
  name: string;
  required: boolean;
  options: string[];
  description: string;
};

export type IRadio = {
  action_type: string;
  label: string;
  name: string;
  required: boolean;
  options: string[];
  description: string;
};
