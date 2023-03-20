import Config from "react-native-config";
import IDotEnv from "./types";

class DotEnv implements IDotEnv {
    readonly app = {
        NAME: Config.APP_NAME,
    } as const;

    readonly api = {
        villife: {
            REST_API_BASE_URL: Config.VILLIFE_REST_SERVER_BASE_URL,
        },
        kakao: {
            REST_API_BASE_URL: Config.KAKAO_REST_API_BASE_URL,
            REST_API_KEY: Config.KAKAO_REST_API_KEY,
        },
        naver: {
            API_CONSUMER_KEY: Config.NAVER_API_CONSUMER_KEY,
            API_CONSUMER_SECRET: Config.NAVER_API_CONSUMER_SECRET,
            API_SERVISE_URL_SHEME: Config.NAVER_API_SERVISE_URL_SHEME,
        }
    } as const;
}

export default DotEnv;