import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-20">
      <section className="text-center space-y-8 py-16 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black tracking-tighter sm:text-8xl text-slate-900 leading-[1] mb-4">
          みんなの<br />
          <span className="text-orange-600">情報収集。</span>
        </h1>
        <p className="text-xl text-slate-900 leading-relaxed font-bold max-w-2xl mx-auto">
          「今」話題のニュースから、ゲーム・エンタメ・ITまで。<br className="hidden sm:block" />
          世の中の反応をまとめてチェックできる総合ブログメディアです。
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-16 border-b-4 border-slate-900 pb-4">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            最新の話題
          </h2>
          <span className="text-sm font-black text-slate-500 uppercase tracking-widest">New Topics</span>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              <Link href={`/posts/${post.slug}`} className="block overflow-hidden rounded-[2rem] bg-slate-100 aspect-[16/10] mb-8 shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-500 relative">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200 font-black text-3xl bg-white uppercase tracking-tighter italic">
                    {post.category}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
                <time className="text-xs font-black text-slate-900">{post.date}</time>
              </div>
              <h3 className="text-2xl font-black mb-4 leading-tight text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="text-slate-900 text-[16px] leading-relaxed font-medium line-clamp-3">
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
