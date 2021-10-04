const puppeteer = require('puppeteer');
const CREDS = require('./creds');


async function run() {

    //LOGIN
    const USERNAME_SELECTOR="#login_field";
    const PASSWORD_SELECTOR="#password";
    const BUTTON_SELECTOR="input[value='Sign in']";
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://github.com/login');
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);
    await page.click(BUTTON_SELECTOR);
    await page.waitForSelector("#repos-container > h2 > a");

    //SEARCH
    const SEARCHBOX_SELECTOR = "#js-pjax-container > div > div.col-12.col-md-3.float-left.px-md-2 > nav.menu.border.d-none.d-md-block > a.menu-item.selected";
    const userToSearch = 'jimarasim';
    const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;
    await page.goto(searchUrl);
    await page.waitForSelector(SEARCHBOX_SELECTOR);
    await page.screenshot({ path: 'screenshots/search.png' });
    await browser.close();
}

run();