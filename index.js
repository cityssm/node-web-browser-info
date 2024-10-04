import browserLauncher from '@httptoolkit/browser-launcher';
import { parseVersion } from './utilities.js';
const installedWebBrowsersExpiryMillis = 5 * 60_000;
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
    return await new Promise((resolve) => {
        browserLauncher.detect((browsers) => {
            const installedWebBrowsersTemp = [];
            for (const browser of browsers) {
                installedWebBrowsersTemp.push(Object.assign(browser, parseVersion(browser.version)));
            }
            installedWebBrowsers = installedWebBrowsersTemp;
            installedWebBrowsersMillis = Date.now();
            resolve(installedWebBrowsersTemp);
        });
    });
}
export async function getInstalledWebBrowsers(webBrowserTypes, minimumMajorVersion = 0) {
    const browsers = await _loadInstalledWebBrowsers();
    if (webBrowserTypes === undefined) {
        return browsers;
    }
    const webBrowserTypesToSearch = typeof webBrowserTypes === 'string' ? [webBrowserTypes] : webBrowserTypes;
    return browsers.filter((possibleBrowser) => {
        return (webBrowserTypesToSearch.includes(possibleBrowser.type) &&
            (possibleBrowser.majorVersion ?? 0) >= minimumMajorVersion);
    });
}
