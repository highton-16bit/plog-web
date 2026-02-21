import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "../components/common/TabBar";
import { getDummySearch } from "../data/dummySearch";
import type { LocalSearchResult } from "../data/dummySearch";
import type { Post } from "../types/interface";

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY as string;
const KOREA_CENTER = { lat: 36.5, lng: 127.5 };

type SheetState = "closed" | "half" | "full";

const ResearchPage = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LocalSearchResult | null>(null);
  const [sheetState, setSheetState] = useState<SheetState>("closed");
  const [dragY, setDragY] = useState(0);
  const dragStartY = useRef<number | null>(null);
  const touchCurrentY = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 핸들바 스와이프
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    touchCurrentY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null) return;
    const y = e.touches[0].clientY;
    touchCurrentY.current = y;
    const delta = y - dragStartY.current;
    setDragY(delta > 0 ? delta : 0);
  };
  const handleTouchEnd = () => {
    if (dragStartY.current === null) return;
    const totalDelta = touchCurrentY.current - dragStartY.current;
    if (sheetState === "half") {
      if (totalDelta > 100) setSheetState("closed");
      else if (totalDelta < -60) setSheetState("full");
    } else if (sheetState === "full") {
      if (totalDelta > 100) setSheetState("closed");
    }
    setDragY(0);
    dragStartY.current = null;
  };

  // 스크롤 최상단에서 아래 드래그 → 닫기
  const handleScrollTouchStart = (e: React.TouchEvent) => {
    if (sheetState !== "full") return;
    if ((scrollRef.current?.scrollTop ?? 0) > 0) return;
    dragStartY.current = e.touches[0].clientY;
    touchCurrentY.current = e.touches[0].clientY;
  };
  const handleScrollTouchMove = (e: React.TouchEvent) => {
    if (sheetState !== "full" || dragStartY.current === null) return;
    if ((scrollRef.current?.scrollTop ?? 0) > 0) {
      dragStartY.current = null;
      setDragY(0);
      return;
    }
    const y = e.touches[0].clientY;
    touchCurrentY.current = y;
    const delta = y - dragStartY.current;
    setDragY(delta > 0 ? delta : 0);
  };
  const handleScrollTouchEnd = () => {
    if (sheetState !== "full" || dragStartY.current === null) return;
    const totalDelta = touchCurrentY.current - dragStartY.current;
    if (totalDelta > 80) setSheetState("closed");
    setDragY(0);
    dragStartY.current = null;
  };

  // 카카오맵 초기화
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return;
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(mapRef.current!, {
          center: new window.kakao.maps.LatLng(KOREA_CENTER.lat, KOREA_CENTER.lng),
          level: 13,
        });
        mapInstanceRef.current = map;
      });
    };
    if (window.kakao?.maps) { initMap(); return; }
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  const updateMarkers = (pins: { lat: number; lng: number }[]) => {
    if (!mapInstanceRef.current) return;
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = pins.map(
      (pin) =>
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(pin.lat, pin.lng),
          map: mapInstanceRef.current!,
        })
    );
    if (pins.length > 0 && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(
        new window.kakao.maps.LatLng(pins[0].lat, pins[0].lng)
      );
      mapInstanceRef.current.setLevel(7);
    }
  };

  const runSearch = (q: string) => {
    if (!q.trim()) return;
    setIsLoading(true);
    setSheetState("closed");
    setTimeout(() => {
      const found = getDummySearch(q);
      setResult(found);
      updateMarkers(found.mapPins);
      setSheetState("half");
      setIsLoading(false);
    }, 400);
  };

  const handleSearch = (e: { preventDefault(): void }) => {
    e.preventDefault();
    runSearch(query);
  };

  const getSheetTransform = () => {
    if (sheetState === "closed") return "translateY(100%)";
    if (dragY > 0) return `translateY(${dragY}px)`;
    return "translateY(0)";
  };

  return (
    <div className="relative w-full">
      {/* 검색바 */}
      <div className="fixed top-0 left-0 right-0 z-20 px-4 pt-4">
        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-plog border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                  stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색하기"
              className="flex-1 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
            />
            <button type="submit" className="p-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                  stroke="#5366FB" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* 지도 */}
      <div ref={mapRef} className="flex-1 w-full" />

      {/* 바텀시트 */}
      <div
        className={`absolute left-0 right-0 bottom-0 z-10 bg-white rounded-t-3xl shadow-2xl ${
          dragY === 0 ? "transition-all duration-300" : ""
        }`}
        style={{
          transform: getSheetTransform(),
          ...(sheetState === "full"
            ? { top: 0, maxHeight: "100%" }
            : { maxHeight: "60%" }),
        }}
      >
        {/* 핸들바 */}
        <div
          className="flex justify-center pt-3 pb-2 touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {result && (
          <>
            {/* 위치명 */}
            <div className="px-5 pb-3">
              <h2 className="text-xl font-bold text-gray-900">
                {result.locationName}
              </h2>
            </div>

            {/* 구분선 */}
            <div className="h-px bg-gray-100" />

            {/* 포스트 리스트 */}
            <div
              ref={scrollRef}
              className="overflow-y-auto scrollbar-hide"
              style={{
                maxHeight: sheetState === "full" ? "calc(100% - 80px)" : "calc(60vh - 80px)",
              }}
              onTouchStart={handleScrollTouchStart}
              onTouchMove={handleScrollTouchMove}
              onTouchEnd={handleScrollTouchEnd}
            >
              {result.posts.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">관련 게시글이 없습니다.</p>
              ) : (
                result.posts.map((post) => (
                  <PostListItem
                    key={post.id}
                    post={post}
                    onClick={() => navigate(`/post/${post.id}`)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* 탭바 */}
      <div className="relative z-20">
        <TabBar />
      </div>
    </div>
  );
};

const PostListItem = ({ post, onClick }: { post: Post; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-5 py-4 border-b border-gray-100 last:border-0 active:bg-gray-50 text-left"
  >
    {/* 아바타 */}
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="1.8" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>

    {/* 유저 정보 */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-gray-900 truncate">{post.username}</p>
      <p className="text-xs text-gray-400">{post.city}</p>
    </div>

    {/* 날짜 */}
    {post.startDate && post.endDate && (
      <p className="text-xs text-gray-400 shrink-0">
        {post.startDate} ~ {post.endDate}
      </p>
    )}
  </button>
);

export default ResearchPage;
