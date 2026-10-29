/* eslint-disable unicorn/no-top-level-assignment-in-function */
import { minutesToMillis } from '@cityssm/to-millis';
import { detectBrowsers } from '@httptoolkit/browser-launcher';
// eslint-disable-next-line unicorn/name-replacements
import { parseVersion } from './utilities.js';
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const installedWebBrowsersExpiryMillis = minutesToMillis(5);
let installedWebBrowsers = [];
let installedWebBrowsersMillis = 0;
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
];
export const chromeWebBrowserTypes = [
    'chrome',
    'chromium'
];
async function _loadInstalledWebBrowsers() {
    if (Date.now() - installedWebBrowsersMillis <=
        installedWebBrowsersExpiryMillis ||
        installedWebBrowsers.length > 0) {
        return installedWebBrowsers;
    }
    const browsers = await detectBrowsers();
    const installedWebBrowsersTemp = Array.from(browsers, (browser) => Object.assign(browser, parseVersion(browser.version)));
    // eslint-disable-next-line require-atomic-updates
    installedWebBrowsers = installedWebBrowsersTemp;
    // eslint-disable-next-line require-atomic-updates
    installedWebBrowsersMillis = Date.now();
    return installedWebBrowsersTemp;
}
/**
 * Retrieves a list of installed web browsers that optionally match the given types.
 * @param webBrowserTypes - An optional web browser type or list of web browser types to filter by.
 * @param minimumMajorVersion - An optional minimum major version number.
 * @returns - An array of installed web browsers.
 */
export async function getInstalledWebBrowsers(webBrowserTypes, minimumMajorVersion = 0) {
    const browsers = await _loadInstalledWebBrowsers();
    if (webBrowserTypes === undefined) {
        return browsers;
    }
    const webBrowserTypesToSearch = typeof webBrowserTypes === 'string' ? [webBrowserTypes] : webBrowserTypes;
    return browsers.filter((possibleBrowser) => webBrowserTypesToSearch.includes(possibleBrowser.type) &&
        (possibleBrowser.majorVersion ?? 0) >= minimumMajorVersion);
}
