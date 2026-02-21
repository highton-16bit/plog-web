import { apiClient } from "./client";
import type { ApiPost } from "./posts";

export interface MapPin {
  lat: number;
  lng: number;
  postId?: string;
}

export interface SearchResult {
  query: string;
  regionName: string | null;
  posts: ApiPost[];
  mapPins: MapPin[];
}

export interface AiSearchResult {
  query: string;
  answer: string;
  relatedPosts: ApiPost[];
}

export const searchPlaces = (q: string) =>
  apiClient.get<SearchResult>(`/search?q=${encodeURIComponent(q)}`);

export const searchAi = (q: string) =>
  apiClient.get<AiSearchResult>(`/search/ai?q=${encodeURIComponent(q)}`);
