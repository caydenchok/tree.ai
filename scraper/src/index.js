import puppeteer from 'puppeteer';

async function scrapeProperties(url) {
    try {
        // Launch the browser
        const browser = await puppeteer.launch({
            headless: "new", // Use new headless mode
            args: ['--no-sandbox']
        });

        // Create a new page
        const page = await browser.newPage();

        // Set viewport size
        await page.setViewport({ width: 1280, height: 800 });

        // Navigate to the URL
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Example: Scrape property listings
        const properties = await page.evaluate(() => {
            const listings = [];
            // This is an example selector - you'll need to adjust based on the actual website
            const items = document.querySelectorAll('.property-listing');
            
            items.forEach(item => {
                listings.push({
                    title: item.querySelector('.title')?.innerText || '',
                    price: item.querySelector('.price')?.innerText || '',
                    location: item.querySelector('.location')?.innerText || '',
                    link: item.querySelector('a')?.href || '',
                });
            });

            return listings;
        });

        // Close the browser
        await browser.close();

        return properties;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Example usage
const testUrl = 'https://www.example-property-site.com/rentals';
console.log('Starting scraper...');

scrapeProperties(testUrl)
    .then(results => {
        console.log('Scraped Properties:', results);
    })
    .catch(error => {
        console.error('Scraping failed:', error);
    });
