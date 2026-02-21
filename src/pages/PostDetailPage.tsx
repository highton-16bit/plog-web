import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DUMMY_POSTS } from "../data/dummy";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = DUMMY_POSTS.find((p) => p.id === id);

  const [bookmarked, setBookmarked] = useState(post?.isBookmarked ?? false);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-y-auto scrollbar-hide">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 bg-white z-10 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7-7M5 12l7 7"
              stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-base font-semibold text-gray-900">탐색</h1>
        <div className="w-8" />
      </div>

      {/* 유저 정보 */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="1.8" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{post.username}</p>
          <p className="text-xs text-gray-400">{post.city}</p>
        </div>
      </div>

      {/* 이미지 */}
      <img
        src={post.imageUrl}
        alt={post.city}
        className="w-full aspect-[4/3] object-cover"
      />

      {/* 액션 바 */}
      <div className="flex items-center px-4 py-3">
        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              stroke="#6B7280" strokeWidth="1.8" />
            <circle cx="12" cy="9" r="2.5" stroke="#6B7280" strokeWidth="1.8" />
          </svg>
          <span>{post.likes}</span>
        </div>
        <button className="ml-3 text-gray-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v13"
              stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button onClick={() => setBookmarked((b) => !b)} className="ml-auto">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"
              fill={bookmarked ? "#5B5BD6" : "none"}
              stroke={bookmarked ? "#5B5BD6" : "#9CA3AF"}
              strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* 여행 내용 */}
      <div className="px-4 pb-8">
        {post.days.map((d) => (
          <div key={d.day} className="mb-4">
            <p className="text-sm font-bold text-gray-900 mb-2">
              {post.username}&nbsp;&nbsp;Day {d.day}: {d.title}
            </p>
            {d.events.map((ev, i) => (
              <div key={i} className="mb-3">
                <p className="text-sm text-gray-800">
                  {ev.time} | {ev.place}
                </p>
                {ev.tip && (
                  <p className="text-xs text-gray-500 mt-1 pl-2 border-l-2 border-gray-200 leading-relaxed">
                    • {ev.tip}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetailPage;
