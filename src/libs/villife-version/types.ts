export interface VillifeVersionCheck {
    localVersion: string;
    packageName: string;
    getStoreUrl(): Promise<string>;
    getUpstreamVersion(): Promise<string>;
    needToUpdate(): Promise<{
        isNeeded: boolean;
        currentVersion: string;
        latestVersion: string;
        storeUrl: string;
    }>;
}
