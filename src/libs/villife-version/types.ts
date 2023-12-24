export interface VillifeVersionCheck {
    localVersion: string;
    packageName: string;
    getStoreUrl(): Promise<string>;
    getUpstreamVersion(): Promise<string>;
    needToUpdate(): Promise<boolean>;
}
