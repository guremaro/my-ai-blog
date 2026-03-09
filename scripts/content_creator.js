const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require('dotenv').config();

async function createArticleMarkdown(newsItem) {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
        console.error("GEMINI_API_KEY is not set.");
        return null;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const affiliateInfo = `
    【おすすめ案件リスト】
    1. 注目案件: https://px.a8.net/svt/ejp?a8mat=4AZCG1+893BN6+2J9U+C0B9T
    2. メルカリ: https://px.a8.net/svt/ejp?a8mat=4AZCG1+89OR8Y+5LNQ+5YJRM
    3. ガジェット系A: https://px.a8.net/svt/ejp?a8mat=4AZCG1+59BV5E+2UG2+C03K1
    4. ガジェット系B: https://px.a8.net/svt/ejp?a8mat=4AZCG1+59XAR6+14CS+64RJ5
    `;

        const promptText = `
以下のニュース情報を元に、読者が楽しめるブログ記事を日本語で執筆してください。
サイト名は「みんなの情報収集」です。

【ニュースタイトル】: ${newsItem.title}
【リンク】: ${newsItem.link}
【概要】: ${newsItem.contentSnippet}

【執筆ルール】:
1. 構成: ニュースの簡単な紹介 ＋ 「ネットの反応」
2. ニュース紹介: 3〜4行で分かりやすく概要を伝えてください。
3. ネットの反応: 掲示板（2ch/5ch）のスレッドのような形式で、8〜12個程度のコメントを作成してください。
4. 🌟【重要】トーン＆マナー:
   - 全体的に明るく、読者が「わかるわ」「たしかに」と共感できるような内容にしてください。
   - ネット掲示板特有の親しみやすい口調で執筆してください。
   - 掲示板のレス内で**無理に広告やリンクを紹介する必要はありません**。
   - 読者の感情（驚き、喜び、悩みなど）に寄り添ったコメントを優先してください。

${affiliateInfo}

5. Markdown形式で出力し、以下のFrontmatterを必ず含めてください。
---
title: "【${newsItem.source}】${newsItem.title}"
date: "${new Date().toISOString().split('T')[0]}"
excerpt: "ネットで話題：${newsItem.title}について語るスレ"
category: "IT・ニュース"
image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop"
---
※カテゴリは「IT・ニュース」「ガジェット」「ゲーム」「エンタメ」の中から最適なものを選んでください。
※imageには、Unsplashの高品質で内容に関連する画像のURL（実在する形式）を一つ設定してください。
6. 全体的に読み物として面白いトーンにしてください。`;

        console.log(`AIリクエスト送信中 (Gemini SDK)...`);
        const result = await model.generateContent(promptText);
        const text = result.response.text();
        
        if (text) {
            return text;
        } else {
            console.log("AIからのレスポンスが空です。");
            return null;
        }
    } catch (error) {
        console.error("SDK呼び出しエラー:", error.message);
        return null;
    }
}

module.exports = { createArticleMarkdown };
