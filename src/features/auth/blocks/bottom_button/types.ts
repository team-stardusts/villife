import {GestureResponderEvent, StyleSheet} from 'react-native';

export default interface AuthScreenBottonButtonProps {
  title: string;
  disabled?: boolean | null;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export type UseAuthScreenBottonButtonStylesType = ReturnType<
  typeof StyleSheet.create
>;
