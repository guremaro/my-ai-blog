import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} bg-white text-slate-900`}>
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto flex h-20 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">み</div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">みんなの情報収集</span>
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
        <main className="container mx-auto min-h-[calc(100vh-5rem)] px-6 py-12 bg-white">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-slate-50 py-16">
          <div className="container mx-auto px-6 text-center">
            <p className="font-extrabold text-slate-900 mb-2 text-xl tracking-tight">みんなの情報収集</p>
            <p className="text-sm font-bold text-slate-500">© 2026 Everyone's Information Gathering. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
