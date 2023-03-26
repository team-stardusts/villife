import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {AuthStackParamList} from '../../../navigators/auth/types';

type TermsOfServiceScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'terms_of_service'
>;

export default TermsOfServiceScreenProps;

export type TermsOfServiceScreenStylesType = {
  Screen: ReturnType<typeof StyleSheet.create>;
  InputsSection: ReturnType<typeof StyleSheet.create>;
  BlankSection: ReturnType<typeof StyleSheet.create>;
  //SocialLoginSection: ReturnType<typeof StyleSheet.create>;
};
