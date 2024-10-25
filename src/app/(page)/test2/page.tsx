"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import github from "@/app/store/github";

const Profile = () => {
  const user = github(state => state.user); // Zustand에서 user 가져오기
  const router = useRouter();

  // 상태가 없는 경우 홈 페이지로 리디렉션
  useEffect(() => {
    if (!user) {
      alert("No user data found. Redirecting to home...");
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

  return (
    <div className="min-h-screen bg-[#1A132A] text-white flex items-center justify-center">
      <div className="max-w-xl w-full p-8 bg-[#2C2541] rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
          <p className="mt-2 text-center">{user.bio || "No bio available."}</p>
          <div className="mt-4">
            <p>
              <span className="font-semibold">Username: </span>
              {user.login}
            </p>
            <p>
              <span className="font-semibold">Public Repos: </span>
              {user.public_repos}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
