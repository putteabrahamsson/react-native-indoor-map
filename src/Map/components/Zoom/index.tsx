import React, { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Config } from '../../config';

export type ZoomProps = {
  zoom: number;
  maxZoom?: number;
  zoomStyle?: ViewStyle;
  hideZoom?: boolean;
  sensitivity?: number;
  showResetButton?: boolean;
};

type ExtendedZoomProps = {
  onZoomChanged: (value: number) => void;
  onReset?: () => void;
} & ZoomProps;

const Zoom: FC<ExtendedZoomProps> = ({
  onZoomChanged,
  onReset,
  zoom,
  maxZoom,
  zoomStyle,
  sensitivity = 1,
  showResetButton,
}) => {
  const disabledPlus = zoom >= maxZoom + 1;
  const disabledNegative = zoom <= 1;

  return (
    <View style={styles.group}>
      <TouchableOpacity
        style={[
          styles.zoomButton,
          zoomStyle,
          disabledPlus && styles.zoomDisabled,
        ]}
        onPress={() => onZoomChanged(zoom + sensitivity)}
        disabled={disabledPlus}>
        <Text style={styles.zoomText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.zoomButton,
          zoomStyle,
          disabledNegative && styles.zoomDisabled,
        ]}
        onPress={() => onZoomChanged(zoom - sensitivity)}
        disabled={disabledNegative}>
        <Text style={styles.zoomText}>-</Text>
      </TouchableOpacity>

      {showResetButton && (
        <TouchableOpacity
          style={[
            styles.zoomButton,
            zoomStyle,
            { marginTop: 20 },
          ]}
          onPress={onReset}
          disabled={disabledNegative}>
          <Text style={styles.zoomText}>R</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    position: 'absolute',
    zIndex: 3000,
  },
  zoomButton: {
    backgroundColor: String(Config.ZOOM_BG_COLOR),
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomDisabled: {
    backgroundColor: String(Config.ZOOM_DISABLED),
  },
  zoomText: {
    color: String(Config.ZOOM_TEXT),
    fontSize: 20,
  },
});

export default Zoom;
