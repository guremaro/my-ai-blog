const RSSParser = require('rss-parser');
const parser = new RSSParser();

// 取得対象のテック・エンタメ系RSSフィード
const FEEDS = [
    'https://www.gizmodo.jp/index.xml',
    'https://www.famitsu.com/rss/all.xml',
    'https://www.oricon.co.jp/rss/news/',
];

async function fetchLatestNews() {
    console.log('ニュースを取得中...');
    let allItems = [];

    for (const url of FEEDS) {
        try {
            console.log(`フェード取得試行: ${url}`);
            const feed = await parser.parseURL(url);
            console.log(`取得成功: ${feed.title} (${feed.items?.length || 0}件)`);
            
            const items = (feed.items || []).slice(0, 15).map(item => ({
                title: item.title,
                link: item.link,
                contentSnippet: item.contentSnippet || item.title || "",
                pubDate: item.pubDate,
                source: feed.title || "不明なソース"
            }));
            
            allItems = allItems.concat(items);
        } catch (error) {
            console.error(`取得失敗 (${url}):`, error.message);
        }
    }

    // 重複削除 (タイトルベース)
    const uniqueNews = Array.from(new Map(allItems.map(item => [item.title, item])).values());
    
    console.log(`合計 ${uniqueNews.length} 件のニュースを抽出しました。`);
    return uniqueNews;
}

if (require.main === module) {
    fetchLatestNews().then(news => {
        console.log(JSON.stringify(news, null, 2));
    });
}

module.exports = { fetchLatestNews };
