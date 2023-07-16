export type InspectTypes = {
    isNumber?: boolean;
    hasEnglish?: boolean;
    hasEnglishOnlySmallCase?: boolean;
    hasNumber?: boolean;
    hasSpecialChar?: boolean;
    tokens4to10?: boolean;
    tokens8to20?: boolean;
    matching?: string | null;
};

export type ExamineType = keyof InspectTypes;

type ValidatorProps = {
    title: string;
    text: string;
    examine: ExamineType;
    matchingText?: string | null;
    size?: number;
    onValidate?(examine: keyof InspectTypes, isVaild: boolean): void;
};

export default ValidatorProps;
