const puppeteer = require('puppeteer-extra');
const chalk = require('chalk');
const fs = require('fs');

const utils = require('./utils');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

var contents = fs.readFileSync("creds.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);

email = jsonContent.email;
password = jsonContent.password;

var banner = `███╗   ███╗███████╗███████╗████████╗    ███╗   ███╗██╗   ██╗███████╗██╗ ██████╗
████╗ ████║██╔════╝██╔════╝╚══██╔══╝    ████╗ ████║██║   ██║██╔════╝██║██╔════╝
██╔████╔██║█████╗  █████╗     ██║       ██╔████╔██║██║   ██║███████╗██║██║     
██║╚██╔╝██║██╔══╝  ██╔══╝     ██║       ██║╚██╔╝██║██║   ██║╚════██║██║██║     
██║ ╚═╝ ██║███████╗███████╗   ██║       ██║ ╚═╝ ██║╚██████╔╝███████║██║╚██████╗
╚═╝     ╚═╝╚══════╝╚══════╝   ╚═╝       ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝`;
console.log(chalk.blue(banner));

// id regex:
// ((\w|\d){3}-){2}(\w|\d){4}\s

utils.ask('Meet ID: ', resp => {
    var meet = 'https://meet.google.com/' + resp;
    (async () => {
        console.log('Starting puppeteer...');
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--use-fake-ui-for-media-stream']
        });
        const context = browser.defaultBrowserContext();
        context.overridePermissions("https://meet.google.com", ["notifications", "microphone", "camera"]);
        const page = await browser.newPage();


        // Login
        const navigationPromise = page.waitForNavigation();
        // console.log('Logging in to ' + chalk.red(email) + '...');
        console.log('Joining meet...')
        await page.goto(meet);

        await navigationPromise;

        await page.waitForSelector('input[type="email"]');
        await page.click('input[type="email"]');

        await navigationPromise;

        await page.type('input[type="email"]', email);

        await page.waitForSelector('#identifierNext');
        await page.click('#identifierNext');

        await page.waitForTimeout(5000);

        await page.waitForSelector('input[type="password"]')
        await page.click('input[type="password"]')

        await page.waitForTimeout(500);

        await page.type('input[type="password"]', password);

        await page.waitForSelector('#passwordNext');
        await page.click('#passwordNext');

        await navigationPromise;

        console.log(chalk.green('Logged in as ' + email + '!'))
        console.log('');


        // Join Meet
        // await page.goto(meet);

        await navigationPromise;

        console.log('Joining Meet...');

        await page.waitForTimeout(5000);

        const joinButton = await page.$x("//span[contains(., 'Join')]");
        await joinButton[0].click();

        console.log(chalk.green('Meet succesfully joined!'));

        await navigationPromise;
        await page.waitForTimeout(1250);

        await page.waitForSelector("div[aria-label='Chat with everyone']");
        await page.click("div[aria-label='Chat with everyone']");

        console.log(chalk.green('Chat opened!'));

        // await page.waitForTimeout(1000);

        // const observer = new MutationObserver(function () {
        //     (async () => {
        //         var nameEl = await page.$('div[aria-live="polite"]:last-child:first-child:first-child');
        //         var name = await page.evaluate(nameEl => nameEl.textContent, nameEl);
        //         var messageEl = await page.$('div[aria-live="polite"]:last-child:last-child div');
        //         var message = await page.evaluate(messageEl => messageEl.textContent, messageEl);
        //         console.log('name: ' + name);
        //         console.log('message: ' + message);
        //     });
        // })
        // observer.observe(page.$('div[aria-live="polite"]'), {attributes: true, childList: false, subtree: false});

        // await page.evaluate(() => {
        //     var observer = new MutationObserver((mutations) => {
        //         console.log(mutation);
        //     });
        //     observer.observe(document.body, { attributes: false, childList: true, subtree: true });
        // });

        // var elementToCheckWhenUpdates = 'div[aria-live="polite"]';
        // elementToCheckWhenUpdates lastDivThere divWithoutClass(0) div[0] = name
        // elementToCheckWhenUpdates lastDivThere divWithoutClass(0) div[1] = timeOfMessage
        // elementToCheckWhenUpdates lastDivThere divWithClass(1) div = message

        // var input = 'textarea[name="chatTextInput"]';
        // press enter kkey to send message;





        // await page.screenshot({path: 'example.png'});
        
        // await browser.close();
    })();
});