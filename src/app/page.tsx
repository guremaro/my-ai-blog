import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-20">
      <section className="text-center space-y-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black tracking-tight sm:text-7xl text-slate-900 leading-[1.1]">
          毎日の暮らしを<br />
          <span className="text-orange-500">もっと楽しく、便利に。</span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed font-medium">
          「みんなの情報収集」は、今知っておきたいITニュースや<br className="hidden sm:block" />
          生活に役立つヒントを、どこよりも分かりやすくお届けするブログメディアです。
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-black text-slate-900 relative inline-block">
            新着のトピックス
            <span className="absolute -bottom-2 left-0 w-12 h-1.5 bg-orange-400 rounded-full"></span>
          </h2>
        </div>
        
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              <Link href={`/posts/${post.slug}`} className="block overflow-hidden rounded-3xl bg-slate-100 aspect-[16/10] mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                {/* 画像がない場合のプレースホルダー */}
                <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-lg bg-gradient-to-br from-slate-50 to-slate-100 uppercase tracking-widest">
                  {post.category}
                </div>
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <time className="text-xs font-bold text-slate-400">{post.date}</time>
              </div>
              <h3 className="text-xl font-black mb-3 leading-snug group-hover:text-orange-500 transition-colors">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
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
