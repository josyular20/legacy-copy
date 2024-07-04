import { UserProvider } from '@/contexts/UserContext';
import Router from '@/navigation/Router';
import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
  useFonts
} from '@expo-google-fonts/dm-sans';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider, extendTheme } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5
    }
  }
});

export default function App() {
  const [fontsLoaded] = useFonts({
    'MADE Dillan': require('./assets/fonts/MADE-Dillan.otf'),
    'Roca Heavy': require('./assets/fonts/Roca-Bold.ttf'),
    'Roca Light': require('./assets/fonts/Roca-Light.ttf'),
    'Roca Regular': require('./assets/fonts/Roca-Regular.ttf'),

    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,

    DMSans_700Bold_Italic,
    Inter_400Regular,
    Inter_600SemiBold
  });

  const theme = extendTheme({
    fontConfig: {
      DM_Sans: {
        Regular: {
          normal: 'DMSans_400Regular',
          italic: 'DMSans_400Regular_Italic'
        },
        Medium: {
          normal: 'DMSans_500Medium',
          italic: 'DMSans_500Medium_Italic'
        },
        Bold: {
          normal: 'DMSans_700Bold',
          italic: 'DMSans_700Bold_Italic'
        }
      },
      Roca_One: {
        Light: {
          normal: 'Roca Light'
        },
        Regular: {
          normal: 'Roca Regular'
        },
        Bold: {
          normal: 'Roca Heavy'
        }
      },
      Inter: {
        Regular: {
          normal: 'Inter_400Regular'
        },
        Bold: {
          normal: 'Inter_600SemiBold'
        }
      }
    },
    colors: {
      deepEvergreen: '#0F4F43',
      lightGreen: '#43A574',
      darkGreen: '#0F4F43',
      muteEggplant: '#251B22',
      creamyCanvas: '#FFF9EE',
      barkBrown: '#2F1D12'
    },
    fonts: {
      madeDillan: 'MADE Dillan', // access fontFamily="madeDillan"
      dmSans: 'DM_Sans', // access fontFamily={"dmSans"} fontWeight={"Regular"} fontStyle={"normal"}
      rocaOne: 'Roca_One', // access fontFamily={"rocaOne"} fontWeight={"Regular"} fontStyle={"normal"}
      inter: 'Inter' // access fontFamily={"inter"} fontWeight={"Regular"} fontStyle={"normal"}
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SafeAreaProvider>
          <NativeBaseProvider theme={theme}>
            <Router />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
