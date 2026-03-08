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
    <article className="max-w-3xl mx-auto py-12 px-4 shadow-sm bg-white rounded-3xl border border-slate-100 mt-8 mb-20 overflow-hidden">
      <header className="mb-12 border-b border-slate-100 pb-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <time className="text-sm text-slate-400">{post.date}</time>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-6">
          {post.title}
        </h1>
        <p className="text-xl text-slate-500 italic leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      <div className="prose prose-slate lg:prose-xl max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-2xl">
        {/* 本来は markdown-it や remark などを使うべきだが、
            今回は簡易的に改行と見出しを処理する表示を行う */}
        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-bold mt-12 mb-6 text-slate-900">{line.replace('## ', '')}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={i} className="text-xl font-bold mt-8 mb-4 text-slate-900">{line.replace('### ', '')}</h3>;
          }
          if (line.trim() === '') return <br key={i} />;
          
          return <p key={i} className="text-slate-700 leading-relaxed mb-4">{line}</p>;
        })}
      </div>

      <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
        <div className="bg-slate-50 p-8 rounded-2xl inline-block w-full max-w-lg">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">生成について</h4>
          <p className="text-slate-600 text-sm">
            本記事は、最新のテクノロジートレンドを元にAIによって自動生成されました。
            正確な情報提供に努めていますが、詳細については出典元をご確認ください。
          </p>
        </div>
      </footer>
    </article>
  );
}
