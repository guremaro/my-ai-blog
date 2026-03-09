import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  
  // マッピング用（URLフレンドリーな名前 -> 実際のカテゴリ名）
  const categoryMap: Record<string, string> = {
    'it': 'IT・ニュース',
    'gadget': 'ガジェット',
    'game': 'ゲーム',
    'ent': 'エンタメ'
  };

  return Object.keys(categoryMap).map((key) => ({
    category: key,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryKey } = await params;
  
  const categoryMap: Record<string, string> = {
    'it': 'IT・ニュース',
    'gadget': 'ガジェット',
    'game': 'ゲーム',
    'ent': 'エンタメ'
  };

  const categoryName = categoryMap[categoryKey];
  if (!categoryName) {
    notFound();
  }

  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter(post => post.category === categoryName);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="mb-16 border-b-8 border-slate-900 pb-12">
        <h1 className="text-5xl sm:text-7xl font-black text-slate-900 leading-tight tracking-tighter mb-4 uppercase">
          {categoryName}
        </h1>
        <p className="text-xl text-slate-500 font-bold">
          {filteredPosts.length}件の記事が見つかりました
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPosts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/posts/${post.slug}`}
            className="group block bg-white rounded-3xl overflow-hidden border-2 border-slate-100 hover:border-orange-500 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)]"
          >
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  {post.category}
                </span>
                <span className="text-[11px] font-bold text-slate-400">{post.date}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-snug mb-4 group-hover:text-orange-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
                {post.excerpt}
              </p>
              <div className="mt-8 flex items-center gap-2 text-orange-500 font-black text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-x--4 group-hover:translate-x-0">
                Read More <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-2xl font-black text-slate-300 italic">No posts found in this category yet.</p>
        </div>
      )}
    </div>
  );
}
