const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/');

    const result = await page.evaluate(() => {
        let data = []; // 创建一个数组保存结果
        let elements = document.querySelectorAll('.product_pod'); // 选择所有书籍

        for (var element of elements){ // 遍历书籍列表
            let title = element.childNodes[5].innerText; // 提取标题信息
            let price = element.childNodes[7].children[0].innerText; // 提取价格信息

            data.push({title, price}); // 组合数据放入数组
        }

        return data; // 返回数据集
    });

    browser.close();
    return result; // 返回数据
};

scrape().then((value) => {
    console.log(value); // 打印结果
});
