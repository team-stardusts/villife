import {StyleSheet} from 'react-native';
import useSystemInfo from '../../../../hooks/systeminfo/hooks';
import useAppTheme from '../../../../hooks/themes/hooks';
import {UseAuthScreenSwitchButtonStylesType} from './types';

export default function useAuthScreenSwitchButtonStyles(): UseAuthScreenSwitchButtonStylesType {
  const Theme = useAppTheme();
  const SystemInfo = useSystemInfo();

  return StyleSheet.create({
    offWidthBar: {
      width: SystemInfo.window.width * 0.12,
      height: SystemInfo.window.width * 0.065,
      borderRadius: SystemInfo.window.width * 0.065,
      backgroundColor: '#E4E4E4',
      justifyContent: 'center',
    },
    offCircleInBar: {
      width: SystemInfo.window.width * 0.049,
      height: SystemInfo.window.width * 0.049,
      borderRadius: SystemInfo.window.width * 0.049,
      marginLeft: SystemInfo.window.width * 0.0081,
      backgroundColor: '#797A7C',
    },
    onWidthBar: {
      width: SystemInfo.window.width * 0.12,
      height: SystemInfo.window.width * 0.065,
      borderRadius: SystemInfo.window.width * 0.065,
      backgroundColor: '#DFEEFF',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    onCircleInBar: {
      width: SystemInfo.window.width * 0.049,
      height: SystemInfo.window.width * 0.049,
      borderRadius: SystemInfo.window.width * 0.049,
      marginRight: SystemInfo.window.width * 0.0081,
      backgroundColor: '#0B75F2',
    },
  });
}
