/**
 * Extracts the major and minor version numbers from a version string.
 * @param versionString - A version string.
 * @returns - The major and minor version numbers, if available.
 */
export function parseVersion(versionString = '') {
    const versionPieces = versionString.split('.');
    return {
        majorVersion: versionPieces.length > 0 ? Math.trunc(Number(versionPieces[0])) : undefined,
        minorVersion: versionPieces.length > 1 ? Math.trunc(Number(versionPieces[1])) : undefined
    };
}
