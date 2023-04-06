import {GestureResponderEvent} from 'react-native/types';

export interface PressableIconProps {
  diameter: number;
  children: React.ReactNode;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export interface VectorIconProps {
  diameter: number;
}
export interface PressableVectorIconProps extends VectorIconProps {
  providerName: 'right' | 'left' | 'up' | 'down' | 'plus';
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export type VectorIconReturnType = JSX.Element;
