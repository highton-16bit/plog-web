import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uploadPhotoToS3, registerPhotoToTravel } from "../api/photos";

interface PhotoItem {
  file: File;
  previewUrl: string;
  order?: number; // 선택 순서 (undefined = 미선택)
}

const PhotoSelectPage = () => {
  const { travelId } = useParams<{ travelId: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const items: PhotoItem[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setPhotos(items);
  };

  const toggleSelect = (index: number) => {
    setPhotos((prev) => {
      const item = prev[index];
      if (item.order !== undefined) {
        // 선택 해제 → 뒤 번호들을 당김
        const removed = item.order;
        return prev.map((p, i) => {
          if (i === index) return { ...p, order: undefined };
          if (p.order !== undefined && p.order > removed)
            return { ...p, order: p.order - 1 };
          return p;
        });
      } else {
        // 선택 → 현재 최대 order + 1
        const maxOrder = prev.reduce(
          (m, p) => Math.max(m, p.order ?? 0),
          0
        );
        return prev.map((p, i) =>
          i === index ? { ...p, order: maxOrder + 1 } : p
        );
      }
    });
  };

  const selectedPhotos = [...photos]
    .filter((p) => p.order !== undefined)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleUpload = async () => {
    if (!travelId || selectedPhotos.length === 0) return;
    setIsUploading(true);
    setUploadProgress(0);
    try {
      for (let i = 0; i < selectedPhotos.length; i++) {
        const url = await uploadPhotoToS3(selectedPhotos[i].file);
        await registerPhotoToTravel(travelId, url);
        setUploadProgress(i + 1);
      }
      navigate(-1);
    } catch (err) {
      console.error("업로드 실패:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // ─── 사진 미선택 상태 ────────────────────────────────────
  if (photos.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-white">
        {/* 헤더 */}
        <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M5 12l7-7M5 12l7 7"
                stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">사진선택</h1>
        </div>

        {/* 갤러리 오픈 트리거 */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-gray-400">업로드할 사진을 선택하세요</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3 bg-plog text-white rounded-2xl text-sm font-semibold"
          >
            갤러리 열기
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    );
  }

  // ─── 사진 그리드 ─────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 헤더 */}
      <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12l7-7M5 12l7 7"
              stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">사진선택</h1>

        {/* 갤러리 다시 열기 */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="ml-auto text-xs text-plog font-medium"
        >
          다시선택
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* 3열 그리드 */}
      <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-0.5 bg-gray-100 content-start">
        {photos.map((photo, index) => {
          const isSelected = photo.order !== undefined;
          return (
            <button
              key={index}
              onClick={() => toggleSelect(index)}
              className="relative aspect-square bg-gray-200"
            >
              <img
                src={photo.previewUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* 선택 원 */}
              <div
                className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-plog text-white"
                    : "border-2 border-white/80 bg-white/30"
                }`}
              >
                {isSelected && photo.order}
              </div>
              {/* 선택된 사진 어둡게 */}
              {isSelected && (
                <div className="absolute inset-0 bg-black/20" />
              )}
            </button>
          );
        })}
      </div>

      {/* 하단 바 (선택한 사진이 있을 때) */}
      {selectedPhotos.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-100 bg-white">
          {/* 선택된 썸네일들 */}
          <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
            {selectedPhotos.map((photo) => (
              <img
                key={photo.order}
                src={photo.previewUrl}
                alt=""
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
            ))}
          </div>

          {/* 업로드 버튼 */}
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-1.5 bg-plog text-white px-4 py-2.5 rounded-full text-sm font-semibold shrink-0 disabled:opacity-60"
          >
            {isUploading
              ? `${uploadProgress}/${selectedPhotos.length}`
              : "업로드"}
            {!isUploading && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.8" />
                <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoSelectPage;
