import CodePush, { CodePushOptions } from "react-native-code-push";

const codePushOptions: CodePushOptions = {
    /**
     * When the app re-enters the foreground.
     */
    checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
    //deploymentKey: //기본은 네이티브 지정 키값이지만 다른 배포를 동적으로 사용하는 경우에 사용
    //installMode:, //선택적 업데이트(필수로 표시되지 않은 업데이트)를 설치할 시기를 지정
    //mandatoryInstallMode: //필수로 표시된 업데이트를 설치할 시기를 지정
    //minimumBackgroundDuration:  //앱을 다시 시작하기 전에 앱이 백그라운드에 있을 최소 시간(초)을 지정
    /* updateDialog: { //업데이트를가 있을 때 사용자에게 대화 상자 표시 여부와 사용할 문자열을 "옵션" 개체
        appendReleaseDescription: false, //알림 메시지에 사용 가능한 릴리스에 대한 설명을 추가할지 여부
        descriptionPrefix: '', // 업데이트 알림을 표시할 때 릴리스 설명을 접두사로 지정할 문자열(있는 경우)
        mandatoryContinueButtonLabel: '', // 필수 업데이트 설치 버튼에 텍스트
        mandatoryUpdateMessage: '', // 필수 업데이트의 알림 본문으로 사용되는 텍스트
        optionalIgnoreButtonLabel: '', // 선택 업데이트 무시 버튼 텍스트
        optionalInstallButtonLabel: '', // 선택 업데이트 설치 버튼 텍스트
        optionalUpdateMessage: '', // 선택 업데이트 메세지
        title: '', // 업데이트 알림 타이틀
    }, */
    /* 
    롤백 재시도 메커니즘은 애플리케이션이 이전에 롤백된 업데이트(옵션에 지정된 제한)를 재설치하려고 시도할 수 있게 한다. 
    이는 롤백 재시도가 발생해야 하는지 여부 및 발생한 경우, 롤백 재시도에 사용할 설정을 결정하는 데 사용되는 "옵션" 객체이다. 
    이는 기본적으로 null로, 재시도 메커니즘을 비활성화하는 효과를 갖는다. 이를 임의의 truth 값으로 설정하면 기본 설정으로 재시도 메커니즘이 활성화될 것이며, 
    객체를 이 매개변수에 전달하면 롤백 재시도가 활성화될 뿐만 아니라 기본값 중 하나 이상을 재정의할 수 있다.
     */
    /* rollbackRetryOptions: {
        delayInHours: 24, //default 24
        maxRetryAttempts: 1, // default 1
    }, */
};

export default codePushOptions;
