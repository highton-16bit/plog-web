import type { Post } from "../types/interface";
import { DUMMY_POSTS } from "./dummy";

export interface MapPin {
  lat: number;
  lng: number;
}

export interface LocalSearchResult {
  locationName: string;
  mapPins: MapPin[];
  posts: Post[];
  aiAnswer: string;
}

const SEARCH_DB: Record<string, LocalSearchResult> = {
  광화문: {
    locationName: "광화문",
    mapPins: [
      { lat: 37.5759, lng: 126.9769 }, // 광화문 광장
      { lat: 37.5796, lng: 126.977 },  // 경복궁
      { lat: 37.5744, lng: 126.9854 }, // 인사동
      { lat: 37.5701, lng: 126.9817 }, // 청계광장
      { lat: 37.5656, lng: 126.9769 }, // 덕수궁
    ],
    posts: DUMMY_POSTS.filter((p) => p.region === "서울"),
    aiAnswer:
      "광화문은 조선시대 경복궁의 정문으로, 서울 도심 한가운데 위치한 대표 관광 명소입니다. 광화문 광장에는 세종대왕과 이순신 장군 동상이 있으며, 지하 세종이야기·충무공이야기 전시관도 무료로 관람할 수 있습니다. 경복궁(도보 5분), 인사동(도보 15분), 청계천(도보 10분)이 가까워 도보 투어 코스로 최적입니다. 근처 통인시장 도시락 카페도 꼭 들러보세요!",
  },
  경복궁: {
    locationName: "경복궁",
    mapPins: [
      { lat: 37.5796, lng: 126.977 },  // 경복궁
      { lat: 37.5759, lng: 126.9769 }, // 광화문 광장
      { lat: 37.5828, lng: 126.9832 }, // 북촌 한옥마을
    ],
    posts: DUMMY_POSTS.filter((p) => p.region === "서울"),
    aiAnswer:
      "경복궁은 조선의 법궁으로 가장 큰 궁궐입니다. 한복을 입고 방문하면 무료로 입장할 수 있습니다. 근처 국립민속박물관과 국립고궁박물관도 무료이므로 함께 방문하면 좋습니다. 봄에는 벚꽃, 가을에는 단풍이 아름답습니다.",
  },
  해운대: {
    locationName: "해운대",
    mapPins: [
      { lat: 35.1588, lng: 129.1604 },
      { lat: 35.154, lng: 129.1188 },
    ],
    posts: [],
    aiAnswer:
      "해운대는 부산의 대표 해수욕장으로 연간 수천만 명이 방문합니다. 7~8월 여름 성수기를 피해 5~6월이나 9~10월에 방문하면 한적하게 즐길 수 있습니다. 주변 동백섬, 달맞이언덕, 광안리도 함께 돌아보세요.",
  },
  제주: {
    locationName: "제주",
    mapPins: [
      { lat: 33.4996, lng: 126.5312 },
      { lat: 33.4586, lng: 126.9425 },
      { lat: 33.2541, lng: 126.5601 },
    ],
    posts: DUMMY_POSTS.filter((p) => p.region === "제주도"),
    aiAnswer:
      "제주도는 한국 최대의 섬으로 용암이 만들어낸 독특한 자연 경관이 특징입니다. 한라산 등반, 성산일출봉, 만장굴, 우도 등이 필수 코스입니다. 렌트카를 이용하면 서쪽과 동쪽을 각 하루씩 나눠 효율적으로 둘러볼 수 있습니다.",
  },
  경주: {
    locationName: "경주",
    mapPins: [
      { lat: 35.7897, lng: 129.3319 },
      { lat: 35.8047, lng: 129.332 },
      { lat: 35.7732, lng: 129.3435 },
    ],
    posts: DUMMY_POSTS.filter((p) => p.region === "경상도"),
    aiAnswer:
      "경주는 신라 천년의 역사가 살아 숨쉬는 도시입니다. 불국사와 석굴암은 유네스코 세계문화유산으로 꼭 방문해야 할 명소입니다. 황리단길은 감각적인 카페와 식당이 즐비한 핫플레이스입니다.",
  },
  여수: {
    locationName: "여수",
    mapPins: [
      { lat: 34.7604, lng: 127.6622 },
      { lat: 34.7427, lng: 127.7442 },
    ],
    posts: DUMMY_POSTS.filter((p) => p.region === "전라도"),
    aiAnswer:
      "여수는 '여수 밤바다'로 유명한 낭만의 항구 도시입니다. 돌산도 케이블카에서 바라보는 야경이 압권이며, 포차거리에서 꼼장어와 서대회 무침 등 신선한 해산물을 맛볼 수 있습니다.",
  },
  강릉: {
    locationName: "강릉",
    mapPins: [
      { lat: 37.7519, lng: 128.8761 },
      { lat: 37.7756, lng: 128.9396 },
    ],
    posts: DUMMY_POSTS.filter((p) => p.region === "강원도"),
    aiAnswer:
      "강릉은 동해안의 대표 관광지로 안목 해변 카페거리가 유명합니다. 경포대 해수욕장은 넓고 깨끗하며, 오죽헌은 신사임당과 율곡 이이의 생가로 역사적 의미가 깊습니다. 초당 순두부도 꼭 먹어봐야 할 별미입니다.",
  },
};

const normalize = (q: string) => q.trim().replace(/\s+/g, "");

export const getDummySearch = (query: string): LocalSearchResult => {
  const q = normalize(query);
  for (const [key, entry] of Object.entries(SEARCH_DB)) {
    if (q.includes(key) || key.includes(q)) return entry;
  }
  // 키워드 매칭 없으면 광화문 기본값 반환
  return { ...SEARCH_DB["광화문"], locationName: query };
};
