import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import PopularPosts from "@/components/PopularPosts";
import SearchBar from "@/components/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "みんなの情報収集 | 役立つトレンドを分かりやすく",
    template: "%s | みんなの情報収集"
  },
  description: "日常をちょっと便利にする最新のテックニュースやトレンド情報を、2ch風の反応と共に分かりやすくお届けします。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://my-ai-blog-ten.vercel.app/",
    siteName: "みんなの情報収集",
  },
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
          <a href="https://px.a8.net/svt/ejp?a8mat=4AZCG1+893BN6+2J9U+C0B9T" target="_blank" rel="noopener noreferrer" 
             className="w-full max-w-[160px] aspect-[1/4] bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-col items-center justify-between p-4 text-slate-400 hover:border-orange-500 transition-all duration-500 group">
            <span className="uppercase tracking-[0.3em] text-[9px] font-black opacity-50">Advertisement</span>
            <div className="w-full flex flex-col gap-6">
               <div className="relative w-full aspect-[1/1.5] rounded-xl overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=300&auto=format&fit=crop" 
                      alt="Tech Gadget" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                 <div className="absolute bottom-2 left-2 right-2 text-[10px] font-black text-white leading-tight">
                   驚異の性能。<br/>次世代AIツール
                 </div>
               </div>
               <div className="text-center">
                 <p className="text-[11px] font-black text-white mb-2 tracking-tight group-hover:text-orange-400">プロ級の仕上がりを、<br/>あなたの手に。</p>
                 <div className="inline-block px-3 py-1 bg-orange-500 text-white text-[9px] font-black rounded-full uppercase">Get it now</div>
               </div>
            </div>
            <span className="text-[9px] font-bold opacity-30">Sponsored Content</span>
          </a>
        </div>

        {/* Right Side Ad Space -> Popular Posts Ranking */}
        <div className="fixed right-0 top-0 hidden xl:flex h-screen w-[calc((100vw-1280px)/2)] flex-col items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-[240px]">
            <PopularPosts />
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
              <nav className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-slate-900 uppercase tracking-wide">
                <a href="/" className="hover:text-orange-600 transition-colors">ホーム</a>
                <a href="/category/it" className="hover:text-orange-600 transition-colors">IT・ニュース</a>
                <a href="/category/gadget" className="hover:text-orange-600 transition-colors">ガジェット</a>
                <a href="/category/game" className="hover:text-orange-600 transition-colors">ゲーム</a>
                <a href="/category/ent" className="hover:text-orange-600 transition-colors">エンタメ</a>
                <div className="ml-4 pl-8 border-l border-slate-200">
                  <SearchBar />
                </div>
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
