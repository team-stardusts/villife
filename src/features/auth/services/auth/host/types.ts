import { Villife } from "@team-stardusts/villife-client";

export interface Signer {
    signIn(params: VillifeSignInForm | any): Promise<SignInResult>;
    signOut(): Promise<any>;
    signUp(
        params: Villife.Auth.SignUpForm | Villife.Auth.SocialSignUpForm | Villife.Auth.PersonalInfoVerificationForm
    ): Promise<any>;
}

export type VillifeSignInForm = {
    id: Parameters<Villife.Auth.Client["signIn"]>["0"];
    password: Parameters<Villife.Auth.Client["signIn"]>["1"];
};

export type SignInResult = Villife.Auth.LoginResult & { socialAccessToken?: string };
