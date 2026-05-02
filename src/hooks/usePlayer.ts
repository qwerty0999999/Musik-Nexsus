import { create } from 'zustand'

interface PlayerState {
  currentSong: any
  setSong: (song: any) => void
}

export const usePlayer = create<PlayerState>((set) => ({
  currentSong: null,
  setSong: (song) => set({ currentSong: song }),
}))
