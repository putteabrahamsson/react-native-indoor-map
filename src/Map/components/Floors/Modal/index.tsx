import React, { FC } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Config } from '../../../config';
import { FloorProps } from '../../../types';
import Row from '../Row';

type Props = {
  floors: FloorProps[];
  expanded: boolean;
  closeModal: () => void;
  onFloorChanged: (floorId: number) => void;
  floorText?: string;
};

const FloorModal: FC<Props> = ({
  floors,
  expanded,
  closeModal,
  onFloorChanged,
  floorText = '',
}) => (
  <Modal transparent visible={expanded}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.dropdown}>
        <TouchableOpacity
          style={styles.closeWrapper}
          onPress={closeModal}>
          <SvgUri
            uri={String(Config.CLOSE_ICON)}
            fill={Config.DEFAULT_BG_COLOR}
            width={Config.RESET_SIZE}
            height={Config.RESET_SIZE}
            style={styles.close}
          />
        </TouchableOpacity>

        <ScrollView
          style={styles.rowWrapper}
          contentContainerStyle={styles.scrollContent}>
          {floors?.map((floor) => (
            <Row
              key={floor?.floor}
              text={`${floorText} ${floor?.floor}`}
              floorId={floor?.floor}
              onFloorChanged={onFloorChanged}
              closeModal={closeModal}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  </Modal>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .8)',
  },
  dropdown: {
    width: '100%',
    height: '70%',
  },
  closeWrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  close: {
    marginRight: 20,
    marginBottom: 20,
    color: 'white',
  },
  rowWrapper: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
});

export default FloorModal;
