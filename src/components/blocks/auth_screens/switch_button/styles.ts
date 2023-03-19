import {StyleSheet} from 'react-native';
import useSystemInfo from '../../../../hooks/systeminfo/hooks';
import useAppTheme from '../../../../hooks/themes/hooks';
import {UseAuthScreenSwitchButtonStylesType} from './types';

export default function useAuthScreenSwitchButtonStyles(): UseAuthScreenSwitchButtonStylesType {
  const Theme = useAppTheme();
  const SystemInfo = useSystemInfo();

  return StyleSheet.create({
    topLevelBox: {
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: SystemInfo.window.height * 0.08,
    },
    inputWrapper: {marginBottom: SystemInfo.window.width * 0.136},

    offBarSort: {
      alignItems: 'center',
      marginLeft: SystemInfo.window.width * 0.068,
    },
    offWidthBar: {
      flexDirection: 'row',
      alignItems: 'center',
      width: SystemInfo.window.width * 0.12,
      height: SystemInfo.window.width * 0.065,
      borderRadius: SystemInfo.window.width * 0.065,
      backgroundColor: '#E4E4E4',
      position: 'absolute',
    },

    offCircleInBar: {
      width: SystemInfo.window.width * 0.049,
      height: SystemInfo.window.width * 0.049,
      borderRadius: SystemInfo.window.width * 0.049,
      marginLeft: SystemInfo.window.width * 0.0081,
      backgroundColor: '#797A7C',
    },
    onBarSort: {
      alignItems: 'center',
      marginLeft: SystemInfo.window.width * 0.068,
    },
    onWidthBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: SystemInfo.window.width * 0.12,
      height: SystemInfo.window.width * 0.065,
      borderRadius: SystemInfo.window.width * 0.065,
      backgroundColor: '#DFEEFF',
      position: 'absolute',
    },
    onCircleInBar: {
      width: SystemInfo.window.width * 0.049,
      height: SystemInfo.window.width * 0.049,
      borderRadius: SystemInfo.window.width * 0.049,
      marginRight: SystemInfo.window.width * 0.0081,
      backgroundColor: '#0B75F2',
    },
    title: {
      color: Theme.colors.colorFamily.black,
      fontWeight: 'bold',
      justifyContent: 'center',
      marginLeft: SystemInfo.window.width * 0.09,
      alignItems: 'center',
      fontSize: SystemInfo.window.width * 0.065,
    },
  });
}
