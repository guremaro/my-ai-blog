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
    <article className="max-w-3xl mx-auto py-12 px-2 sm:px-4">
      <header className="mb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-[13px] font-black uppercase tracking-widest">
            {post.category}
          </span>
          <time className="text-sm font-bold text-slate-400">{post.date}</time>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-[1.3] mb-8">
          {post.title}
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
          {post.excerpt}
        </p>
      </header>

      <div className="prose prose-slate prose-lg sm:prose-xl max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-[1.8] prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-img:rounded-[2rem] prose-strong:text-slate-900">
        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-2xl sm:text-3xl font-black mt-16 mb-8 text-slate-900">{line.replace('## ', '')}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl sm:text-2xl font-black mt-12 mb-6 text-slate-900">{line.replace('### ', '')}</h3>;
          }
          if (line.trim() === '') return <div key={i} className="h-4" />;
          
          return <p key={i} className="mb-6">{line}</p>;
        })}
      </div>

      <footer className="mt-24 pt-12 border-t border-slate-100">
        <div className="bg-slate-50 p-10 rounded-[2.5rem] flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-6 text-xl">💡</div>
          <h4 className="text-base font-black text-slate-800 mb-3">この記事について</h4>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md">
            「みんなの情報収集」では、最新のトレンドを効率的に集約してお届けしています。
            日々の生活や仕事のヒントになれば幸いです。
          </p>
        </div>
      </footer>
    </article>
  );
}
