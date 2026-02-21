import { apiClient } from "./client";

export interface ApiPhoto {
  id: string;
  url: string;
  latitude: number | null;
  longitude: number | null;
}

export interface ApiPost {
  id: string;
  title: string;
  contentSummary: string;
  likeCount: number;
  cloneCount: number;
  createdAt: string;
  username: string;
  photos: ApiPhoto[];
  regionName: string;
  latitude: number | null;
  longitude: number | null;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface PostsResponse {
  posts: ApiPost[];
}

export const fetchPosts = () =>
  apiClient.get<PostsResponse>("/posts").then((r) => r.posts);
