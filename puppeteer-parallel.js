import {connect} from 'puppeteer';
import {expect} from "chai";
import {capabilities, teardown} from "./parallel.conf.js";


const parallelTests = async (capability) => {
    console.log("Initialising test:: ", capability['LT:Options']['name']);

    // code of script here
    let browser;
    let page;
    try {
        // define the browser  with browserWSEndpoint (browser end point URL)
        browser = await connect({
            browserWSEndpoint: `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
        });
        // define the page to control the browser chrome
        page = await browser.newPage();
        // steps of scenario
        await page.goto("https://www.duckduckgo.com");
        console.log("STEP 1: Navigating to DuckDuckGo");
        let searchBar = await page.$("[name='q'");
        await searchBar.click();
        console.log("STEP 2: Clicking on search bar");
        await searchBar.type("LambdaTest");
        console.log("STEP 3: Typing LambdaTest in search bar");
        // Option 2 — équivalent avec une fonction vide
        await Promise.all([
            page.keyboard.press('Enter'),
            page.waitForNavigation().then(() => {
                console.log("STEP 4: Pressing Enter and waiting for navigation");
            })
        ]);
        // get the title of current page after scenario search
        let ActualTitle = await page.title();
        // assertion with chai to check if the title is correct or not
        expect(ActualTitle).equal('LambdaTest at DuckDuckGo', 'Expected page title is incorrect!');
        // Mark the test as completed or failed
        await page.evaluate(_ => {
            },
            `lambdatest_action: ${JSON.stringify({
                action: 'setTestStatus',
                arguments: {
                    status: 'passed',
                    remark: 'Test Search DuckDuckGo Passed Successfully'
                }
            })}`);
        await teardown(page, browser);
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
            await teardown(page, browser);
        }
        // throw the error to make sure the test is marked as failed in the report and to avoid false positives
        throw e;
    }
};

// run now the parallelTests
(async () => {
    for (const capability of capabilities) {
        await parallelTests(capability);
    }
})();
/* capabilities.forEach(async (capability) => {
    await parallelTests(capability);
}); */
