import { Center, Modal, Text, View } from 'native-base';
import { color } from 'native-base/lib/typescript/theme/styled-system';

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Circle from './Circle';

export type ModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function OurModal(props: ModalProps) {
  return (
    <Center>
      <Modal isOpen={props.showModal} onClose={() => props.setShowModal(false)}>
        {props.children}
      </Modal>
    </Center>
  );
}
