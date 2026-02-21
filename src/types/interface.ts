export interface ButtonInterface {
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
}

export type Region = "경기도" | "강원도" | "충청도" | "경상도" | "전라도" | "제주도";

export interface PostEvent {
  time: string;
  place: string;
  tip?: string;
}

export interface PostDay {
  day: number;
  title: string;
  events: PostEvent[];
}

export interface Post {
  id: string;
  username: string;
  region: Region;
  city: string;
  imageUrl: string;
  likes: number;
  isBookmarked: boolean;
  days: PostDay[];
}