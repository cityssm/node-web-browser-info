import assert from 'node:assert'
import { describe, it } from 'node:test'

import { chromeWebBrowserTypes, getInstalledWebBrowsers } from '../index.js'

await describe('web-browser-info', async () => {
  await it('Finds all available web browsers', async () => {
    const browsers = await getInstalledWebBrowsers()
    console.log(browsers)
    assert.ok(browsers.length > 0)
  })

  await it('Finds all available Chrome-based web browsers', async () => {
    const browsers = await getInstalledWebBrowsers(chromeWebBrowserTypes)
    console.log(browsers)
    assert.ok(browsers.length > 0)
  })

  if (process.platform === 'win32' || process.platform === 'linux') {
    await it('Finds all available Firefox web browsers', async () => {
      const browsers = await getInstalledWebBrowsers('firefox')
      console.log(browsers)
      assert.ok(browsers.length > 0)
    })
  }

  await it('Finds all available Chrome-based web browsers newer than version 120', async () => {
    const minimumMajorVersion = 120

    const browsers = await getInstalledWebBrowsers(
      chromeWebBrowserTypes,
      minimumMajorVersion
    )
    console.log(browsers)

    assert.ok(browsers.length > 0)

    for (const chromeBrowser of browsers) {
      assert.ok((chromeBrowser.majorVersion ?? 0) >= minimumMajorVersion)
    }
  })

  await it('Finds all available Firefox web browsers newer than version 10000 (should be 0)', async () => {
    const minimumMajorVersion = 10_000

    const browsers = await getInstalledWebBrowsers(
      'firefox',
      minimumMajorVersion
    )
    console.log(browsers)

    assert.strictEqual(browsers.length, 0)
  })
})
