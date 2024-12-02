import puppeteer from 'puppeteer';

// This is a test script to verify the scraper is working
async function testScraper() {
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Enable console log from the page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        // Navigate to a test site (using mudah.my as an example)
        await page.goto('https://www.mudah.my/malaysia/properties-for-rent', {
            waitUntil: 'networkidle0'
        });

        // Get page title as a basic test
        const title = await page.title();
        console.log('Page Title:', title);

        // Take a screenshot for verification
        await page.screenshot({ path: 'test-screenshot.png' });

        // Basic page information
        const pageInfo = await page.evaluate(() => {
            return {
                url: window.location.href,
                height: document.documentElement.scrollHeight,
                width: document.documentElement.scrollWidth
            };
        });

        console.log('Page Info:', pageInfo);

        await browser.close();
        console.log('Test completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testScraper();
