const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async function (){
    try {

        //Browser variables and launch
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent('<h1>hello world!!</h1>');
        await page.emulateMediaType('screen');

        //Path to create new pdf
        await page.pdf({
            path: 'PDFfiles/mypdf.pdf',
            format: 'A4',
            printBackground: true
        });

        console.log('done');
        await browser.close();
        process.exit();

    } catch (e) {
        console.log('our error', e);
    }
})();