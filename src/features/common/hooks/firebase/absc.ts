interface Getable {
    getAccessToken(): Promise<string>;
}

abstract class AFirebaseModule implements Getable {
    abstract check(): void;
    abstract getAccessToken(): Promise<string>;
}

export default AFirebaseModule;
