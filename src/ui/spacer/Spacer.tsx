import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {SpacerProps} from './SpacerProps';

export default function Spacer({
  marginHorizontal,
  marginVertical,
  marginBottom,
  marginLeft,
  marginTop,
  marginRight,
  children,
}: SpacerProps) {
  const containerStyle: StyleProp<ViewStyle> = {
    marginHorizontal,
    marginVertical,
    marginBottom,
    marginLeft,
    marginTop,
    marginRight,
  };

  return <View style={containerStyle}>{children}</View>;
}
