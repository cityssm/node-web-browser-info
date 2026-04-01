import { type BrowserInfo } from '@httptoolkit/browser-launcher';
import { type ApplicationVersion } from './utilities.js';
export type InstalledWebBrowser = ApplicationVersion & BrowserInfo;
export declare const possibleWebBrowserTypes: readonly ["chrome", "chromium", "firefox", "phantomjs", "safari", "ie", "msedge", "brave", "opera", "arc"];
export declare const chromeWebBrowserTypes: ["chrome", "chromium"];
/**
 * Retrieves a list of installed web browsers that optionally match the given types.
 * @param webBrowserTypes - An optional web browser type or list of web browser types to filter by.
 * @param minimumMajorVersion - An optional minimum major version number.
 * @returns - An array of installed web browsers.
 */
export declare function getInstalledWebBrowsers(webBrowserTypes?: (typeof possibleWebBrowserTypes)[number] | Array<(typeof possibleWebBrowserTypes)[number]>, minimumMajorVersion?: number): Promise<InstalledWebBrowser[]>;
