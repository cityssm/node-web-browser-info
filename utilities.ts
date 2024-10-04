export interface ApplicationVersion {
  majorVersion: number | undefined
  minorVersion: number | undefined
}

/**
 * Extracts the major and minor version numbers from a version string.
 * @param versionString - A version string.
 * @returns - The major and minor version numbers, if available.
 */
export function parseVersion(
  versionString = ''
): ApplicationVersion | undefined {
  const versionPieces = versionString.split('.')

  return {
    majorVersion:
      versionPieces.length > 0 ? Number.parseInt(versionPieces[0]) : undefined,
    minorVersion:
      versionPieces.length > 1 ? Number.parseInt(versionPieces[1]) : undefined
  }
}
