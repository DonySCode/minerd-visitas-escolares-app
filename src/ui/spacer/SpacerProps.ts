import {PropsWithChildren} from 'react';
import {DimensionValue} from 'react-native';

export type SpacerProps = PropsWithChildren<{
  marginHorizontal?: DimensionValue | undefined;
  marginVertical?: DimensionValue | undefined;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}>;
