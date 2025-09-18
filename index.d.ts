import browserLauncher from '@httptoolkit/browser-launcher';
import { type ApplicationVersion } from './utilities.js';
export type InstalledWebBrowser = ApplicationVersion & browserLauncher.Browser;
export declare const possibleWebBrowserTypes: readonly ["chrome", "chromium", "firefox", "phantomjs", "safari", "ie", "msedge", "brave", "opera", "arc"];
export declare const chromeWebBrowserTypes: ["chrome", "chromium"];
export declare function getInstalledWebBrowsers(webBrowserTypes?: (typeof possibleWebBrowserTypes)[number] | Array<(typeof possibleWebBrowserTypes)[number]>, minimumMajorVersion?: number): Promise<InstalledWebBrowser[]>;
