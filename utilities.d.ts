export interface ApplicationVersion {
    majorVersion: number | undefined;
    minorVersion: number | undefined;
}
export declare function parseVersion(versionString: string): ApplicationVersion | undefined;
