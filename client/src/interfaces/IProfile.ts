import { IOnboardingFlowState } from '@/interfaces/IOnboardingFlowState';

import { IModel } from './IModel';

export interface IProfile extends IModel {
  name: string;
  date_of_birth: Date;
  phone_number: number;
  onboarding_response: IOnboardingFlowState;
  completed_onboarding_response: boolean;
  user_id: number;
}
