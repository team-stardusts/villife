export default interface IDotEnv {
    readonly app: {
        NAME: string | undefined;
    };

    readonly api: {
        villife: {
            REST_API_BASE_URL: string | undefined;
        },
        kakao: {
            REST_API_BASE_URL: string | undefined;
            REST_API_KEY: string | undefined;
        },
        naver: {
            API_CONSUMER_KEY: string | undefined;
            API_CONSUMER_SECRET: string | undefined;
            API_SERVISE_URL_SHEME: string | undefined;
        }

    };
}

