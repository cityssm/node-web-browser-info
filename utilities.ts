export interface ApplicationVersion {
  majorVersion: number | undefined
  minorVersion: number | undefined
}

/**
 * Extracts the major and minor version numbers fron a version string.
 * @param {string} versionString - A version string.
 * @returns {ApplicationVersion} - The major and minor version numbers, if available.
 */
export function parseVersion(
  versionString: string
): ApplicationVersion | undefined {
  const versionPieces = (versionString ?? '').split('.')

  return {
    majorVersion:
      versionPieces.length > 0 ? Number.parseInt(versionPieces[0]) : undefined,
    minorVersion:
      versionPieces.length > 1 ? Number.parseInt(versionPieces[1]) : undefined
  }
}
