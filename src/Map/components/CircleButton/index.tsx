import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Config } from '../../config';

const BUTTON_SIZE = 40;
const CIRCLE_SIZE = BUTTON_SIZE / 2;
const ICON_SIZE = BUTTON_SIZE / 2;

type Props = {
  onPress: () => void;
  src?: string;
  text?: string;
  disabled?: boolean;
  color?: string;
  colorDisabled?: string;
  circleColor?: string;
};

const CircleButton: FC<Props> = ({
  onPress,
  src,
  text,
  disabled,
  color,
  colorDisabled,
  circleColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled
          ? { backgroundColor: colorDisabled ?? 'black' }
          : { backgroundColor: color ?? 'black' },
      ]}
      disabled={disabled}
      onPress={onPress}>
      <SvgUri
        uri={src}
        fill={Config.DEFAULT_BG_COLOR}
        width={ICON_SIZE}
        height={ICON_SIZE}
      />

      {text && (
        <View
          style={[
            styles.circle,
            { backgroundColor: circleColor ?? 'black' },
          ]}>
          <Text style={styles.text}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    position: 'absolute',
    borderRadius: CIRCLE_SIZE / 2,
    right: -10,
    top: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 11,
  },
});

export default CircleButton;
