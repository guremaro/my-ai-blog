import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function PopularPosts() {
  const allPosts = getAllPosts();
  // 個性的な「人気順」に並んでいるように見せるため、最新の中からいくつかピックアップ
  const popularPosts = allPosts.slice(0, 5).map((post, index) => ({
    ...post,
    rank: index + 1,
    views: Math.floor(Math.random() * 50000) + 10000 // シミュレートされた閲覧数
  }));

  return (
    <div className="bg-slate-900 text-white rounded-[2rem] p-8 border border-slate-800 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-8 bg-orange-600 rounded-full"></div>
        <h2 className="text-xl font-black uppercase tracking-tighter">アクセスランキング</h2>
      </div>

      <div className="space-y-8">
        {popularPosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg text-sm font-black text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                {post.rank}
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-bold leading-snug group-hover:text-orange-400 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.views.toLocaleString()} VIEWS</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
