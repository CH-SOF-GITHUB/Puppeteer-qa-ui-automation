'use strict';
/*
ES Modules (import) Strict Mode activé automatiquement
It prevents silent JavaScript errors and enforces safer coding practices.
However, when using ES modules, strict mode is automatically enabled.
* */
import {connect} from 'puppeteer';
import {caps_chrome} from "./caps.conf.js";

(async () => {
    // code of script here
    let browser;
    let page;
    try {
        // define the browser  with browserWSEndpoint (browser end point URL)
        browser = await connect({
            browserWSEndpoint: `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(caps_chrome))}`
        });
        // define the page to control the browser chrome
        page = await browser.newPage();
        // set the viewport of the page
        await page.setViewport({
            width: 1024,
            height: 768,
            // Window: devicePixelRatio property
            deviceScaleFactor: 1,
        });
        // navigate to the URL
        console.log("Navigating to LambdaTest");
        await page.goto("https://www.lambdatest.com/");
        console.log("Navigating to Pricing");
        await page.goto("https://www.lambdatest.com/pricing");
        console.log("Navigating to Automation");
        await page.goto("https://www.lambdatest.com/automation-testing");
        await page.evaluate(_ => {
            },
            `lambdatest_action: ${JSON.stringify({
                action: 'setTestStatus',
                arguments: {
                    status: 'passed',
                    remark: 'Test Passed Successfully'
                }
            })}`);
        console.log("Browser is closed");
        await browser.close();
    } catch (e) {
        if (browser) {
            const page = await browser.newPage();
            await page.evaluate(_ => {
                },
                `lambdatest_action: ${JSON.stringify({
                    action: 'setTestStatus',
                    arguments: {
                        status: 'failed',
                        remark: 'Test failed with error: ' + e.get()
                    }
                })}`);
            await browser.close();
        }
        throw e;
    }
})();
