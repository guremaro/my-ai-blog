import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900">
          AIが届ける、<span className="text-blue-600">未来のトレンド</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          24時間365日、AIが世界中のテック・AIニュースを自動収集し、
          あなたに代わって分析、執筆、配信します。
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">最新の記事</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                    {post.category}
                  </span>
                  <time className="text-sm text-slate-400">{post.date}</time>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 italic text-sm text-slate-400">
                  Written by AI Assistant
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-400">まだ記事がありません。自動生成を開始してください。</p>
          </div>
        )}
      </section>
    </div>
  );
}
