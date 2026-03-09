const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

/**
 * X (Twitter) に記事の更新を通知するスクリプト
 * @param {Object} postData { title, slug, hashtags }
 */
async function postToX(postData) {
    const { title, slug, hashtags } = postData;
    
    // 環境変数から認証情報を取得
    const clientConfig = {
        appKey: process.env.X_API_KEY,
        appSecret: process.env.X_API_SECRET,
        accessToken: process.env.X_ACCESS_TOKEN,
        accessSecret: process.env.X_ACCESS_SECRET,
    };

    // 認証情報が揃っているかチェック
    if (!clientConfig.appKey || !clientConfig.appSecret || !clientConfig.accessToken || !clientConfig.accessSecret) {
        console.warn("X(Twitter) の認証情報が完全ではありません。ツイートをスキップします。");
        console.log("必要な環境変数: X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET");
        return null;
    }

    try {
        const client = new TwitterApi(clientConfig);
        const twitterClient = client.readWrite.v2;

        const siteUrl = process.env.SITE_URL || "https://my-ai-blog-ten.vercel.app";
        const postUrl = `${siteUrl}/posts/${slug}`;
        
        // ツイート本文の構築
        const tweetText = `【新着記事】\n${title}\n\n${postUrl}\n\n${hashtags || "#トレンド #ニュース"}`;

        console.log("X(Twitter) へ投稿中...");
        const { data: createdTweet } = await twitterClient.tweet(tweetText);
        console.log(`ツイート成功！ ID: ${createdTweet.id}`);
        
        return createdTweet;
    } catch (error) {
        console.error("X(Twitter) 投稿エラー:", error.message);
        if (error.data) {
            console.error("詳細:", JSON.stringify(error.data));
        }
        return null;
    }
}

module.exports = { postToX };

// コマンドラインから直接実行する場合の簡易テスト用
if (require.main === module) {
    postToX({
        title: "テスト投稿",
        slug: "test-post",
        hashtags: "#Test #AI"
    }).then(() => console.log("Done."));
}
