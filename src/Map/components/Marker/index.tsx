import React, { FC, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Config } from '../../config';

type TextStyle = {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
};

export type MarkerProps = {
  value: string;
  width: number;
  height: number;
  x: number;
  y: number;
  text?: string;
  textStyle?: TextStyle;
  markerStyle?: ViewStyle;
  textDelay?: number;
  color?: string;
};

type MarkerPropsExtended = {
  onPress?: (marker: any) => void;
} & MarkerProps;

const Marker: FC<MarkerPropsExtended> = ({
  value,
  width,
  height,
  x,
  y,
  text,
  textStyle,
  markerStyle,
  onPress,
  textDelay,
  color,
}) => {
  const {
    DEFAULT_BG_COLOR,
    DEFAULT_TEXTCOLOR,
    DEFAULT_MARKER_COLOR,
  } = Config;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, textDelay ?? 5000);
    }
  }, [textDelay, visible]);

  const onMarkerPress = () => {
    if (onPress) {
      onPress(value);
    }
    setVisible(true);
  };

  return (
    <>
      {visible && text && (
        <View
          style={[
            styles.textWrapper,
            {
              transform: [
                { translateX: x },
                { translateY: y - 15 },
              ],
              backgroundColor:
                textStyle?.backgroundColor ??
                DEFAULT_BG_COLOR,
            },
          ]}>
          <Text
            style={{
              fontSize: textStyle?.fontSize ?? 8,
              color:
                textStyle?.textColor ?? DEFAULT_TEXTCOLOR,
            }}>
            {text}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.marker,
          {
            width: width,
            height: height,
            transform: [
              { translateX: x },
              { translateY: y },
            ],
            backgroundColor: color ?? DEFAULT_MARKER_COLOR,
          },
          markerStyle,
        ]}
        onPress={onMarkerPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 3,
    height: 3,
    position: 'absolute',
  },
  textWrapper: {
    position: 'absolute',
    backgroundColor: 'orange',
    padding: 4,
    borderRadius: 4,
    zIndex: 30000,
  },
});
export default Marker;
