import {GestureResponderEvent, Pressable, View, Text} from 'react-native';
import useAuthScreenSwitchButtonStyles from './styles';
import AuthScreenSwitchButtonProps from './types';
import {useState} from 'react';

export default function AuthScreenSwitchButton(
  props: AuthScreenSwitchButtonProps,
): JSX.Element {
  const Styles = useAuthScreenSwitchButtonStyles();

  const [isPressing, setIsPressing] = useState<boolean>(false);

  const onPress = (e: GestureResponderEvent) => {
    setIsPressing(!isPressing);
    if (props.onPress) {
      props.onPress(e);
    }
  };

  return (
    <>
      {isPressing ? (
        <>
          <Pressable onPress={onPress}>
            <View style={Styles.onWidthBar}>
              <View style={Styles.onCircleInBar} />
            </View>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable onPress={onPress}>
            <View style={Styles.offWidthBar}>
              <View style={Styles.offCircleInBar} />
            </View>
          </Pressable>
        </>
      )}
    </>
  );
}
