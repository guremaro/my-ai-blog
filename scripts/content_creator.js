const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require('dotenv').config();

// adConfigを読み込む（CommonJS環境での対応）
const adConfigPath = path.join(__dirname, '../src/config/ads.ts');

async function createArticleMarkdown(newsItem) {
    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is not set in environment variables.");
        return null;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // 実際のアフィリエイトリンク情報をここに定義
    const affiliateInfo = `
    【おすすめ案件リスト】
    1. 注目案件: https://px.a8.net/svt/ejp?a8mat=4AZCG1+893BN6+2J9U+C0B9T
    2. メルカリ: https://px.a8.net/svt/ejp?a8mat=4AZCG1+89OR8Y+5LNQ+5YJRM
    3. ガジェット系A: https://px.a8.net/svt/ejp?a8mat=4AZCG1+59BV5E+2UG2+C03K1
    4. ガジェット系B: https://px.a8.net/svt/ejp?a8mat=4AZCG1+59XAR6+14CS+64RJ5
    `;

    const prompt = `
以下のニュース情報を元に、読者が楽しめるブログ記事を日本語で執筆してください。
サイト名は「みんなの情報収集」です。

【ニュースタイトル】: ${newsItem.title}
【リンク】: ${newsItem.link}
【概要】: ${newsItem.contentSnippet}

【執筆ルール】:
1. 構成: ニュースの簡単な紹介 ＋ 「ネットの反応（2ch風掲示板形式）」
2. ニュース紹介: 3〜4行で分かりやすく概要を伝えてください。
3. ネットの反応: 掲示板（2ch/5ch）のスレッドのような形式で、8〜12個程度のコメントを作成してください。
4. 🌟【最重要】収益化指示:
   - 掲示板のレス（2ch風）の中で、記事の話題に関連するものがあれば、以下の【おすすめ案件リスト】から1つか2つ、自然なノリで紹介してください。
   - 口調は掲示板のノリ（「これ買っとけw」「これ便利だぞ」等）でOKです。
   - リンクを貼る際は、[タイトル](URL) の形式ではなく、URLをそのまま、または文章の途中に含めてください。

${affiliateInfo}

5. Markdown形式で出力し、以下のFrontmatterを必ず含めてください。
   ---
   title: "【${newsItem.source}】${newsItem.title}"
   date: "${new Date().toISOString().split('T')[0]}"
   excerpt: "ネットで話題：${newsItem.title}について語るスレ"
   category: "IT・ニュース"
   ---
6. 全体的に明るく、読み物として面白いトーンにしてください。
`;

    try {
        console.log("AIリクエスト送信中...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("記事生成エラー:", error.message);
        if (error.message.includes("API key not valid")) {
            console.error("APIキーが無効です。Google AI Studioでキーが有効か、制限がかかっていないか確認してください。");
        } else if (error.message.includes("404") || error.message.includes("not found")) {
            console.error("モデルが見つかりません。お使いのキーで利用可能なモデルを確認してください。");
        }
        console.error("トラブルシューティング: https://aistudio.google.com/ でAPIキーの状態を確認してください。");
        return null;
    }
}

module.exports = { createArticleMarkdown };
