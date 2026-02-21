import { useState } from "react";
import TabBar from "../components/common/TabBar";
import { usePosts } from "../context/PostsContext";
import { DUMMY_POSTS } from "../data/dummy";

const MY_PHOTOS = [
  "https://picsum.photos/seed/gangneung/400/400",
  "https://picsum.photos/seed/jeju/400/400",
  "https://picsum.photos/seed/yeosu/400/400",
  "https://picsum.photos/seed/gyeongju/400/400",
  "https://picsum.photos/seed/busan1/400/400",
  "https://picsum.photos/seed/sokcho/400/400",
  "https://picsum.photos/seed/jeonju/400/400",
  "https://picsum.photos/seed/danyang/400/400",
  "https://picsum.photos/seed/namhae/400/400",
  "https://picsum.photos/seed/gapyeong/400/400",
  "https://picsum.photos/seed/seoraksan/400/400",
  "https://picsum.photos/seed/andong/400/400",
];

type Tab = "grid" | "liked" | "saved";

const GridIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect
      x="3" y="3" width="7" height="7" rx="1"
      fill={active ? "#111" : "none"}
      stroke={active ? "#111" : "#9CA3AF"}
      strokeWidth="1.8"
    />
    <rect
      x="14" y="3" width="7" height="7" rx="1"
      fill={active ? "#111" : "none"}
      stroke={active ? "#111" : "#9CA3AF"}
      strokeWidth="1.8"
    />
    <rect
      x="3" y="14" width="7" height="7" rx="1"
      fill={active ? "#111" : "none"}
      stroke={active ? "#111" : "#9CA3AF"}
      strokeWidth="1.8"
    />
    <rect
      x="14" y="14" width="7" height="7" rx="1"
      fill={active ? "#111" : "none"}
      stroke={active ? "#111" : "#9CA3AF"}
      strokeWidth="1.8"
    />
  </svg>
);

const MarkerIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      fill={active ? "#111" : "none"}
      stroke={active ? "#111" : "#9CA3AF"}
      strokeWidth="1.8"
    />
    <circle
      cx="12" cy="9" r="2.5"
      fill={active ? "white" : "none"}
      stroke={active ? "white" : "#9CA3AF"}
      strokeWidth="1.8"
    />
  </svg>
);

const BookmarkIcon = ({ active }: { active: boolean }) => (
  <svg width="20" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"
      fill={active ? "#111" : "none"}
      stroke={active ? "#111" : "#9CA3AF"}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#D1D5DB" strokeWidth="1.5" />
      <path d="M8 12h8M12 8v8" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <p className="text-sm">{message}</p>
  </div>
);

const ProfilePage = () => {
  const [tab, setTab] = useState<Tab>("grid");
  const { likes, bookmarks } = usePosts();

  const likedPosts = DUMMY_POSTS.filter((p) => likes.has(p.id));
  const savedPosts = DUMMY_POSTS.filter((p) => bookmarks.has(p.id));

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 pt-14 pb-3">
        <div className="w-8" />
        <span className="text-sm font-semibold text-gray-900">gangmin_0716</span>
        <button className="w-8 flex justify-end">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="#111"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* 프로필 정보 */}
      <div className="flex items-center gap-5 px-5 pb-5">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="1.5" />
            <path
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">장강민</p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-2 px-4 pb-5">
        <button className="flex-1 py-2 rounded-xl bg-gray-100 text-sm font-semibold text-gray-800 active:bg-gray-200 transition-colors">
          프로필 편집
        </button>
        <button className="flex-1 py-2 rounded-xl bg-gray-100 text-sm font-semibold text-gray-800 active:bg-gray-200 transition-colors">
          프로필 공유
        </button>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-gray-200">
        {(["grid", "liked", "saved"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex justify-center py-3 transition-colors ${
              tab === t ? "border-b-2 border-gray-900" : ""
            }`}
          >
            {t === "grid" && <GridIcon active={tab === "grid"} />}
            {t === "liked" && <MarkerIcon active={tab === "liked"} />}
            {t === "saved" && <BookmarkIcon active={tab === "saved"} />}
          </button>
        ))}
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {tab === "grid" && (
          <div className="grid grid-cols-3 gap-0.5">
            {MY_PHOTOS.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="aspect-square object-cover w-full"
                loading="lazy"
              />
            ))}
          </div>
        )}

        {tab === "liked" &&
          (likedPosts.length === 0 ? (
            <EmptyState message="좋아요한 게시물이 없습니다." />
          ) : (
            <div className="grid grid-cols-3 gap-0.5">
              {likedPosts.map((p) => (
                <img
                  key={p.id}
                  src={p.imageUrl}
                  alt={p.city}
                  className="aspect-square object-cover w-full"
                  loading="lazy"
                />
              ))}
            </div>
          ))}

        {tab === "saved" &&
          (savedPosts.length === 0 ? (
            <EmptyState message="저장한 게시물이 없습니다." />
          ) : (
            <div className="grid grid-cols-3 gap-0.5">
              {savedPosts.map((p) => (
                <img
                  key={p.id}
                  src={p.imageUrl}
                  alt={p.city}
                  className="aspect-square object-cover w-full"
                  loading="lazy"
                />
              ))}
            </div>
          ))}
      </div>

      <TabBar />
    </div>
  );
};

export default ProfilePage;
