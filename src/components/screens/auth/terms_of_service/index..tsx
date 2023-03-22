import {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import useScreenMessage from '../../../../hooks/multilingual/hooks';
import AuthScreenTitleView from '../../../blocks/auth_screens/title_view';
import useTermsOfServiceScreenStyles from './styles';
import TermsOfServiceScreenProps from './types';
import AuthScreenSwitchButton from '../../../blocks/auth_screens/switch_button';
import AuthScreenBottonButton from '../../../blocks/auth_screens/bottom_button';
import {Defs, Image, Path, Pattern, Rect, Svg, Use} from 'react-native-svg';
import PressableVectorIcon from '../../../blocks/icon/vector';
import useSystemInfo from '../../../../hooks/systeminfo/hooks';

type UserDataType = {};

export default function TermsOfServiceScreen({
  navigation,
  route,
}: TermsOfServiceScreenProps) {
  const iconDiameter: number = useSystemInfo().window.width * 0.065;
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
          <View style={Styles.InputsSection.barSort}>
            <AuthScreenSwitchButton />
            <Text style={Styles.InputsSection.descriptionMessage}>
              {Messages.messages.auth.terms_of_service.terms_of_service_all}
            </Text>
            <PressableVectorIcon providerName="right" diameter={iconDiameter} />
          </View>
          <View style={Styles.InputsSection.horizontalLine} />
          <View style={Styles.InputsSection.barSort}>
            <AuthScreenSwitchButton />
            <Text style={Styles.InputsSection.descriptionMessage}>
              {Messages.messages.auth.terms_of_service.terms_of_service_Privacy}
            </Text>
            <PressableVectorIcon providerName="right" diameter={iconDiameter} />
          </View>
          <View style={Styles.InputsSection.barSort}>
            <AuthScreenSwitchButton />
            <Text style={Styles.InputsSection.descriptionMessage}>
              {Messages.messages.auth.terms_of_service.terms_of_service_service}
            </Text>
            <PressableVectorIcon providerName="right" diameter={iconDiameter} />
          </View>
        </View>
      </View>
      <AuthScreenBottonButton
        title={Messages.messages.auth.create_account.next_btn_title}
        onPress={() => console.log('TLQKF')}
      />
    </SafeAreaView>
  );
}
