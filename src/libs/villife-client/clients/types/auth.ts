import VillifeUtility from "./utility";

namespace VillifeAuth {
    export interface Client {
        signIn(id: string, password: string): Promise<LoginResult>;
        signInWithSocialMedia(host: RegistedSocialMedia, token: string): Promise<LoginResult>;
        signOut(): Promise<void>;
        signUp(params: SignUpForm): Promise<boolean>;
        signUpWithSocialMedia(host: RegistedSocialMedia, form: SocialSignUpForm): Promise<boolean>;
        registerFirebaseToken(params: FirebaseRegistrationForm): Promise<string>;
        sendVerficationCode(phoneNumber: string): Promise<string>;
        verifyPersonalInfo(params: PersonalInfoVerificationForm): Promise<string>;
    }

    export type LoginResult = {
        accessToken: string;
        expireAt: number;
        refreshToken: string;
        needToSignUp?: boolean;
    };

    export type FirebaseRegistrationForm = {
        accessToken: string;
        refreshToken: string;
        firebaseToken: string;
    };

    export type SignUpForm = PersonalInfoVerificationForm & {
        id: string;
        password: string;
    };

    export type SocialSignUpForm = {
        accessToken: string;
        authority: VillifeUtility.Authority[keyof VillifeUtility.Authority];
    };

    export type PersonalInfoVerificationForm = {
        authority: VillifeUtility.Authority[keyof VillifeUtility.Authority];
        birthDay: string;
        birthYear: string;
        code: string;
        phoneNumber: string;
        userName: string;
    };

    export type RegistedSocialMedia = "apple" | "naver";
    export type HostType = RegistedSocialMedia | "villife";
}

export default VillifeAuth;
