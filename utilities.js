export function parseVersion(versionString = '') {
    const versionPieces = versionString.split('.');
    return {
        majorVersion: versionPieces.length > 0 ? Number.parseInt(versionPieces[0]) : undefined,
        minorVersion: versionPieces.length > 1 ? Number.parseInt(versionPieces[1]) : undefined
    };
}
