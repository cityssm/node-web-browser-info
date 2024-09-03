import browserLauncher from '@httptoolkit/browser-launcher'

import { type ApplicationVersion, parseVersion } from './utilities.js'

export type InstalledWebBrowser = browserLauncher.Browser & ApplicationVersion

let installedWebBrowsers: InstalledWebBrowser[] = []
let installedWebBrowsersMillis = 0
const installedWebBrowsersExpiryMillis = 5 * 60_000

export const possibleWebBrowserTypes = [
  'chrome',
  'chromium',
  'firefox',
  'phantomjs',
  'safari',
  'ie',
  'msedge',
  'brave',
  'opera',
  'arc'
] as const

export const chromeWebBrowserTypes = [
  'chrome',
  'chromium'
] as const satisfies Array<(typeof possibleWebBrowserTypes)[number]>

async function _loadInstalledWebBrowsers(): Promise<InstalledWebBrowser[]> {
  if (
    Date.now() - installedWebBrowsersMillis <=
      installedWebBrowsersExpiryMillis ||
    installedWebBrowsers.length > 0
  ) {
    return installedWebBrowsers
  }

  return await new Promise((resolve) => {
    browserLauncher.detect((browsers) => {
      const installedWebBrowsersTemp: InstalledWebBrowser[] = []

      for (const browser of browsers) {
        installedWebBrowsersTemp.push(
          Object.assign(browser, parseVersion(browser.version))
        )
      }

      installedWebBrowsers = installedWebBrowsersTemp
      installedWebBrowsersMillis = Date.now()

      resolve(installedWebBrowsersTemp)
    })
  })
}

/**
 * Retrieves a list of installed web browsers that optionally match the given types.
 * @param webBrowserTypes - An optional web browser type or list of web browser types to filter by.
 * @param minimumMajorVersion - An optional minimum major version number.
 * @returns - An array of installed web browsers.
 */
export async function getInstalledWebBrowsers(
  webBrowserTypes?:
    | (typeof possibleWebBrowserTypes)[number]
    | Array<(typeof possibleWebBrowserTypes)[number]>,
  minimumMajorVersion = 0
): Promise<InstalledWebBrowser[]> {
  const browsers = await _loadInstalledWebBrowsers()

  if (webBrowserTypes === undefined) {
    return browsers
  }

  const webBrowserTypesToSearch =
    typeof webBrowserTypes === 'string' ? [webBrowserTypes] : webBrowserTypes

  return browsers.filter((possibleBrowser) => {
    return (
      (webBrowserTypesToSearch as string[]).includes(possibleBrowser.type) &&
      (possibleBrowser.majorVersion ?? 0) >= minimumMajorVersion
    )
  })
}
