import { ErrorCode, ErrorCodes, errorCode } from "./code";

class VillifeError extends Error {
    readonly errorCode: ErrorCode;
    name: string;

    constructor(errorCode: ErrorCode, message: string) {
        super(message);
        this.errorCode = errorCode;
        this.name = new.target.name;

        Object.setPrototypeOf(this, new.target.prototype);
    }

    public toString(): string {
        let errorCodeMessage: string = "";

        Object.entries(errorCode).forEach((v) => {
            if (v[1] === this.errorCode) errorCodeMessage = v[0];
        });

        return `[${errorCodeMessage}] ${this.message}`;
    }
}

export default VillifeError;
