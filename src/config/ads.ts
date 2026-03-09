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
  postTop: `
    <div style="text-align:center; padding: 15px; border: 2px solid #ff9800; border-radius: 12px; background: #fff8e1; margin-bottom: 2rem;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #e65100;">＼ おすすめの注目案件 ／</p>
      <a href="https://px.a8.net/svt/ejp?a8mat=4AZCG1+893BN6+2J9U+C0B9T" rel="nofollow" style="color: #007bff; text-decoration: underline; font-weight: bold; font-size: 1.1rem;">
        詳細はこちらをクリックしてチェック！
      </a>
    </div>
  `,

  // 記事の末尾に表示する広告
  postBottom: `
    <div style="text-align:center; padding: 15px; border: 2px solid #2db4d3; border-radius: 12px; background: #f0faff; margin-top: 2rem;">
      <p style="margin: 0 0 10px 0; font-weight: bold; color: #1a73e8;">＼ メルカリでお得に買い物 ／</p>
      <a href="https://px.a8.net/svt/ejp?a8mat=4AZCG1+89OR8Y+5LNQ+5YJRM" rel="nofollow" style="color: #d32f2f; text-decoration: underline; font-weight: bold; font-size: 1.1rem;">
        メルカリの最新出品をチェック！
      </a>
      <img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=4AZCG1+89OR8Y+5LNQ+5YJRM" alt="">
    </div>
  `,

  // AIがアフィリエイトリンクを生成する際の「共通の指示」
  affiliateInstruction: `
    - 以下の3案件が特におすすめなので、記事の内容に関連付けて紹介してください。
      1. 注目案件: https://px.a8.net/svt/ejp?a8mat=4AZCG1+893BN6+2J9U+C0B9T
      2. メルカリ: https://px.a8.net/svt/ejp?a8mat=4AZCG1+89OR8Y+5LNQ+5YJRM
      3. 【新着】バナー案件: https://px.a8.net/svt/ejp?a8mat=4AZCG1+59BV5E+2UG2+C03K1
    - 掲示板のレス（2ch風）の中で「これええやん」「メルカリで探してみるわ」「これのバナーあったぞ」というノリで使い分けてください。
  `
};
