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
    <View style={Styles.inputWrapper}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
        }}>
        {isPressing ? (
          <>
            <Pressable onPress={onPress} style={Styles.onBarSort}>
              <View style={Styles.onWidthBar}>
                <View style={Styles.onCircleInBar} />
              </View>
            </Pressable>
            <Text style={Styles.title}>{props.title}</Text>
          </>
        ) : (
          <>
            <Pressable onPress={onPress} style={Styles.offBarSort}>
              <View style={Styles.offWidthBar}>
                <View style={Styles.offCircleInBar} />
              </View>
            </Pressable>
            <Text style={Styles.title}>{props.title}</Text>
          </>
        )}
      </View>
    </View>
  );
}
