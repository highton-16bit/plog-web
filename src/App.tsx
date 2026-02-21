import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ResearchPage from "./pages/ResearchPage";
import PostDetailPage from "./pages/PostDetailPage";
import UploadPage from "./pages/UploadPage";
import PhotoSelectPage from "./pages/PhotoSelectPage";
import SchedulePage from "./pages/SchedulePage";
import ProfilePage from "./pages/ProfilePage";
import { PostsProvider } from "./context/PostsContext";

const App = () => {
  return (
    <BrowserRouter>
      <PostsProvider>
        <div className="min-h-screen bg-gray-200 flex justify-center">
          <div className="w-full max-w-97.5 min-h-screen bg-white shadow-2xl">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search" element={<ResearchPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/create" element={<UploadPage />} />
              <Route path="/photo-select/:travelId" element={<PhotoSelectPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </PostsProvider>
    </BrowserRouter>
  );
};

export default App;
