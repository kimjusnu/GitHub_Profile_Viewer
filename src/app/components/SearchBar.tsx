"use client";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/navigation"; // next/navigation 사용
import github from "../store/github";

const SearchBar = () => {
  const [userName, setUserName] = useState("");
  const setUser = github(state => state.setUser);
  const router = useRouter(); // useRouter 훅 초기화

  const handleSearch = async () => {
    if (userName.trim()) {
      try {
        const response = await fetch(
          `https://api.github.com/users/${userName}`
        );
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();
        setUser(data); // Zustand에 저장
        router.push("/test2"); // 프로필 페이지로 이동
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("User not found. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center bg-[#332957] rounded-3xl w-[700px] h-[64px]">
      <input
        type="text"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSearch()}
        placeholder="Enter a GitHub username..."
        className="w-full pl-8 bg-transparent text-white placeholder-[#807C8F] focus:outline-none text-lg"
      />
      <button onClick={handleSearch}>
        <IoSearch className="mx-6 text-white text-3xl transition-transform transform hover:scale-125 duration-300 cursor-pointer" />
      </button>
    </div>
  );
};

export default SearchBar;
