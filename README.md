# Web Browser Info

[![npm (scoped)](https://img.shields.io/npm/v/@cityssm/web-browser-info)](https://www.npmjs.com/package/@cityssm/web-browser-info)
[![DeepSource](https://app.deepsource.com/gh/cityssm/node-web-browser-info.svg/?label=active+issues&show_trend=true&token=UihEHJULs-0PJTFYNmxfmjj-)](https://app.deepsource.com/gh/cityssm/node-web-browser-info/)
[![Maintainability](https://api.codeclimate.com/v1/badges/2afbcf22ea3328e30fec/maintainability)](https://codeclimate.com/github/cityssm/node-web-browser-info/maintainability)
[![codecov](https://codecov.io/gh/cityssm/node-web-browser-info/graph/badge.svg?token=ZA04Y3J8R9)](https://codecov.io/gh/cityssm/node-web-browser-info)
[![Coverage Testing](https://github.com/cityssm/node-web-browser-info/actions/workflows/coverage.yml/badge.svg)](https://github.com/cityssm/node-web-browser-info/actions/workflows/coverage.yml)

Retrieves details about installed web browsers,
using the fantastic [@httptoolkit/browser-launcher](https://www.npmjs.com/package/@httptoolkit/browser-launcher) package.

Provides helper functions to filter the returned browsers by type and version.

## Installation

```sh
npm install @cityssm/web-browser-info
```

## Usage

```javascript
import {
  chromeWebBrowserTypes,
  getInstalledWebBrowsers 
} from '@cityssm/web-browser-info'

// Get all web browsers
const allWebBrowsers = await getInstalledWebBrowsers()

// Get all Firefox web browsers
const firefoxWebBrowsers = await getInstalledWebBrowsers('firefox')

// Get all Chrome-based (chrome or chromium) web browsers
const chromeWebBrowsers = await getInstalledWebBrowsers(chromeWebBrowserTypes)

// Get all Firefox web browsers newer than version 100
const newerFirefoxWebBrowsers = await getInstalledWebBrowsers('firefox', 100)
```

## Sample Output

```javascript
[
  {
    name: 'msedge',
    version: '122.0.2365.92',
    type: 'msedge',
    command: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    majorVersion: 122,
    minorVersion: 0
  },
  {
    name: 'ie',
    version: '11.00.22621.1',
    type: 'ie',
    command: 'C:\\Program Files\\Internet Explorer\\iexplore.exe',
    majorVersion: 11,
    minorVersion: 0
  },
  {
    name: 'ie',
    version: '11.00.22621.1',
    type: 'ie',
    command: 'C:\\Program Files (x86)\\Internet Explorer\\iexplore.exe',
    majorVersion: 11,
    minorVersion: 0
  },
  {
    name: 'chrome',
    version: '123.0.6312.86',
    type: 'chrome',
    command: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    majorVersion: 123,
    minorVersion: 0
  },
  {
    name: 'firefox',
    version: '124.0.1',
    type: 'firefox',
    command: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
    majorVersion: 124,
    minorVersion: 0
  }
]
```