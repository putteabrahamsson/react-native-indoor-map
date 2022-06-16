import React, { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { Config } from "../../config";

export type ZoomProps = {
  zoom?: number;
  maxZoom?: number;
  zoomStyle?: ViewStyle;
  hideZoom?: boolean;
  sensitivity?: number;
  showResetButton?: boolean;
  resetIconUri?: string;
};

type ExtendedZoomProps = {
  onZoomChanged: (value: number) => void;
  onReset?: () => void;
} & ZoomProps;

const Zoom: FC<ExtendedZoomProps> = ({
  onZoomChanged,
  onReset,
  zoom = 1,
  maxZoom,
  zoomStyle,
  sensitivity = 1,
  showResetButton,
  resetIconUri,
}) => {
  const disabledPlus = maxZoom ? zoom >= maxZoom + 1 : false;
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
        disabled={disabledPlus}
      >
        <Text style={styles.zoomText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.zoomButton,
          zoomStyle,
          disabledNegative && styles.zoomDisabled,
        ]}
        onPress={() => onZoomChanged(zoom - sensitivity)}
        disabled={disabledNegative}
      >
        <Text style={styles.zoomText}>-</Text>
      </TouchableOpacity>

      {showResetButton && zoom > 1 && (
        <TouchableOpacity
          style={[
            styles.zoomButton,
            zoomStyle,
            disabledNegative && styles.zoomDisabled,
            styles.spacer,
          ]}
          onPress={onReset}
          disabled={disabledNegative}
        >
          <SvgUri
            uri={resetIconUri ?? Config.RESET_ICON}
            fill={Config.DEFAULT_BG_COLOR}
            width={Config.RESET_SIZE}
            height={Config.RESET_SIZE}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    position: "absolute",
    zIndex: 3000,
  },
  spacer: {
    marginTop: 20,
  },
  zoomButton: {
    backgroundColor: String(Config.ZOOM_BG_COLOR),
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
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
