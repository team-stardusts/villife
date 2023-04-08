export type UserTypeSelectionButtonProps = {
    userType: "owner" | "member";
    caption: string;
    selected: boolean;
    size: number;
    onPress?(): void;
};
