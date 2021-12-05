const path = require("path");
const puppeteer = require("puppeteer");

(async function openPdf() {
    const htmlFile = path.resolve("./views/catalogs.handlebars");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("file://" + htmlFile);
    await page.pdf({ path: "./sample.pdf", format: "Letter" });
    await browser.close();
})();


// const puppeteer = require('puppeteer');
// let path = require('path');
// const fs = require('fs-extra');
// const https = require("https");
//
// (async function openPdf() {
//     try {
//
//         //Browser variables and launch
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         // await page.goto(/pdfindex);
//
//          // await page.setContent(path=/catalogs.handlebars);
//         await page.emulateMediaType('screen');
//
//         //Path to create new pdf
//         const pdf = await page.pdf({
//             path: 'PDFfiles/mypdf.pdf',
//             format: 'A4',
//             printBackground: true,
//
//         });
//
//         console.log('done');
//         await browser.close();
//         return pdf
//         process.exit();
//
//     } catch (e) {
//         console.log('our error', e);
//     };
//
//
// })();
