import DotEnv from "../../dotenv/index";
export default class RemoteCSS {
    private static dotEnv: DotEnv = new DotEnv();

    static getPretendardBold(): string {
        return `@font-face {
            font-family: "Pretendard-Bold";
            src: url("${this.dotEnv.api.villife.REST_API_BASE_URL}assets/fonts/Pretendard-Bold.ttf") format("truetype");
            font-weight: normal;
          }`;
    }
    static getPretendardRegular(): string {
        return `@font-face {
            font-family: "Pretendard-Regular";
            src: url("${this.dotEnv.api.villife.REST_API_BASE_URL}assets/fonts/Pretendard-Regular.ttf") format("truetype");
            font-weight: normal;
          }`;
    }
}
