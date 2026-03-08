import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Trend Insights | 最新AIツール・ニュースを自動配信",
  description: "最新のAIツール、ニュース、テクノロジーのトレンドをAIが自動で収集・分析して配信する次世代ブログメディア。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
              <span className="text-xl font-bold tracking-tight">AI Trend Insights</span>
            </div>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <a href="/" className="hover:text-blue-600 transition-colors">ホーム</a>
              <a href="/about" className="hover:text-blue-600 transition-colors">アバウト</a>
              <a href="/category/ai" className="hover:text-blue-600 transition-colors">AI & 機械学習</a>
              <a href="/category/gadget" className="hover:text-blue-600 transition-colors">ガジェット</a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto min-h-[calc(100vh-4rem)] px-4 py-8">
          {children}
        </main>
        <footer className="border-t bg-white py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-slate-500">© 2026 AI Trend Insights. Powered by AI Automation.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
