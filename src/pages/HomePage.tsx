import { useState, useMemo } from "react";
import type { Region } from "../types/interface";
import { DUMMY_POSTS } from "../data/dummy";
import PostCard from "../components/home/PostCard";
import TabBar from "../components/common/TabBar";

const REGIONS: Region[] = ["경기도", "강원도", "충청도", "경상도", "전라도", "제주도"];

const HomePage = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const filteredPosts = useMemo(
    () =>
      selectedRegion
        ? DUMMY_POSTS.filter((p) => p.region === selectedRegion)
        : DUMMY_POSTS,
    [selectedRegion]
  );

  return (
    <>
      {/* 헤더 */}
      <div className="app-header flex items-center justify-between px-4 pt-4 pb-3 bg-white">
        <img src="/Plog.svg" alt="Plog" className="h-8" />
        <button>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
              stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 카테고리 필터 + 피드 */}
      <div className="app-content flex flex-col">
        {/* 카테고리 필터 */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide bg-white border-b border-gray-100">
          {REGIONS.map((region) => {
            const active = selectedRegion === region;
            return (
              <button
                key={region}
                onClick={() => setSelectedRegion(active ? null : region)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                {region}
              </button>
            );
          })}
        </div>

        {/* 피드 */}
        <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
          {filteredPosts.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              해당 지역의 게시물이 없습니다.
            </div>
          ) : (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>

      {/* 바텀 네비 */}
      <div className="app-bottom-nav">
        <TabBar />
      </div>
    </>
  );
};

export default HomePage;
