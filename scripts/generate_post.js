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

    // 最大30件までに制限（自動実行時は少なめにしても良いが、重複チェックがあれば30でも可）
    const maxPosts = 30;
    const targetNewsList = newsList.slice(0, maxPosts);
    console.log(`${targetNewsList.length}件のニュースを処理します。`);

    let generatedCount = 0;
    const limitPerRun = 3; // 1回の実行で新しく生成する最大記事数

    for (const [index, targetNews] of targetNewsList.entries()) {
        try {
            if (generatedCount >= limitPerRun) {
                console.log(`\n1回あたりの生成上限(${limitPerRun}件)に達したため終了します。`);
                break;
            }

            console.log(`\n[${index + 1}/${targetNewsList.length}] 処理中: ${targetNews.title}`);
            
            // 重複チェック (簡易版)
            const slug = targetNews.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .substring(0, 50);
            const path = require('path');
            const fs = require('fs');
            const filePath = path.join(__dirname, '../src/content/posts', `${slug}.md`);

            if (fs.existsSync(filePath)) {
                console.log(`既に記事が存在するためスキップします: ${slug}`);
                continue;
            }

            console.log("AI記事を生成中...");
            const markdown = await createArticleMarkdown(targetNews);
            
            if (!markdown) {
                console.error("記事の生成に失敗しました。次へ進みます。");
                continue;
            }

            console.log("ファイルを保存中...");
            const savedPath = saveMarkdown(markdown);
            
            if (savedPath) {
                console.log(`保存完了: ${savedPath}`);
                generatedCount++;

                // X(Twitter) へ投稿
                const { postToX } = require('./x_poster');
                const titleMatch = markdown.match(/title: "(.*)"/);
                const hashtagMatch = markdown.match(/hashtags: "(.*)"/);
                const title = titleMatch ? titleMatch[1] : "新着記事";
                const hashtags = hashtagMatch ? hashtagMatch[1] : "#トレンド #ニュース";
                
                // slugは保存時のロジックに合わせる
                const slug = path.basename(savedPath, '.md');

                await postToX({ title, slug, hashtags });
            }

            // API制限回避のためのディレイ (2秒)
            if (index < targetNewsList.length - 1 && generatedCount < limitPerRun) {
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
