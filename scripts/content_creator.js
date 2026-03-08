const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function createArticleMarkdown(newsItem) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
以下のニュース情報を元に、読者の興味を引くブログ記事を日本語で執筆してください。
出力は「Markdown形式」で、冒頭にFrontmatter（メタデータ）を含めてください。

【ニュースタイトル】: ${newsItem.title}
【リンク】: ${newsItem.link}
【概要】: ${newsItem.contentSnippet}

【執筆ルール】:
1. 構成: 導入、内容解説、今後の展望、まとめ。
2. 口調: 親しみやすく、かつ専門性のあるWebメディア風。
3. SEO: タイトルには「${newsItem.title}」と「AI」や「自動化」など関連性の高いキーワードを含めてください。
4. Markdown形式で出力し、以下のFrontmatterを必ず含めてください。
   ---
   title: "生成された記事タイトル"
   date: "YYYY-MM-DD" (本日の日付)
   excerpt: "記事の短い要約（100文字程度）"
   category: "ニュース" または "ガジェット" または "AI"
   ---
5. 記事の最後に関連リンクとして元のURLを含めてください。
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
