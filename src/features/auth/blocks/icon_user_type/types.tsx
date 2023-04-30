import { Authority } from "../../../../libs/rest_apis/villife/types";

export type UserTypeSelectionButtonProps = {
    userType: Authority["ADMIN"] | Authority["RENTER"];
    caption: string;
    selected: boolean;
    size: number;
    onPress?(): void;
};
