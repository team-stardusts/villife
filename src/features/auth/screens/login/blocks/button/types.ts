import { HostType } from "../../../../../../libs/rest_apis/villife/auth/types";

export type SocialLoginButtonProps = {
    provider: HostType;
    title: string;
    onPress(provider: HostType): void;
};
