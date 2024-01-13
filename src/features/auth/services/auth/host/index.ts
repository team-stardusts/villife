import { Villife } from "@team-stardusts/villife-client";
import AppleSigner from "./apple";
import NaverSigner from "./naver";
import { Signer } from "./types";
import VillifeSigner from "./villife";

class SignerFactory {
    public static getSigner(host: Villife.Auth.HostType): Signer {
        switch (host) {
            case "apple":
                return new AppleSigner();
            case "naver":
                return new NaverSigner();
            case "villife":
                return new VillifeSigner();
            default:
                throw new Error(`'${host}' is invalid host name.`);
        }
    }
}

export default SignerFactory;
