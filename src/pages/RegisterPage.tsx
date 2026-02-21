import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const isReady =
    id.trim().length > 0 &&
    password.length > 0 &&
    confirm.length > 0 &&
    password === confirm;

  const pwMismatch = confirm.length > 0 && password !== confirm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReady) return;
    // TODO: 서버 연동 시 api/auth.ts 교체
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-8">
      {/* 로고 영역 */}
      <div className="flex justify-center mt-24 mb-12">
        <img src="/Plog.svg" alt="Plog" className="h-20" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
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

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">비밀번호 확인</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요."
            className={`border-b py-2 text-sm text-black placeholder:text-gray-300 outline-none transition-colors ${
              pwMismatch ? "border-red-400" : "border-gray-300 focus:border-plog"
            }`}
          />
          {pwMismatch && (
            <p className="text-xs text-red-400">비밀번호가 일치하지 않습니다.</p>
          )}
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          disabled={!isReady}
          className={`mt-2 w-full font-bold text-base py-4 rounded-2xl transition-all ${
            isReady
              ? "bg-plog text-white active:opacity-80"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          회원가입
        </button>
      </form>

      {/* 로그인 링크 */}
      <p className="text-center text-sm text-gray-400 mt-4">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-plog font-semibold">
          로그인
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
