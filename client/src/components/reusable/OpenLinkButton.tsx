import { Text } from 'native-base';

import React from 'react';
import { GestureResponderEvent, Linking, TouchableOpacity } from 'react-native';

interface OpenLinkButtonProps {
  url: string;
  children: React.ReactNode;
}

const OpenLinkButton: React.FC<OpenLinkButtonProps> = ({ url, children }) => {
  const handleOpenLink = async () => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error("Can't open URL:", url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleOpenLink}>
      <Text
        fontSize={12}
        fontFamily={'inter'}
        fontWeight={'Regular'}
        fontStyle={'normal'}
        color={'darkGreen'}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default OpenLinkButton;
