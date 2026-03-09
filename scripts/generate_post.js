const { fetchLatestNews } = require('./news_fetcher');
const { createArticleMarkdown } = require('./content_creator');
const { saveMarkdown } = require('./file_saver');

async function main() {
    console.log("=== AIブログ自動生成システム 開始 ===");
    
    // 1. 最新ニュースの取得
    const newsList = await fetchLatestNews();
    if (newsList.length === 0) {
        console.log("ニュースが見つかりませんでした。");
        return;
    }

    // 最大30件までに制限
    const maxPosts = 30;
    const targetNewsList = newsList.slice(0, maxPosts);
    console.log(`${targetNewsList.length}件のニュースを処理します。`);

    for (const [index, targetNews] of targetNewsList.entries()) {
        try {
            console.log(`\n[${index + 1}/${targetNewsList.length}] 処理中: ${targetNews.title}`);
            console.log("AI記事を生成中...");
            const markdown = await createArticleMarkdown(targetNews);
            
            if (!markdown) {
                console.error("記事の生成に失敗しました。次へ進みます。");
                continue;
            }

            console.log("ファイルを保存中...");
            const filePath = saveMarkdown(markdown);
            
            if (filePath) {
                console.log(`保存完了: ${filePath}`);
            }

            // API制限回避のためのディレイ (2秒)
            if (index < targetNewsList.length - 1) {
                console.log("次の生成まで待機中...");
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch (error) {
            console.error(`エラー発生 (${targetNews.title}):`, error.message);
        }
    }

    console.log("\n=== 全ての処理が完了しました！ ===");
}

main().catch(console.error);
