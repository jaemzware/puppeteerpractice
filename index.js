const puppeteer = require('puppeteer');
const CREDS = require('./creds');


async function run() {
    const USERNAME_SELECTOR="#login_field";
    const PASSWORD_SELECTOR="#password";
    const BUTTON_SELECTOR="input[value='Sign in']";
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://github.com/login');
    await page.screenshot({ path: 'screenshots/github.png' });


    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);

    await page.waitForNavigation();

    browser.close();
}

run();