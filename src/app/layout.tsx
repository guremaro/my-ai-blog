import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "みんなの情報収集 | 役立つトレンドを分かりやすく",
  description: "日常をちょっと便利にする最新のテックニュースやトレンド情報を、分かりやすくお届けします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Script
          src="//statics.a8.net/a8link/a8linkmgr.js"
          strategy="beforeInteractive"
        />
        <Script id="a8-init">
          {`
            a8linkmgr({
              "config_id": "2WnlLV4R9CD0I2MRD2oG"
            });
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-slate-900 text-slate-900 min-h-screen flex flex-col`}>
        {/* Left Side Ad Space */}
        <div className="fixed left-0 top-0 hidden xl:flex h-screen w-[calc((100vw-1280px)/2)] flex-col items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-[160px] aspect-[1/4] bg-slate-800/50 rounded-lg border border-slate-700 flex flex-col items-center justify-between p-4 text-slate-500 uppercase tracking-widest text-[10px] font-bold">
            <span>A D V EＲT I S E M E N T</span>
            <div className="w-full flex flex-col gap-4">
               {/* Placeholder for vertical ad */}
               <div className="w-full aspect-[1/2] bg-slate-700/30 rounded flex items-center justify-center text-center px-2">トピックに関連した<br/>お得な情報</div>
               <div className="w-full aspect-[1/2] bg-slate-700/30 rounded flex items-center justify-center text-center px-2">今すぐ<br/>チェック！</div>
            </div>
            <span>S P O N S O R E D</span>
          </div>
        </div>

        {/* Right Side Ad Space */}
        <div className="fixed right-0 top-0 hidden xl:flex h-screen w-[calc((100vw-1280px)/2)] flex-col items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-[160px] aspect-[1/4] bg-slate-800/50 rounded-lg border border-slate-700 flex flex-col items-center justify-between p-4 text-slate-500 uppercase tracking-widest text-[10px] font-bold">
            <span>A D V EＲT I S E M E N T</span>
            <div className="w-full flex flex-col gap-4">
               {/* Placeholder for vertical ad */}
               <div className="w-full aspect-[1/2] bg-slate-700/30 rounded flex items-center justify-center text-center px-2">限定セール<br/>実施中</div>
               <div className="w-full aspect-[1/2] bg-slate-700/30 rounded flex items-center justify-center text-center px-2">メルカリで<br/>探す</div>
            </div>
            <span>S P O N S O R E D</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.3)] flex-grow">
          <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <a href="/" className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-sm font-sans">み</div>
                  <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">みんなの情報収集</span>
                </a>
              </div>
              <nav className="hidden lg:flex gap-8 text-[15px] font-bold text-slate-900 uppercase tracking-wide">
                <a href="/" className="hover:text-orange-600 transition-colors">ホーム</a>
                <a href="/category/it" className="hover:text-orange-600 transition-colors">IT・ニュース</a>
                <a href="/category/gadget" className="hover:text-orange-600 transition-colors">ガジェット</a>
                <a href="/category/game" className="hover:text-orange-600 transition-colors">ゲーム</a>
                <a href="/category/ent" className="hover:text-orange-600 transition-colors">エンタメ</a>
              </nav>
            </div>
          </header>
          <main className="min-h-[calc(100vh-5rem)] px-6 py-12">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-slate-50 py-16">
            <div className="container mx-auto px-6 text-center">
              <p className="font-extrabold text-slate-900 mb-2 text-xl tracking-tight">みんなの情報収集</p>
              <p className="text-sm font-bold text-slate-500">© 2026 Everyone's Information Gathering. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
