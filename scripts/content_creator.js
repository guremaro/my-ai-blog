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
3. ネットの反応: 掲示板（2ch/5ch）のスレッドのような形式で、5〜8個程度のコメントを作成してください。
   - 形式例: "1: 名前：名無しさん  2026/03/09(月) 00:00:00  ID:xxxx\n  これ凄くない？期待だわ。"
   - 内容: 肯定的な意見、否定的な意見、斜に構えた意見など、世論の賛否が分かれるようにバラエティ豊かにしてください。
   - 口調: ネット掲示板特有の砕けた表現（「〜ワロタ」「〜だな」「マジかよ」等）を自然に使ってください。
4. Markdown形式で出力し、以下のFrontmatterを必ず含めてください。
   ---
   title: "【${newsItem.source}】${newsItem.title}"
   date: "YYYY-MM-DD"
   excerpt: "ネットで話題：${newsItem.title}について語るスレ"
   category: "IT・ニュース" または "ライフハック" または "ガジェット" または "ゲーム" または "エンタメ"
   ---
5. 全体的に明るく、読み物として面白いトーンにしてください。
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
