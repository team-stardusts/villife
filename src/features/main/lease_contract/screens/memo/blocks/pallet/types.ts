import { ColorAvailable, MemoColor } from "../../hooks/memo-pallet/types";

export type MemoPalletProps = {
    initialColor?: ColorAvailable | undefined;
    onSelection(color: MemoColor): void;
};
