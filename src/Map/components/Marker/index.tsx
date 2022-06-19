import React, { FC, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Config } from '../../config';
import { MarkerProps } from '../../types';

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
  iconUrl,
  isStairs,
  iconSize,
  iconColor,
  iconRotate,
}) => {
  const {
    DEFAULT_BG_COLOR,
    DEFAULT_TEXTCOLOR,
    DEFAULT_MARKER_COLOR,
    STAIRS_ICON,
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
        onPress={onMarkerPress}>
        <SvgUri
          uri={isStairs ? String(STAIRS_ICON) : iconUrl}
          style={[
            styles.markerIcon,
            {
              width: iconSize,
              height: iconSize,
              transform: [{ rotate: `${iconRotate}deg` }],
            },
          ]}
          fill={iconColor ?? 'black'}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  marker: {
    width: 3,
    height: 3,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    position: 'absolute',
    padding: 4,
    borderRadius: 4,
    zIndex: 30000,
  },
  markerIcon: {
    zIndex: 3000,
  },
});
export default Marker;
