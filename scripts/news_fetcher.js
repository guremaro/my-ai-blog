const RSSParser = require('rss-parser');
const parser = new RSSParser();

// 取得対象のテック・エンタメ系RSSフィード
const FEEDS = [
    'https://rss.itmedia.co.jp/rss/2.0/aiplus.xml', // ITmedia AI+
    'https://www.gizmodo.jp/index.xml',
    'https://www.famitsu.com/rss/all.xml', // ファミ通 (ゲーム)
    'https://www.oricon.co.jp/rss/news/', // オリコン (エンタメ)
];

async function fetchLatestNews() {
    console.log('ニュースを取得中...');
    let allItems = [];

    for (const url of FEEDS) {
        try {
            const feed = await parser.parseURL(url);
            console.log(`取得成功: ${feed.title}`);
            
            // 最新の3記事のみ抽出
            const items = feed.items.slice(0, 3).map(item => ({
                title: item.title,
                link: item.link,
                contentSnippet: item.contentSnippet,
                pubDate: item.pubDate,
                source: feed.title
            }));
            
            allItems = allItems.concat(items);
        } catch (error) {
            console.error(`取得失敗 (${url}):`, error.message);
        }
    }

    // AIに関連するキーワードでフィルタリング（任意）
    const aiKeywords = ['AI', '人工知能', 'ChatGPT', 'Gemini', 'Claude', '自動化', '生成AI'];
    const filteredNews = allItems.filter(item => 
        aiKeywords.some(keyword => item.title.includes(keyword) || (item.contentSnippet && item.contentSnippet.includes(keyword)))
    );

    console.log(`合計 ${filteredNews.length} 件のAI関連ニュースを抽出しました。`);
    return filteredNews;
}

if (require.main === module) {
    fetchLatestNews().then(news => {
        console.log(JSON.stringify(news, null, 2));
    });
}

module.exports = { fetchLatestNews };
