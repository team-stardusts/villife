import {GestureResponderEvent, StyleSheet} from 'react-native';

export default interface AuthScreenSwitchButtonProps {
  title?: string | null;
  disabled?: boolean | null;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export type UseAuthScreenSwitchButtonStylesType = ReturnType<
  typeof StyleSheet.create
>;
