import { useState, useRef, useCallback } from "react";
import TabBar from "../components/common/TabBar";

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  completed: boolean;
}

type DaySchedules = Record<string, ScheduleItem[]>;

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const HOURS = Array.from({ length: 24 }, (_, i) => {
  const label =
    i === 0
      ? "오전 0시"
      : i < 12
        ? `오전 ${i}시`
        : i === 12
          ? "오후 12시"
          : `오후 ${i - 12}시`;
  return { label, time: `${String(i).padStart(2, "0")}:00` };
});

const formatKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const SchedulePage = () => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [timelineDate, setTimelineDate] = useState<Date | null>(null);
  const [schedules, setSchedules] = useState<DaySchedules>({});
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [addingAt, setAddingAt] = useState<string | null>(null);
  const [inputVal, setInputVal] = useState("");

  const [swipeDy, setSwipeDy] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);
  const swipeStartY = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ show: true, msg });
    toastTimer.current = setTimeout(
      () => setToast({ show: false, msg: "" }),
      2500
    );
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const handleDateSelect = (date: Date) => {
    if (!rangeStart || rangeEnd) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    }
  };

  const onPointerDown = (date: Date) => {
    didLongPress.current = false;
    pressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      setTimelineDate(date);
    }, 500);
  };

  const onPointerUp = (date: Date) => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (!didLongPress.current) {
      handleDateSelect(date);
    }
  };

  const onPointerLeave = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const closeTimeline = () => {
    setTimelineDate(null);
    setAddingAt(null);
    setInputVal("");
    setSwipeDy(0);
    setIsSnapping(false);
  };

  const onHandlePointerDown = (e: React.PointerEvent) => {
    swipeStartY.current = e.clientY;
    setIsSnapping(false);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onHandlePointerMove = (e: React.PointerEvent) => {
    if (swipeStartY.current === null) return;
    const dy = e.clientY - swipeStartY.current;
    if (dy > 0) setSwipeDy(dy);
  };

  const onHandlePointerUp = () => {
    swipeStartY.current = null;
    if (swipeDy > 80) {
      setIsSnapping(true);
      setSwipeDy(800);
      setTimeout(closeTimeline, 300);
    } else {
      setIsSnapping(true);
      setSwipeDy(0);
    }
  };

  const toggleItem = (dateKey: string, itemId: string) => {
    setSchedules((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    }));
    showToast("완료되었습니다!");
  };

  const addItem = (dateKey: string, time: string) => {
    if (!inputVal.trim()) return;
    const item: ScheduleItem = {
      id: `${dateKey}-${time}-${Date.now()}`,
      time,
      title: inputVal.trim(),
      completed: false,
    };
    setSchedules((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), item].sort((a, b) =>
        a.time.localeCompare(b.time)
      ),
    }));
    setInputVal("");
    setAddingAt(null);
  };

  const tlKey = timelineDate ? formatKey(timelineDate) : "";
  const tlItems = tlKey ? schedules[tlKey] || [] : [];

  return (
    <>
      {/* 헤더 */}
      <div className="app-header flex items-center justify-between px-4 pt-14 pb-0">
        <div className="flex items-center gap-1">
          <button
            className="p-1"
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="#5B5BD6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-sm font-semibold text-plog">{year}년</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7.5" stroke="#5B5BD6" strokeWidth="1.8" />
              <path
                d="m20 20-3.5-3.5"
                stroke="#5B5BD6"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="p-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="#5B5BD6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="app-content overflow-y-auto">
      {/* 월 */}
      <div className="px-4 pt-1 pb-3">
        <span className="text-4xl font-black text-gray-900">{month + 1}월</span>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 px-3">
        {DAYS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-medium py-1 ${
              i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 달력 그리드 */}
      <div className="grid grid-cols-7 px-3 flex-1">
        {cells.map((date, idx) => {
          if (!date) return <div key={`e-${idx}`} />;

          const key = formatKey(date);
          const isStart = !!(rangeStart && sameDay(date, rangeStart));
          const isEnd = !!(rangeEnd && sameDay(date, rangeEnd));
          const inRange = !!(
            rangeStart &&
            rangeEnd &&
            date > rangeStart &&
            date < rangeEnd
          );
          const isToday = sameDay(date, today);
          const hasItems = (schedules[key]?.length ?? 0) > 0;
          const dow = date.getDay();

          return (
            <div
              key={key}
              className={`relative flex items-center justify-center py-2.5 cursor-pointer select-none
                ${inRange ? "bg-blue-50" : ""}
                ${isStart && rangeEnd ? "bg-blue-50 rounded-l-full" : ""}
                ${isEnd ? "bg-blue-50 rounded-r-full" : ""}
              `}
              onPointerDown={() => onPointerDown(date)}
              onPointerUp={() => onPointerUp(date)}
              onPointerLeave={onPointerLeave}
            >
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                  ${isStart || isEnd ? "bg-plog text-white" : ""}
                  ${isToday && !isStart && !isEnd ? "font-bold" : ""}
                  ${
                    !isStart && !isEnd
                      ? dow === 0
                        ? "text-red-500"
                        : dow === 6
                          ? "text-blue-500"
                          : "text-gray-800"
                      : ""
                  }
                `}
              >
                {date.getDate()}
              </div>
              {isToday && !isStart && !isEnd && (
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-500" />
              )}
              {hasItems && (
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-plog" />
              )}
            </div>
          );
        })}
      </div>

      {/* 여행 기간 표시 */}
      {rangeStart && rangeEnd && (
        <div className="mx-4 mb-2 px-4 py-3 bg-blue-50 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 bg-plog rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 font-medium">여행 기간</p>
            <p className="text-sm font-bold text-gray-900">
              {rangeStart.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}
              {" — "}
              {rangeEnd.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}
            </p>
          </div>
          <button
            className="p-1"
            onClick={() => {
              setRangeStart(null);
              setRangeEnd(null);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="app-bottom-nav">
        <TabBar />
      </div>
      </div>
      {timelineDate && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => {
              setTimelineDate(null);
              setAddingAt(null);
              setInputVal("");
            }}
          />
          <div
            className="relative w-full bg-white rounded-t-3xl overflow-hidden"
            style={{
              maxHeight: "72vh",
              transform: `translateY(${swipeDy}px)`,
              transition: isSnapping ? "transform 0.3s cubic-bezier(0.4,0,0.2,1)" : "none",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 핸들바 - 스와이프 다운 영역 */}
            <div
              className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing touch-none"
              onPointerDown={onHandlePointerDown}
              onPointerMove={onHandlePointerMove}
              onPointerUp={onHandlePointerUp}
            >
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* 날짜 헤더 - 스와이프 다운 영역 */}
            <div
              className="px-5 py-3 border-b border-gray-100 cursor-grab active:cursor-grabbing touch-none"
              onPointerDown={onHandlePointerDown}
              onPointerMove={onHandlePointerMove}
              onPointerUp={onHandlePointerUp}
            >
              <p className="text-base font-bold text-gray-900">
                {timelineDate.toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </p>
            </div>

            {/* 타임라인 */}
            <div className="overflow-y-auto scrollbar-hide" style={{ maxHeight: "58vh" }}>
              {HOURS.map(({ label, time }) => {
                const items = tlItems.filter((i) => i.time === time);
                const addKey = `${tlKey}-${time}`;
                const isAdding = addingAt === addKey;

                return (
                  <div key={time} className="flex gap-3 px-5 py-2.5 border-b border-gray-50">
                    <span className="text-xs text-gray-400 w-16 pt-0.5 flex-shrink-0 leading-5">
                      {label}
                    </span>
                    <div className="flex-1 min-w-0">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2.5 py-1">
                          <button
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              item.completed
                                ? "bg-plog border-plog"
                                : "border-gray-300"
                            }`}
                            onClick={() => toggleItem(tlKey, item.id)}
                          >
                            {item.completed && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path
                                  d="M1 4l2.5 2.5L9 1"
                                  stroke="white"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </button>
                          <span
                            className={`text-sm ${
                              item.completed
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                      ))}

                      {isAdding ? (
                        <div className="flex items-center gap-2 py-1">
                          <input
                            autoFocus
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") addItem(tlKey, time);
                              if (e.key === "Escape") {
                                setAddingAt(null);
                                setInputVal("");
                              }
                            }}
                            placeholder="일정을 입력하세요"
                            className="flex-1 text-sm border-b border-plog outline-none py-0.5 placeholder-gray-300 text-gray-800"
                          />
                          <button
                            className="text-xs text-plog font-semibold"
                            onClick={() => addItem(tlKey, time)}
                          >
                            추가
                          </button>
                        </div>
                      ) : (
                        <button
                          className="text-xs text-gray-300 py-0.5 hover:text-gray-400 transition-colors"
                          onClick={() => {
                            setAddingAt(addKey);
                            setInputVal("");
                          }}
                        >
                          + 추가
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 토스트 알림 */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium z-50 transition-all duration-300 whitespace-nowrap pointer-events-none ${
          toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        ✓ {toast.msg}
      iv>
    </div>
  );
};

export default SchedulePage;
