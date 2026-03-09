'use client';

import { useState } from 'react';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "情弱卒業マン",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      content: "この記事マジで助かる。ちょうど悩んでたんだよね。サンキューー！",
      date: "2024/03/09 10:20",
      likes: 12
    },
    {
      id: 2,
      user: "通りすがりの賢者",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
      content: "情報の鮮度が良すぎてビビるｗ スマホ買い換える決心がついたわ。",
      date: "2024/03/09 11:05",
      likes: 8
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      user: "ななしさん",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      content: newComment,
      date: new Date().toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      likes: 0
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="mt-20 pt-16 border-t border-slate-200">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Comments</h2>
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-black">
          {comments.length}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-16">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="コメントを入力してみるにゃ...🐾"
          className="w-full p-6 bg-slate-50 border-2 border-slate-200 rounded-3xl text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:border-orange-500 transition-colors min-h-[120px]"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-slate-900 text-white font-black rounded-full hover:bg-orange-600 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
          >
            ポストする
          </button>
        </div>
      </form>

      <div className="space-y-12">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-6 group">
            <div className="flex-shrink-0">
              <img src={comment.avatar} alt={comment.user} className="w-14 h-14 rounded-full border-2 border-slate-100 group-hover:border-orange-500 transition-colors" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-black text-slate-900">{comment.user}</span>
                <span className="text-[10px] font-bold text-slate-400">{comment.date}</span>
              </div>
              <p className="text-slate-700 font-bold leading-relaxed mb-4">
                {comment.content}
              </p>
              <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-orange-500 transition-colors">
                <span className="text-lg">♥</span> {comment.likes} いいね
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
