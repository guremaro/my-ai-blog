const fs = require('fs');
const path = require('path');

function saveMarkdown(content) {
    // Frontmatterからタイトルを取得してファイル名にする（簡易的）
    const titleMatch = content.match(/title: "(.*)"/);
    const title = titleMatch ? titleMatch[1] : `post-${Date.now()}`;
    
    // ファイル名として使えるように変換
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 50);

    const fileName = `${slug}.md`;
    const filePath = path.join(__dirname, '../src/content/posts', fileName);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`記事を保存しました: ${filePath}`);
    return filePath;
}

module.exports = { saveMarkdown };
