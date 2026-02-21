import { memo, useState } from "react";
import type { Post } from "../../types/interface";

const PostCard = memo(({ post }: { post: Post }) => {
  const [bookmarked, setBookmarked] = useState(post.isBookmarked);

  return (
    <article className="bg-white">
      {/* 유저 정보 */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
        loading="lazy"
      />

      {/* 액션 바 */}
      <div className="flex items-center px-4 py-3">
        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              stroke="#9CA3AF" strokeWidth="1.8"
            />
            <circle cx="12" cy="9" r="2.5" stroke="#9CA3AF" strokeWidth="1.8" />
          </svg>
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-3 ml-3">
          <button className="text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v13"
                stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => setBookmarked((b) => !b)}
          className="ml-auto"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"
              fill={bookmarked ? "#5B5BD6" : "none"}
              stroke={bookmarked ? "#5B5BD6" : "#9CA3AF"}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 여행 내용 */}
      <div className="px-4 pb-5">
        {post.days.map((d) => (
          <div key={d.day}>
            <p className="text-sm font-bold text-gray-900 mb-2">
              {post.username}&nbsp;&nbsp;Day {d.day}: {d.title}
            </p>
            {d.events.map((ev, i) => (
              <div key={i} className="mb-2">
                <p className="text-sm text-gray-800">
                  {ev.time} | {ev.place}
                </p>
                {ev.tip && (
                  <p className="text-xs text-gray-500 mt-0.5 pl-2 border-l-2 border-gray-200">
                    • {ev.tip}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="h-2 bg-gray-100" />
    </article>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
