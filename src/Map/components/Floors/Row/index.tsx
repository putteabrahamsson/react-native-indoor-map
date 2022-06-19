import React, { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Spacer from '../../Spacer';

type Props = {
  text: string;
  floorId: number;
  onFloorChanged: (floorId: number) => void;
  closeModal: () => void;
};

const Row: FC<Props> = ({
  text,
  floorId,
  onFloorChanged,
  closeModal,
}) => (
  <>
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        onFloorChanged(floorId);
        closeModal();
      }}>
      <Text style={styles.rowText}>{text}</Text>
    </TouchableOpacity>

    <Spacer gap={8} vertical />
  </>
);

const styles = StyleSheet.create({
  row: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  rowText: {
    color: 'black',
  },
});

export default Row;
