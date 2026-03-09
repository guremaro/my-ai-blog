import Link from 'next/link';
import { getAllPosts, Post } from '@/lib/posts';

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
}

export default function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const allPosts = getAllPosts();
  
  // 同じカテゴリの記事を抽出し、現在の記事を除外
  const related = allPosts
    .filter(post => post.category === category && post.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t-4 border-slate-900">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xl">✨</div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">あわせて読みたい</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border-2 border-slate-100 shadow-md group-hover:shadow-lg transition-all group-hover:-translate-y-1">
              <img 
                src={post.image || `https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=400&auto=format&fit=crop`} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </div>
            <h3 className="font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
