import { IOnboardingFlowState } from '@/interfaces/IOnboardingFlowState';

import { createContext, useContext, useState } from 'react';
import React from 'react';

type OnboardingContextData = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onboardingState: IOnboardingFlowState;
  setOnboardingState: React.Dispatch<React.SetStateAction<any>>;
  onboardingFlow: Object;
  handleChange: (name: string, value: any) => void;
};

type OnboardingProviderProps = {
  children?: React.ReactNode;
};

const OnboardingContext = createContext<OnboardingContextData>(
  {} as OnboardingContextData
);

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({
  children
}) => {
  const [page, setPage] = useState(0);
  const [onboardingState, setOnboardingState] = useState<IOnboardingFlowState>({
    worldviewQ1: 1,
    worldviewQ2: 1,
    worldviewQ3: 1,
    worldviewQ4: 1,
    worldviewQ5: 1,
    worldviewQ6: 1,
    emotionalPatternQ1: 1,
    emotionalPatternQ2: 1,
    emotionalPatternQ3: 1,
    workstyleQ1: 1,
    workstyleQ2: 1,
    workstyleQ3: 1,
    workstyleQ4: 1,
    socialInclinationQ1: 1,
    socialInclinationQ2: 1,
    socialInclinationQ3: 1,
    funnelActivitiesQ1: 1,
    funnelActivitiesQ2: 1
  });

  const onboardingFlow = [
    {
      page: 'Sign Up Transition Screen',
      props: {}
    },
    {
      page: 'Quiz Section Intro Screen',
      props: {
        totalCircles: 6,
        title: 'Worldview',
        description:
          'Explore how your perspectives and beliefs shape your approach to life, future planning, and personal standards.'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'worldviewQ1',
        totalCircles: 6,
        completedCircles: 0,
        questionNumber: '1',
        question:
          'Do you meticulously plan for future events, or do you prefer to adapt as situations unfold?',
        upperSpectrumValue: 'Proactive',
        lowerSpectrumValue: 'Spontaneous'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'worldviewQ2',
        totalCircles: 6,
        completedCircles: 1,
        questionNumber: '2',
        question:
          'Do you strive for perfection in everything you do, or are you satisfied once a task meets essential standards?',
        upperSpectrumValue: 'Perfectionist',
        lowerSpectrumValue: 'Pragmatist'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'worldviewQ3',
        totalCircles: 6,
        completedCircles: 2,
        questionNumber: '3',
        question:
          'Do you actively seek self-improvement at all ages, or do you feel content with your current capabilities?',
        upperSpectrumValue: 'Self-Improver',
        lowerSpectrumValue: 'Content'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'worldviewQ4',
        totalCircles: 6,
        completedCircles: 3,
        questionNumber: '4',
        question:
          'How often do you embrace new learning opportunities and step outside your comfort zone?',
        upperSpectrumValue: 'Learner',
        lowerSpectrumValue: 'Stability'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'worldviewQ5',
        totalCircles: 6,
        completedCircles: 4,
        questionNumber: '5',
        question:
          'Do you tend to concentrate on what you lack, or do you focus more on what you can provide to your loved ones?',
        upperSpectrumValue: 'Deficiencies',
        lowerSpectrumValue: 'Contributions'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'worldviewQ6',
        totalCircles: 6,
        completedCircles: 5,
        questionNumber: '6',
        question:
          'Do you actively plan ahead for future scenarios, or do you tend to plan only when circumstances require it?',
        upperSpectrumValue: 'Proactive',
        lowerSpectrumValue: 'Reactive'
      }
    },
    {
      page: 'Quiz Section Intro Screen',
      props: {
        totalCircles: 3,
        title: 'Emotional Patterns',
        description:
          'Identify your typical emotional responses and outlook on life, from your general mood to your approach to optimism.'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'emotionalPatternQ1',
        totalCircles: 3,
        completedCircles: 0,
        questionNumber: '1',
        question: 'On an average day, do you feel more anxious or calm?',
        upperSpectrumValue: 'Anxious',
        lowerSpectrumValue: 'Calm'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'emotionalPatternQ2',
        totalCircles: 3,
        completedCircles: 1,
        questionNumber: '2',
        question:
          'Do you generally see the positive aspects of situations (glass half full), or do you focus on the negatives (glass half empty)?',
        upperSpectrumValue: 'Optimist',
        lowerSpectrumValue: 'Pessimist'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'emotionalPatternQ3',
        totalCircles: 3,
        completedCircles: 2,
        questionNumber: '3',
        question:
          'When making decisions, how often do you consider the emotional impact on those close to you?',
        upperSpectrumValue: 'Considerate',
        lowerSpectrumValue: 'Self-focused'
      }
    },
    {
      page: 'Quiz Section Intro Screen',
      props: {
        totalCircles: 4,
        title: 'Workstyle',
        description:
          "Delve into your habits and preferences, understanding whether you're a multitasker, a focused executor, or somewhere in between."
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'workstyleQ1',
        totalCircles: 4,
        completedCircles: 0,
        questionNumber: '1',
        question:
          'In your work, do you focus on one task at a time, or do you prefer juggling multiple tasks simultaneously?',
        upperSpectrumValue: 'Single-task',
        lowerSpectrumValue: 'Multitasking'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'workstyleQ2',
        totalCircles: 4,
        completedCircles: 1,
        questionNumber: '2',
        question:
          'Are you self-driven to complete tasks, or do you rely on external cues and reminders?',
        upperSpectrumValue: 'Self Driven',
        lowerSpectrumValue: 'External Cues'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'workstyleQ3',
        totalCircles: 4,
        completedCircles: 2,
        questionNumber: '3',
        question:
          'Do you prefer to handle tasks bit by bit over time, or do you like to tackle everything in one go?',
        upperSpectrumValue: 'Incremental',
        lowerSpectrumValue: 'Bulk'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'workstyleQ4',
        totalCircles: 4,
        completedCircles: 3,
        questionNumber: '4',
        question:
          'When making important decisions, do you seek in-depth, detailed information, or do you prefer concise, straightforward advice?',
        upperSpectrumValue: 'Detailed',
        lowerSpectrumValue: 'Concise'
      }
    },
    
    {
      page: 'Quiz Section Intro Screen',
      props: {
        totalCircles: 3,
        title: 'Social Inclinations',
        description:
          'Assess how you interact with others, your comfort in discussing sensitive topics, and your tendency to offer guidance or support.'
      }
    },

    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'socialInclinationQ1',
        totalCircles: 3,
        completedCircles: 0,
        questionNumber: '1',
        question:
          'Is discussing sensitive topics like death as natural for you as casual conversation, or do you tend to avoid such topics?',
        upperSpectrumValue: 'Comfortable',
        lowerSpectrumValue: 'Avoidant'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'socialInclinationQ2',
        totalCircles: 3,
        completedCircles: 1,
        questionNumber: '2',
        question:
          'Are you often the person friends and family turn to for help with difficult decisions, or do you prefer to let others take the lead?',
        upperSpectrumValue: 'Advisor',
        lowerSpectrumValue: 'Supportive'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'socialInclinationQ3',
        totalCircles: 3,
        completedCircles: 2,
        questionNumber: '3',
        question:
          'Do you primarily focus on addressing your own issues, or are you more inclined to assist others with their problems?',
        upperSpectrumValue: 'Self-focused',
        lowerSpectrumValue: 'Others-focused'
      }
    },

    {
      page: 'Quiz Section Intro Screen',
      props: {
        totalCircles: 2,
        title: 'Funnel Activities',
        description:
          'Gauge your knowledge and preparedness regarding end-of-life planning, from understanding the basics to actively engaging in the process.'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'funnelActivitiesQ1',
        totalCircles: 2,
        completedCircles: 0,
        questionNumber: '1',
        question:
          'Are you highly knowledgeable about end-of-life planning, or do you feel like you have much to learn in this area?',
        upperSpectrumValue: 'Well-informed',
        lowerSpectrumValue: 'Unfamiliar'
      }
    },
    {
      page: 'Questionaire Screen',
      props: {
        inputName: 'funnelActivitiesQ2',
        totalCircles: 2,
        completedCircles: 1,
        questionNumber: '2',
        question:
          'Is your approach to end-of-life planning proactive and immediate, or is it something you plan to address later?',
        upperSpectrumValue: 'Proactive',
        lowerSpectrumValue: 'Deferred'
      }
    },
    {
      page: 'Persona Screen',
      props: {}
    }
  ];

  const handleChange = (name: string, value: any) => {
    console.log(value);
    setOnboardingState((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <OnboardingContext.Provider
      value={{
        page,
        setPage,
        onboardingState,
        setOnboardingState,
        onboardingFlow,
        handleChange
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextData => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding must be used within an AuthProvider');
  }

  return context;
};
