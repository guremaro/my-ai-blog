/**
 * 広告・アフィリエイトの設定
 * 
 * 以下の箇所に、取得した広告タグ（HTML形式）を貼り付けてください。
 * タグがない場合は空のままでOKです。
 */
export const adConfig = {
  // Google AdSense などの自動広告スクリプト用（通常は <script> タグ）
  autoAdsTag: ``,

  // 記事の冒頭に表示する広告
  postTop: `<div style="text-align:center; padding: 20px; background: #f9f9f9; border: 1px dashed #ccc;">【ここに広告が表示されます】</div>`,

  // 記事の末尾に表示する広告
  postBottom: `<div style="text-align:center; padding: 20px; background: #f9f9f9; border: 1px dashed #ccc;">【ここに広告が表示されます】</div>`,

  // AIがアフィリエイトリンクを生成する際の「共通の指示」
  affiliateInstruction: `
    - 記事のトピックに関連するAmazon商品がある場合、おすすめとしてリンクを1つ紹介してください。
    - 特にない場合は無理にリンクを貼らなくてOKです。
  `
};
