import { create } from "zustand";

// GitHub 유저 정보 인터페이스 정의
interface User {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
}

// 상태관리할 객체 인터페이스 정의
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  totalVisitors: number;
  todayVisitors: number;
  incrementVisitors: () => void;
  resetTodayVisitors: () => void;
}

// LocalStorage에서 초기 방문자 수 가져오기 (없으면 0으로 초기화)
const getInitialVisitors = () => {
  const total = localStorage.getItem("totalVisitors");
  const today = localStorage.getItem("todayVisitors");

  return {
    totalVisitors: total ? parseInt(total, 10) : 0,
    todayVisitors: today ? parseInt(today, 10) : 0,
  };
};

// Zustand 스토어 생성
const github = create<UserStore>(set => ({
  user: null, // 초기 유저 상태
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),

  // 방문자 수 초기화
  ...getInitialVisitors(),

  // 방문자 수 증가 함수
  incrementVisitors: () =>
    set(state => {
      const newTotal = state.totalVisitors + 1;
      const newToday = state.todayVisitors + 1;

      // LocalStorage에 새로운 값 저장
      localStorage.setItem("totalVisitors", newTotal.toString());
      localStorage.setItem("todayVisitors", newToday.toString());

      return {
        totalVisitors: newTotal,
        todayVisitors: newToday,
      };
    }),

  // 오늘 방문자 수 초기화 함수 (예: 하루가 지났을 때)
  resetTodayVisitors: () =>
    set(() => {
      localStorage.setItem("todayVisitors", "0");
      return { todayVisitors: 0 };
    }),
}));

export default github;
