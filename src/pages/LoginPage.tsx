import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-8">
      {/* 로고 영역 */}
      <div className="flex justify-center mt-32 mb-16">
        <img src="/Plog.svg" alt="Plog" className="h-20" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* 아이디 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">아이디</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력해주세요."
            className="border-b border-gray-300 py-2 text-sm text-black placeholder:text-gray-300 outline-none focus:border-plog transition-colors"
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            className="border-b border-gray-300 py-2 text-sm text-black placeholder:text-gray-300 outline-none focus:border-plog transition-colors"
          />
        </div>

        {/* 로그인 버튼 */}
        <Button
          type="submit"
          className="mt-4 w-full bg-plog text-white font-bold text-base py-4 rounded-2xl active:opacity-80 transition-opacity"
        >
          로그인
        </Button>
      </form>

      {/* 회원가입 링크 */}
      <p className="text-center text-sm text-gray-400 mt-4">
        계정이 없으신가요?{" "}
        <Link to="/register" className="text-plog font-semibold">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
