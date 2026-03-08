const { fetchLatestNews } = require('./news_fetcher');
const { createArticleMarkdown } = require('./content_creator');
const { saveMarkdown } = require('./file_saver');

async function main() {
    console.log("=== AIブログ自動生成システム 開始 ===");
    
    // 1. 最新ニュースの取得
    const newsList = await fetchLatestNews();
    if (newsList.length === 0) {
        console.log("新規のAI関連ニュースが見つかりませんでした。");
        return;
    }

    // 最新の1件のみ処理
    const targetNews = newsList[0];
    console.log(`処理対象: ${targetNews.title}`);

    // 2. AIによるMarkdown記事生成
    console.log("AI記事を生成中...");
    const markdown = await createArticleMarkdown(targetNews);
    if (!markdown) {
        console.error("記事の生成に失敗しました。");
        return;
    }

    // 3. ファイルとして保存
    console.log("ファイルを保存中...");
    const filePath = saveMarkdown(markdown);
    
    if (filePath) {
        console.log(`=== 自動生成が正常に完了しました！ ===`);
        console.log(`保存先: ${filePath}`);
    } else {
        console.log("=== エラーが発生しました。 ===");
    }
}

main().catch(console.error);
