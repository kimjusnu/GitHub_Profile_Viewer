import { create } from "zustand";

// GitHub 유저 정보 인터페이스 정의
export interface User {
  html_url: string;
  login: string; // 유저의 GitHub 로그인 아이디 ♥️♥️♥️♥️♥️
  avatar_url: string; // 유저의 프로필 사진 URL ♥️♥️♥️♥️♥️
  name: string; // 유저의 실제 이름 (없는 경우 null일 수 있음) ♥️♥️♥️♥️♥️
  bio: string; // 유저의 자기소개 또는 프로필 설명 ♥️♥️♥️♥️♥️
  location: string; // 유저의 위치 (도시나 국가) ♥️♥️♥️♥️♥️
  company: string; // 유저가 소속된 회사나 조직 ♥️♥️♥️♥️♥️
  followers: number; // 유저의 팔로워 수 ♥️♥️♥️♥️♥️
  following: number; // 유저가 팔로우 중인 사람 수 ♥️♥️♥️♥️♥️
  created_at: string; // 계정 생성 날짜 (ISO 형식 문자열) ♥️♥️♥️♥️♥️
  updated_at: string; // 프로필 마지막 업데이트 날짜 (ISO 형식 문자열)
  email: string; // 유저의 이메일 주소 (공개된 경우에만 제공)
  blog: string; // 유저의 개인 블로그나 웹사이트 URL ♥️♥️♥️♥️♥️
  twitter_username: string; // 유저의 트위터 사용자 이름 (없는 경우 null)
  hireable: boolean; // 유저가 고용 가능한지 여부 (true/false)
  public_gists: number; // 유저의 공개 Gist(메모 저장소) 수
  public_repos: number; // 유저의 공개된 레포지토리 수 ♥️♥️♥️♥️♥️
  languages: { [key: string]: number }; // 언어 비율 데이터
  contributors: number; // 기여자 수
}

// 레포지토리 정보 인터페이스 정의
export interface Repository {
  id: number; // 레포지토리의 고유 ID
  name: string; // 레포지토리의 이름
  description: string; // 레포지토리 설명 (없는 경우 null)
  html_url: string; // 레포지토리의 GitHub 페이지 URL
  language: string; // 레포지토리의 주 프로그래밍 언어 (없는 경우 null)
  stargazers_count: number; // 해당 레포지토리의 받은 별(스타) 수
  forks_count: number; // 해당 레포지토리가 포크된 횟수
  open_issues_count: number; // 현재 열려 있는 이슈 수
  watchers_count: number; // 해당 레포지토리를 구독하고 있는 유저 수
  size: number; // 레포지토리의 크기 (KB 단위)
  license: { name: string } | null; // 레포지토리에 적용된 라이선스 이름 (없을 경우 null)
  created_at: string; // 레포지토리 생성 날짜 (ISO 형식 문자열)
  updated_at: string; // 마지막 커밋이나 업데이트 날짜 (ISO 형식 문자열)
}

// Zustand의 상태관리 인터페이스 정의
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
  clearRepositories: () => void;
}

// LocalStorage에서 초기 방문자 수 가져오기
const getInitialVisitors = () => {
  if (typeof window === "undefined") {
    return { totalVisitors: 0, todayVisitors: 0 }; // 서버에서는 기본값 반환
  }

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

  // 레포지토리만 초기화하는 함수 추가
  clearRepositories: () => set({ repositories: [] }),

  // 방문자 수 초기화
  ...getInitialVisitors(),

  // 방문자 수 증가
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

  // 오늘 방문자 수 초기화
  resetTodayVisitors: () =>
    set(() => {
      localStorage.setItem("todayVisitors", "0");
      return { todayVisitors: 0 };
    }),
}));

export default github;
