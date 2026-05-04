import { create } from 'zustand'

interface PlayerState {
  currentSong: Record<string, unknown> | null
  setSong: (song: Record<string, unknown> | null) => void
}

export const usePlayer = create<PlayerState>((set) => ({
  currentSong: null,
  setSong: (song) => set({ currentSong: song }),
}))
