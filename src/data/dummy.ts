import type { Post } from "../types/interface";

export const DUMMY_POSTS: Post[] = [
  {
    id: "1",
    username: "우성민",
    region: "강원도",
    city: "강릉시",
    imageUrl: "https://picsum.photos/seed/gangneung/800/500",
    likes: 100,
    isBookmarked: false,
    startDate: "2026.01.01",
    endDate: "2026.01.03",
    days: [
      {
        day: 1,
        title: "도착",
        events: [
          {
            time: "12:00",
            place: "강릉역 도착 및 AX 검색",
            tip: 'AI 추천: "현재 대기 줄이 짧은 현대장칼국수를 추천합니다. (주변 숙소 체크인 전 짐 보관 가능)"',
          },
          {
            time: "14:00",
            place: "안목 해변 카페거리",
            tip: '[여행 모드 On] 갑자기 앱에서 알림 발생! "지금 바다 윤슬이 예뻐요! 5초 안에 사진 한 장?" → 무작위 촬영으로 생생한 추억',
          },
        ],
      },
    ],
  },
  {
    id: "2",
    username: "김지수",
    region: "제주도",
    city: "서귀포시",
    imageUrl: "https://picsum.photos/seed/jeju/800/500",
    likes: 243,
    isBookmarked: true,
    startDate: "2026.02.14",
    endDate: "2026.02.17",
    days: [
      {
        day: 1,
        title: "한라산 트레킹",
        events: [
          {
            time: "06:00",
            place: "성판악 탐방로 출발",
            tip: "AI 추천: 오전 일찍 출발해야 정상 탐방 가능. 음료 2L 이상 필수.",
          },
          {
            time: "13:00",
            place: "백록담 정상 도착",
            tip: "날씨가 좋으면 성산일출봉까지 조망 가능!",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    username: "박민준",
    region: "경기도",
    city: "가평군",
    imageUrl: "https://picsum.photos/seed/gapyeong/800/500",
    likes: 87,
    isBookmarked: false,
    startDate: "2026.01.10",
    endDate: "2026.01.11",
    days: [
      {
        day: 1,
        title: "글램핑 & 계곡",
        events: [
          {
            time: "11:00",
            place: "자라섬 글램핑 체크인",
            tip: "AI 추천: 주말 예약은 2주 전에 마감됩니다.",
          },
          {
            time: "15:00",
            place: "용추계곡 물놀이",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    username: "이수아",
    region: "전라도",
    city: "여수시",
    imageUrl: "https://picsum.photos/seed/yeosu/800/500",
    likes: 312,
    isBookmarked: false,
    startDate: "2025.12.24",
    endDate: "2025.12.26",
    days: [
      {
        day: 1,
        title: "낭만 포차 투어",
        events: [
          {
            time: "17:00",
            place: "돌산도 케이블카",
            tip: "일몰 30분 전 탑승 추천. 줄이 길어요!",
          },
          {
            time: "19:00",
            place: "여수 밤바다 포차거리",
            tip: 'AI 추천: "현재 대기가 짧은 꼼장어 맛집 알려드릴게요."',
          },
        ],
      },
    ],
  },
  {
    id: "5",
    username: "최현우",
    region: "충청도",
    city: "단양군",
    imageUrl: "https://picsum.photos/seed/danyang/800/500",
    likes: 55,
    isBookmarked: true,
    startDate: "2026.03.05",
    endDate: "2026.03.06",
    days: [
      {
        day: 1,
        title: "단양 8경 탐방",
        events: [
          {
            time: "10:00",
            place: "도담삼봉",
            tip: "이른 아침에 안개 낀 풍경이 압권입니다.",
          },
          {
            time: "14:00",
            place: "만천하 스카이워크",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    username: "정하은",
    region: "경상도",
    city: "경주시",
    imageUrl: "https://picsum.photos/seed/gyeongju/800/500",
    likes: 178,
    isBookmarked: false,
    startDate: "2026.01.20",
    endDate: "2026.01.21",
    days: [
      {
        day: 1,
        title: "천년 고도 산책",
        events: [
          {
            time: "09:00",
            place: "불국사 관람",
            tip: "AI 추천: 오전 9시 개장 직후 방문하면 여유롭게 관람 가능.",
          },
          {
            time: "14:00",
            place: "황리단길 카페 투어",
            tip: "한복 대여 후 방문하면 더 분위기 있어요.",
          },
        ],
      },
    ],
  },
  // 서울 / 광화문 포스트
  {
    id: "seoul-1",
    username: "우성민",
    region: "서울",
    city: "서울시",
    imageUrl: "https://picsum.photos/seed/gwanghwamun1/800/500",
    likes: 100,
    isBookmarked: false,
    startDate: "2026.01.01",
    endDate: "2026.01.07",
    days: [
      {
        day: 1,
        title: "광화문 & 경복궁",
        events: [
          {
            time: "10:00",
            place: "광화문 광장",
            tip: "세종대왕 동상 앞에서 사진 찍기 필수! 지하 세종이야기 전시관은 무료입니다.",
          },
          {
            time: "11:30",
            place: "경복궁 관람",
            tip: 'AI 추천: "한복 착용 시 무료 입장 가능합니다. 주변 한복 대여점 3곳 안내해드릴까요?"',
          },
          {
            time: "14:00",
            place: "인사동 쌈지길",
            tip: "전통 공예품과 갤러리, 카페가 가득한 복합문화공간.",
          },
        ],
      },
      {
        day: 2,
        title: "청계천 & 명동",
        events: [
          {
            time: "10:00",
            place: "청계광장 산책",
            tip: "봄에는 벚꽃, 여름에는 분수 시원한 광경!",
          },
          {
            time: "13:00",
            place: "명동 점심 & 쇼핑",
            tip: 'AI 추천: "현재 명동교자 대기 30분. 명동 돈까스를 대안으로 추천드립니다."',
          },
        ],
      },
    ],
  },
  {
    id: "seoul-2",
    username: "장강민",
    region: "서울",
    city: "서울시",
    imageUrl: "https://picsum.photos/seed/gwanghwamun2/800/500",
    likes: 88,
    isBookmarked: false,
    startDate: "2026.01.01",
    endDate: "2026.01.07",
    days: [
      {
        day: 1,
        title: "경복궁 한복 투어",
        events: [
          {
            time: "09:30",
            place: "경복궁역 한복 대여",
            tip: "인근 한복 대여점은 1만~2만원 대. 주말엔 미리 예약 추천.",
          },
          {
            time: "11:00",
            place: "경복궁 내부 산책",
          },
          {
            time: "14:00",
            place: "북촌 한옥마을",
            tip: "골목 안쪽까지 걸어 들어가면 진짜 한옥 마을 풍경이 펼쳐집니다.",
          },
        ],
      },
    ],
  },
  {
    id: "seoul-3",
    username: "강장민",
    region: "서울",
    city: "서울시",
    imageUrl: "https://picsum.photos/seed/gyeongbokgung/800/500",
    likes: 201,
    isBookmarked: true,
    startDate: "2026.01.01",
    endDate: "2026.01.07",
    days: [
      {
        day: 1,
        title: "덕수궁 & 시청",
        events: [
          {
            time: "10:00",
            place: "덕수궁 돌담길",
            tip: "연인과 걸으면 헤어진다는 전설이 있지만, 사실 가장 아름다운 산책로!",
          },
          {
            time: "13:00",
            place: "시청 광장 분수",
          },
        ],
      },
    ],
  },
  {
    id: "seoul-4",
    username: "강장민",
    region: "서울",
    city: "서울시",
    imageUrl: "https://picsum.photos/seed/seoul4/800/500",
    likes: 156,
    isBookmarked: false,
    startDate: "2026.01.01",
    endDate: "2026.01.07",
    days: [
      {
        day: 1,
        title: "서촌 카페 투어",
        events: [
          {
            time: "11:00",
            place: "통인시장 도시락 카페",
            tip: "엽전으로 반찬을 구매해서 나만의 도시락을 꾸미는 이색 체험!",
          },
          {
            time: "14:00",
            place: "서촌 골목 카페 탐방",
            tip: "체부동·누하동 골목에 감성 카페가 숨어있어요.",
          },
        ],
      },
    ],
  },
];
