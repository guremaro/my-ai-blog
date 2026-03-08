const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function createArticleMarkdown(newsItem) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
以下のニュース情報を元に、読者の興味を引くブログ記事を日本語で執筆してください。
サイト名は「みんなの情報収集」です。親しみやすく、明るい、人間味のあるトーンで執筆してください。

【ニュースタイトル】: ${newsItem.title}
【リンク】: ${newsItem.link}
【概要】: ${newsItem.contentSnippet}

【執筆ルール】:
1. 構成: 導入、内容のポイント解説、日常での活用法、まとめ。
2. 口調: 「〜ですね」「〜してみませんか？」といった、読者に語りかけるような温かいトーン。
3. AI感の排除: 「AIが生成しました」「機械学習により」といった表現は避け、一人のライターがおすすめ情報を紹介している雰囲気を出してください。
4. Markdown形式で出力し、以下のFrontmatterを必ず含めてください。
   ---
   title: "読者が読みたくなるキャッチーなタイトル"
   date: "YYYY-MM-DD" (本日の日付)
   excerpt: "記事の短い要約（100文字程度）"
   category: "IT・ニュース" または "ライフハック" または "ガジェット"
   ---
5. 記事の途中や最後に、適宜「！」や「✨」などの絵文字を使って明るい雰囲気を出してください。
6. 出典元として元のリンクを自然な形で含めてください。
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
