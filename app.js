import puppeteer from "puppeteer";

const loginLink = "https://www.hackerrank.com/auth/login";
const email = 'abhishekomr07@gmail.com';
const password = "abhishek07"; // Corrected the typo here

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: false,
            args: ["--start-maximized"],
            defaultViewport: null
        });

        const page = await browser.newPage();
        await page.goto(loginLink);

        await page.type("input[name='username']", email, { delay: 50 });
        await page.type("input[type='password']", password, { delay: 50 });
        await page.click("button[type='submit']", { delay: 50 });

        // Wait for navigation after login
        await page.waitForNavigation();

        // Wait for the algorithms link to be clickable
        await page.waitForSelector("a[data-attr1='algorithms']");
        await page.click("a[data-attr1='algorithms']", { delay: 50 });

        // Wait for the warmup input to be available
        await page.waitForSelector("input[value='warmup']");
        await page.click("input[value='warmup']", { delay: 50 });

        await new Promise((resolve, reject) => setTimeout(resolve, 3000))
        // Get all challenge buttons
        const allChallenges = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
        console.log(allChallenges.length + " number of questions");

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (browser) {
            // await browser.close(); // Ensure the browser is closed
        }
    }
})();
