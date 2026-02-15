// define the capabilities array with the respective configuration for the parallel tests
export const capabilities = [
    {
        browserName: 'Chrome',
        browserVersion: 'latest',
        platform: 'Windows 11',
        'LT:Options': {
            build: 'chaker-puppeteer-parallel-build-1',
            name: 'My first Puppeteer parallel test on Windows - Chrome',
            resolution: '1366x768',
            projectName: 'Puppeteer-UI-PlayPro-Web-Site-Testing',
            user: 'LambdaTest02outlook',
            accessKey: 'LT_OeKIsPcFeDNbCXdCF8F61YHX4U4JIW0qFsvvCM4804D4Cuz',
            network: true,
            video: true,
            console: true,
            terminal: true,
            tunnel: false,
            geoLocation: 'TN'
        }
    },
    {
        browserName: 'MicrosoftEdge',
        browserVersion: 'latest',
        platform: 'Windows 11',
        'LT:Options': {
            build: 'chaker-puppeteer-parallel-build-1',
            name: 'My first Puppeteer test on Windows - Edge',
            resolution: '1366x768',
            projectName: 'Puppeteer-UI-PlayPro-Web-Site-Testing',
            user: 'LambdaTest02outlook',
            accessKey: 'LT_OeKIsPcFeDNbCXdCF8F61YHX4U4JIW0qFsvvCM4804D4Cuz',
            network: true,
            video: true,
            console: true,
            terminal: true,
            tunnel: false,
            geoLocation: 'TN'
        }
    },
    {
        browserName: 'Chrome',
        browserVersion: 'latest',
        platform: 'MacOS Big sur',
        'LT:Options': {
            build: 'chaker-puppeteer-parallel-build-1',
            name: 'My first Puppeteer test on MacOS Big sur - Chrome',
            resolution: '1366x768',
            projectName: 'Puppeteer-UI-PlayPro-Web-Site-Testing',
            user: 'LambdaTest02outlook',
            accessKey: 'LT_OeKIsPcFeDNbCXdCF8F61YHX4U4JIW0qFsvvCM4804D4Cuz',
            network: true,
            video: true,
            console: true,
            terminal: true,
            tunnel: false,
            geoLocation: 'TN'
        }
    }
];

export async function teardown(page, browser) {
    await page.close();
    await browser.close();
}
