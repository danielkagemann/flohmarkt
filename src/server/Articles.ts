import * as cheerio from 'cheerio';

export interface ArticleModel {
    title: string,
    description: string,
    price: string,
    image: string,
}

export const $Articles = {
    _BASE: 'https://www.kleinanzeigen.de',
    _URL: '/s-suchanfrage.html?keywords=&categoryId=&locationStr=75328+Sch%C3%B6mberg+b.+W%C3%BCrtt&locationId=8763&radius=0&sortingField=SORTING_DATE&adType=&posterType=&pageNum=1&action=find&maxPrice=&minPrice=&buyNowEnabled=false&shippingCarrier=',

    /**
     * get all articles
     */
    read: async function (url: string, result: ArticleModel[]) {
        console.log(`reading ${url}`);
        const $all = await cheerio.fromURL(this._BASE + url);
        const articles = $all('article');

        for (let article of articles) {
            const $article = cheerio.load(article);
            const title = $article('h2 a').text();
            const description = $article('p.aditem-main--middle--description').text();
            const price = $article('p.aditem-main--middle--price-shipping--price').text().replace(/\s+/g, '');
            const image = $article('div.imagebox.srpimagebox img').attr('src') ?? '';

            if (title) {
                const obj: ArticleModel = {title, description, price, image};
                result.push(obj);
            }
        }

        // try to read next page
        const link = $all('a.pagination-next').attr('href');
        if (link) {
            await $Articles.read(link, result);
        }
    }
}