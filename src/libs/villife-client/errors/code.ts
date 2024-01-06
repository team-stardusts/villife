// Request Error 1000 ~ 1999,
// Response Error 2000 ~ 2999
// Other function Error 3000

export const errorCode: ErrorCodes = {
    NotImplemented: 2000,
    NoDataInLegacyAPIREsponse: 2001,
    NoDataInResponse: 2002,
    FailedToRefresh: 2003,
    NoHeadersInErrorConfig: 2004,
    FailedToStoreTokens: 3000,
    NoTokensInStorage: 3001,
    UnknownedError: 3999,
};

export type ErrorCodes = {
    NotImplemented: 2000;
    NoDataInLegacyAPIREsponse: 2001;
    NoDataInResponse: 2002;
    FailedToRefresh: 2003;
    NoHeadersInErrorConfig: 2004;
    FailedToStoreTokens: 3000;
    NoTokensInStorage: 3001;
    UnknownedError: 3999;
};

export type ErrorCode = ErrorCodes[keyof ErrorCodes];
