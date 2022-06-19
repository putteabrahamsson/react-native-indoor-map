import React, { FC } from 'react';
import { View } from 'react-native';

type Props = {
  gap?: number;
  vertical?: boolean;
};

const Spacer: FC<Props> = ({
  gap = 12,
  vertical = false,
}) => (
  <View
    style={vertical ? { height: gap } : { width: gap }}
  />
);

export default Spacer;
