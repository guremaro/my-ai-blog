import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 bg-white">
      <header className="mb-16 border-b-8 border-slate-900 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="px-4 py-1 rounded-sm bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em]">
            {post.category}
          </span>
          <time className="text-sm font-black text-slate-900 underline decoration-orange-500 decoration-4 underline-offset-4">{post.date}</time>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-[1.2] tracking-tighter mb-8">
          {post.title}
        </h1>
        <p className="text-xl text-slate-900 font-bold leading-relaxed border-l-8 border-orange-500 pl-6 py-2">
          {post.excerpt}
        </p>
      </header>

      <div className="space-y-4">
        {post.content.split('\n').map((line, i) => {
          // 2ch風の行 (例 "1: 名前：名無しさん...") を検出
          const isThreadComment = /^\d+: 名前：/.test(line);

          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-2xl sm:text-4xl font-black mt-20 mb-10 text-slate-900 border-b-2 border-slate-200 pb-2">{line.replace('## ', '')}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl sm:text-2xl font-black mt-12 mb-6 text-slate-900 underline decoration-slate-300 decoration-4 underline-offset-8">{line.replace('### ', '')}</h3>;
          }
          
          if (isThreadComment) {
            const [header, ...bodyParts] = line.split('\n');
            return (
              <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-xl hover:border-orange-400 transition-colors shadow-sm mb-6">
                <div className="text-xs font-black text-slate-500 mb-2 font-mono flex gap-3 flex-wrap">
                  {line.match(/^\d+:/)?.[0] && <span className="text-orange-600 underline">{" >> "}{line.match(/^\d+:/)?.[0].replace(':', '')}</span>}
                  <span>{line.split('  ')[0].replace(/^\d+: /, '')}</span>
                  <span>{line.split('  ')[1]}</span>
                  <span>{line.split('  ')[2]}</span>
                </div>
                <div className="text-slate-900 text-lg font-bold leading-relaxed whitespace-pre-wrap">
                  {line.split('\n').slice(1).join('\n') || line.split('  ').slice(3).join('  ')}
                </div>
              </div>
            );
          }

          if (line.trim() === '') return null;
          
          return <p key={i} className="text-slate-900 text-lg font-bold leading-[1.8] mb-8">{line}</p>;
        })}
      </div>

      <footer className="mt-32 pt-16 border-t-8 border-slate-100">
        <div className="bg-slate-900 p-12 rounded-[3rem] text-white">
          <h4 className="text-xl font-black mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm italic">i</span>
            みんなの反応まとめ
          </h4>
          <p className="text-slate-400 text-sm font-bold leading-relaxed max-w-2xl">
            このページはインターネット上の様々な意見を参考に、独自の視点でまとめたものです。
            最新のトレンドを皆さんと一緒に追いかけていければ幸いです。
          </p>
        </div>
      </footer>
    </article>
  );
}
