import { create } from "zustand";

// GitHub API로부터 정보 받아와서 저장
interface User {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
}
// 상태관리할 객체
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const github = create<UserStore>(set => ({
  user: null, //초기값은 null로 설정
  setUser: user => set({ user }),
  clearUser: () => set({ user: null }),
}));
export default github;
