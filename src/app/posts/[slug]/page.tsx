import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { AdSlot } from "@/components/AdSlot";

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
    <article className="max-w-5xl mx-auto py-12 px-4 bg-white grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
      <div className="min-w-0">
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

        <AdSlot position="postTop" />
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
            const [header] = line.split('\n');
            const parts = header.split('  ');
            const id = parts[0]?.split(': ')[1] || '';
            const name = parts[1] || '名無しさん';
            const date = parts[2] || '';
            const body = line.split('  ').slice(3).join('  ') || line.split('\n').slice(1).join('\n');

            // IDから色を生成する簡易的な関数
            const getColorFromId = (str: string) => {
              const colors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-pink-600', 'text-cyan-600'];
              if (!str) return colors[0];
              const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
              return colors[hash % colors.length];
            };

            const idColor = getColorFromId(id);
            const badgeClass = idColor + " bg-slate-100 px-2 py-0.5 rounded text-[11px]";

            return (
              <div key={i} className="group relative bg-[#f8f9fa] border-l-4 border-slate-200 p-6 mb-4 hover:border-orange-500 hover:bg-white transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-r-lg">
                <div className="text-[13px] font-bold text-slate-400 mb-3 font-mono flex gap-4 items-center border-b border-slate-100 pb-2">
                  <span className="text-orange-600 font-black">
                    {line.match(/^\d+:/)?.[0]?.replace(':', '')}
                  </span>
                  <span className="text-slate-700">{name}</span>
                  <span>{date}</span>
                  <span className={badgeClass}>ID:{id || '???' }</span>
                </div>
                <div className="text-slate-800 text-[17px] font-medium leading-relaxed whitespace-pre-wrap break-words">
                  {body}
                </div>
                
                {/* 装飾用のアセット */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-slate-200 font-black text-4xl italic select-none">"</span>
                </div>
              </div>
            );
          }

          if (line.trim() === '') return null;
          
          return <p key={i} className="text-slate-900 text-lg font-bold leading-[1.8] mb-8">{line}</p>;
        })}
      </div>

      <AdSlot position="postBottom" />

      </div>

      {/* サイドバー: おすすめ案件 */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-8">
          <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-xl font-black mb-6 relative z-10 flex items-center gap-2">
              <span className="w-2 h-6 bg-orange-500 rounded-full inline-block"></span>
              今注目の案件
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="border-b border-slate-800 pb-4">
                <p className="text-xs font-bold text-slate-400 mb-2">PICK UP</p>
                <a href="https://px.a8.net/svt/ejp?a8mat=4AZCG1+893BN6+2J9U+C0B9T" className="text-orange-400 font-bold hover:underline truncate block">
                  詳細はこちらをチェック
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-2">SHOPPING</p>
                <a href="https://px.a8.net/svt/ejp?a8mat=4AZCG1+89OR8Y+5LNQ+5YJRM" className="text-white font-bold hover:text-orange-400 transition-colors block">
                  メルカリでお得に探す
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800">
               <div className="h-12 w-full bg-slate-800 rounded-xl animate-pulse flex items-center justify-center text-[10px] text-slate-500 font-bold tracking-widest">
                  ADVERTISEMENT
               </div>
            </div>
          </div>
          
          <div className="p-8 border-2 border-slate-100 rounded-3xl">
            <h3 className="font-black text-slate-900 mb-4">最新の話題</h3>
            <ul className="space-y-4">
               <li className="flex gap-3 text-sm">
                  <span className="text-orange-500 font-black">#</span>
                  <span className="font-bold text-slate-600 hover:text-slate-900 cursor-pointer">AIトレンド</span>
               </li>
               <li className="flex gap-3 text-sm">
                  <span className="text-orange-500 font-black">#</span>
                  <span className="font-bold text-slate-600 hover:text-slate-900 cursor-pointer">ライフハック</span>
               </li>
            </ul>
          </div>
        </div>
      </aside>
    </article>
  );
}
