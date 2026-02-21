import { createContext, useContext, useState } from "react";
import { DUMMY_POSTS } from "../data/dummy";

interface PostsContextType {
  likes: Set<string>;
  bookmarks: Set<string>;
  toggleLike: (id: string) => void;
  toggleBookmark: (id: string) => void;
}

const PostsContext = createContext<PostsContextType | null>(null);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [bookmarks, setBookmarks] = useState<Set<string>>(
    new Set(DUMMY_POSTS.filter((p) => p.isBookmarked).map((p) => p.id))
  );

  const toggleLike = (id: string) => {
    setLikes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <PostsContext.Provider value={{ likes, bookmarks, toggleLike, toggleBookmark }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
};
