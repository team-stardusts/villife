import {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import useScreenMessage from '../../../../hooks/multilingual/hooks';
import AuthScreenTitleView from '../../../blocks/auth_screens/title_view';
import useTermsOfServiceScreenStyles from './styles';
import TermsOfServiceScreenProps from './types';
import AuthScreenSwitchButton from '../../../blocks/auth_screens/switch_button';
import AuthScreenBottonButton from '../../../blocks/auth_screens/bottom_button';

type UserDataType = {};

export default function TermsOfServiceScreen({
  navigation,
  route,
}: TermsOfServiceScreenProps) {
  const Messages = useScreenMessage();
  const Styles = useTermsOfServiceScreenStyles();

  return (
    <SafeAreaView style={Styles.Screen.topLevelBox}>
      <View style={Styles.Screen.screenWrapper}>
        <AuthScreenTitleView
          title={Messages.messages.auth.terms_of_service.title}
          subtitles={[Messages.messages.auth.terms_of_service.subtitle]}
        />
        <View style={Styles.Screen.contentsWrapper}>
          <AuthScreenSwitchButton
            title={Messages.messages.auth.terms_of_service.terms_of_service_all}
          />
          <View style={Styles.InputsSection.horizontalLine} />
          <AuthScreenSwitchButton
            title={
              Messages.messages.auth.terms_of_service.terms_of_service_Privacy
            }
          />
          <AuthScreenSwitchButton
            title={
              Messages.messages.auth.terms_of_service.terms_of_service_service
            }
          />
        </View>
        <View style={Styles.BlankSection.topLevelBox} />
      </View>
      <AuthScreenBottonButton
        title={Messages.messages.auth.create_account.next_btn_title}
        onPress={() => console.log('TLQKF')}
      />
    </SafeAreaView>
  );
}
