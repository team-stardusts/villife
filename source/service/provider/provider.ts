import Provider from "./features/abstract";
import LoginManager from "./features/login";

type ServiceProvider = Provider | LoginManager

export default function useServiceProvider(): ServiceProvider {
    return LoginManager
};

