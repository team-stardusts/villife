import {
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetFirebaseToken} from '../../../hooks/firebase/hooks';
import AndroidFirebaseModule from '../../../hooks/firebase/android_module';

export default function TestScreen() {
  const firebaseToken = useGetFirebaseToken();

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => {
            console.log(firebaseToken);
          }}
          style={localStyle.testButton}>
          <Text style={localStyle.buttonText}>버튼</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyle = StyleSheet.create({
  testButton: {
    width: '100%',
    backgroundColor: 'red',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});
