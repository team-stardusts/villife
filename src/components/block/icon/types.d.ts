declare export interface LoginIconProps {
    width: number;
    height: number;
}

declare export interface SocialLoginIconProps extends LoginIconProps {
    providerName: "kakao" | "naver" | "google";
}

declare export type LoginIconReturnType = JSX.Element;
