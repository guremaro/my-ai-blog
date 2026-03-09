const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function createArticleMarkdown(newsItem) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
以下のニュース情報を元に、読者が楽しめるブログ記事を日本語で執筆してください。
サイト名は「みんなの情報収集」です。

【ニュースタイトル】: ${newsItem.title}
【リンク】: ${newsItem.link}
【概要】: ${newsItem.contentSnippet}

【執筆ルール】:
1. 構成: ニュースの簡単な紹介 ＋ 「ネットの反応（2ch風掲示板形式）」
2. ニュース紹介: 3〜4行で分かりやすく概要を伝えてください。
3. ネットの反応: 掲示板（2ch/5ch）のスレッドのような形式で、5〜8個程度のコメントを作成してください。内容には世論の賛否を含めてください。
4. 🌟【重要】収益化指示:
   - 記事の最後または掲示板のレスの中で、内容に関連する商品（Amazonや楽天などで探せるようなもの）があれば、「おすすめの関連商品はこちら」といった形で紹介してください。
   - 口調は掲示板のノリ（「これ買っとけw」「これ便利だぞ」等）でOKです。
5. Markdown形式で出力し、以下のFrontmatterを必ず含めてください。
   ---
   title: "【${newsItem.source}】${newsItem.title}"
   date: "YYYY-MM-DD"
   excerpt: "ネットで話題：${newsItem.title}について語るスレ"
   category: "IT・ニュース" または "ライフハック" または "ガジェット" または "ゲーム" または "エンタメ"
   ---
6. 全体的に明るく、読み物として面白いトーンにしてください。
`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("記事生成エラー:", error.message);
        return null;
    }
}

module.exports = { createArticleMarkdown };
