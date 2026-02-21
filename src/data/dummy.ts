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
];
