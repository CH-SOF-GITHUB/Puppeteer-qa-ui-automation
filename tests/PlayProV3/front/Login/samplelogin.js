'use strict';
/*
ES Modules (import) Strict Mode activé automatiquement
It prevents silent JavaScript errors and enforces safer coding practices.
However, when using ES modules, strict mode is automatically enabled.
* */
import {connect} from 'puppeteer';
import {caps_chrome} from "../../../../caps.conf.js";
import {expect} from "chai";
import * as timers from "node:timers";

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
        console.log("Navigating to PlayPro V3 Login Page");
        await page.goto("https://chakerqatesting.playpro.fr/connexion", {waitUntil: 'domcontentloaded'});
        // method 2 to get title page
        const ActualTitle2 = await page.evaluate(() => document.title);
        console.log("Title : " + ActualTitle2);
        // enter a valid email using method waitForSelector
        const EmailInput = await page.waitForSelector("input[type='email']");
        await EmailInput.click();
        await EmailInput.type("chqatesting-client@yopmail.com");
        const PwdInput = await page.waitForSelector("input[type='password']");
        await PwdInput.click();
        await PwdInput.type("Admin1234!");
        const LoginBtn = await page.waitForSelector("button[type='submit']");
        await LoginBtn.click();
        const pages = await browser.pages();
        page = pages[pages.length - 1]; // dernier onglet ouvert
        await page.waitForNavigation({waitUntil: "domcontentloaded"});
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // check the expected results
        const ActualURL = page.url();
        expect(ActualURL).equal("https://chakerqatesting.playpro.fr/", "URL Page after login not matched !");
        const ActualTitle = await page.title();
        expect(ActualTitle).equal("Accueil", "Title Page after login not matched !");
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
