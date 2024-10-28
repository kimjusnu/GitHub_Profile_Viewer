"use client"; // 클라이언트 전용 컴포넌트
import { useEffect, useRef, useState } from "react";
import { MdPeopleOutline, MdOutlineCalendarToday } from "react-icons/md";
import axios from "axios"; // Axios로 API 호출

// 환경에 따라 API URL 설정 (Vercel 또는 로컬 개발 환경)
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://github-profile-viewer-steel.vercel.app" // Vercel 배포 주소
    : "http://localhost:5000"; // 로컬 개발 주소

const VisitorCounter = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [loaded, setLoaded] = useState(false); // Hydration 방지용 상태

  const isVisited = useRef(false); // 첫 방문 여부 추적

  // 서버에서 방문자 수를 가져오는 함수
  const fetchVisitors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/visitors`);
      const { totalVisitors, todayVisitors } = response.data;
      setTotalVisitors(totalVisitors);
      setTodayVisitors(todayVisitors);
    } catch (error) {
      console.error("Failed to fetch visitor data:", error);
    }
  };

  // 방문자 수 증가 함수
  const incrementVisitors = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/increment`);
      fetchVisitors(); // 증가 후 방문자 수 다시 가져오기
    } catch (error) {
      console.error("Failed to increment visitors:", error);
    }
  };

  useEffect(() => {
    fetchVisitors(); // 처음 렌더링 시 방문자 수 가져오기

    if (!isVisited.current) {
      incrementVisitors(); // 첫 방문 시 방문자 수 증가
      isVisited.current = true;
    }

    setLoaded(true); // 클라이언트 렌더링 완료
  }, []);

  // Hydration이 완료될 때까지 렌더링하지 않음
  if (!loaded) return null;

  return (
    <div className="flex space-x-8">
      <div className="flex items-center space-x-2">
        <MdPeopleOutline className="text-[#9D95B9] text-2xl" />
        <div className="text-[#9D95B9]">
          <span className="font-semibold">Total Visitors: </span>
          {totalVisitors.toLocaleString()}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <MdOutlineCalendarToday className="text-[#9D95B9] text-2xl" />
        <div className="text-[#9D95B9]">
          <span className="font-semibold">Today: </span>
          {todayVisitors.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
