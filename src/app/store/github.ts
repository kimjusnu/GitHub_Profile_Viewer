import { create } from "zustand";

// GitHub 유저 정보 인터페이스 정의
interface User {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  company: string;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  email: string;
  blog: string;
  twitter_username: string;
  hireable: boolean;
  public_gists: number;
  public_repos: number;
}

// 레포지토리 정보 인터페이스 정의
interface Repository {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  size: number;
  license: { name: string };
  created_at: string;
  updated_at: string;
}

// 상태관리 인터페이스 정의
interface UserStore {
  user: User | null;
  repositories: Repository[];
  setUser: (user: User) => void;
  setRepositories: (repos: Repository[]) => void;
  clearUser: () => void;
  totalVisitors: number;
  todayVisitors: number;
  incrementVisitors: () => void;
  resetTodayVisitors: () => void;
}

// LocalStorage에서 초기 방문자 수 가져오기
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
  // 초기 상태
  user: null,
  repositories: [],

  // 유저와 레포지토리 상태 관리
  setUser: user => set({ user }),
  setRepositories: repos => set({ repositories: repos }),
  clearUser: () => set({ user: null, repositories: [] }),

  // 방문자 수 초기화
  ...getInitialVisitors(),

  // 방문자 수 증가
  incrementVisitors: () =>
    set(state => {
      const newTotal = state.totalVisitors + 1;
      const newToday = state.todayVisitors + 1;

      // LocalStorage에 저장
      localStorage.setItem("totalVisitors", newTotal.toString());
      localStorage.setItem("todayVisitors", newToday.toString());

      return {
        totalVisitors: newTotal,
        todayVisitors: newToday,
      };
    }),

  // 오늘 방문자 수 초기화
  resetTodayVisitors: () =>
    set(() => {
      localStorage.setItem("todayVisitors", "0");
      return { todayVisitors: 0 };
    }),
}));

export default github;
