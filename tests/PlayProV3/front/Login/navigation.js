'use strict';
/*
ES Modules (import) Strict Mode activé automatiquement
It prevents silent JavaScript errors and enforces safer coding practices.
However, when using ES modules, strict mode is automatically enabled.
* */
import {connect} from 'puppeteer';
import {caps_chrome} from "../../../../caps.conf.js";


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
        // navigate to Login Page
        console.log("Navigating to PlayPro V3 Home Page");
        await page.goto("https://chakerqatesting.playpro.fr/", {waitUntil: 'domcontentloaded'});
        // method 1 to get title page
        const ActualTitle1 = await page.title();
        console.log("Title : " + ActualTitle1);
        console.log("Navigating to PlayPro V3 Login Page");
        await page.goto("https://chakerqatesting.playpro.fr/connexion", {waitUntil: 'domcontentloaded'});
        // method 2 to get title page
        const ActualTitle2 = await page.evaluate(() => document.title);
        console.log("Title : " + ActualTitle2);
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
                        remark: 'Test failed with error: ' + e.stack
                    }
                })}`);
            await browser.close();
        }
        throw e;
    }
})();
