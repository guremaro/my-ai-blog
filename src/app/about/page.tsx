export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto py-12 px-4 bg-white">
      <header className="mb-16 border-b-8 border-slate-900 pb-12 text-center">
        <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-[1.2] tracking-tighter mb-8">
          「みんなの情報収集」へ<br /><span className="text-orange-600">ようこそ。</span>
        </h1>
        <p className="text-xl text-slate-900 font-bold leading-relaxed max-w-2xl mx-auto">
          世の中の「今」を、みんなの視点で見つめる。<br />
          そんな新しいスタイルの情報ブログです。
        </p>
      </header>

      <div className="space-y-20">
        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
            <span className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl shadow-sm">01</span>
            このブログについて
          </h2>
          <div className="text-lg text-slate-900 font-bold leading-[2] space-y-6">
            <p>
              「みんなの情報収集」は、IT、ガジェット、ゲーム、エンタメ、そして日々の暮らしを快適にするライフハックまで、
              幅広いジャンルの最新ニュースを独自の視点でまとめ上げているブログメディアです。
            </p>
            <p>
              単に情報を伝えるだけでなく、インターネット上の様々な反応や意見を「掲示板形式」で紹介することで、
              世論の温度感をダイレクトに感じられる読みやすさを追求しています。
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
            <span className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white text-xl shadow-sm">02</span>
            私たちが大切にしていること
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-200">
              <h3 className="text-xl font-black text-slate-900 mb-4">圧倒的な読みやすさ</h3>
              <p className="text-slate-700 font-bold leading-relaxed">
                高コントラストで無駄のないデザイン。忙しい合間でもパッと見て情報が頭に入る構成を心がけています。
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-200">
              <h3 className="text-xl font-black text-slate-900 mb-4">情報の網羅性</h3>
              <p className="text-slate-700 font-bold leading-relaxed">
                特定の分野に偏らず、今この瞬間に世界で、そして日本で何が起きているのかを幅広くキャッチします。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-orange-50 p-12 rounded-[3rem] border-4 border-orange-200">
          <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">運営への想い</h2>
          <p className="text-lg text-slate-900 font-bold leading-[2] text-center max-w-2xl mx-auto">
            情報が溢れる現代だからこそ、一歩引いて「みんなはどう思っているんだろう？」と立ち止まれる場所。
            そんな、親しみやすくも有意義な時間を過ごせる場を目指して、毎日更新しています。
          </p>
        </section>
      </div>

      <footer className="mt-32 text-center">
        <a href="/" className="inline-block px-12 py-5 bg-slate-900 text-white font-black rounded-full text-lg hover:bg-orange-600 transition-colors shadow-xl">
          トップページへ戻る
        </a>
      </footer>
    </article>
  );
}
