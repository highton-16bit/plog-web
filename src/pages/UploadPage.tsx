import { useNavigate } from "react-router-dom";
import TabBar from "../components/common/TabBar";

interface Travel {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

const DUMMY_TRAVELS: Travel[] = [
  { id: "travel-1", name: "2026년 강릉여행", startDate: "2026.02.21", endDate: "2026.02.24" },
  { id: "travel-2", name: "2025년 부산여행", startDate: "2025.10.24", endDate: "2025.10.30" },
];

const UploadPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 */}
      <div className="flex items-center justify-center px-4 py-4">
        <h1 className="text-lg font-bold text-gray-900">업로드</h1>
      </div>

      {/* 여행 목록 */}
      <div className="flex-1 overflow-y-auto">
        {DUMMY_TRAVELS.map((travel, i) => (
          <button
            key={travel.id}
            onClick={() => navigate(`/photo-select/${travel.id}`)}
            className={`w-full px-5 py-4 text-left border-b border-gray-100 active:bg-gray-50 ${
              i === 0 ? "bg-indigo-50" : "bg-white"
            }`}
          >
            <p className="text-base font-semibold text-gray-900">{travel.name}</p>
            <p className="text-sm text-gray-400 mt-0.5">
              {travel.startDate} ~ {travel.endDate}
            </p>
          </button>
        ))}
      </div>

      <TabBar />
    </div>
  );
};

export default UploadPage;
