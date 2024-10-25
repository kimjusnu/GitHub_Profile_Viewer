// src/app/page.tsx
"use client"; // 파일의 첫 줄에 추가하여 클라이언트 컴포넌트로 설정

import { useEffect, useState } from "react";
import Image from "next/image"; // Next.js 최적화된 이미지 컴포넌트 사용

interface User {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (username: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser("kimjusnu"); // 초기 테스트용으로 유저 이름 설정
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        GitHub Profile Viewer
      </h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {user && (
        <div className="max-w-md mx-auto bg-14213d p-6 rounded-lg shadow-lg">
          <Image
            src={"/public/vercel.svg"}
            alt="User Avatar"
            width={300}
            height={300}
            className="rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-center">{user.name}</h2>
          <p className="text-center text-gray-400">@{user.login}</p>
          <p className="text-center text-gray-300 mt-2">{user.bio}</p>
          <div className="flex justify-around mt-4">
            <p>Repos: {user.public_repos}</p>
            <p>Followers: {user.followers}</p>
            <p>Following: {user.following}</p>
          </div>
        </div>
      )}
    </div>
  );
}
