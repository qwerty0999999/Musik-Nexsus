'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
  duration?: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  currentTime: number;
  duration: number;
  volume: number;
  repeatMode: 'none' | 'one' | 'all';
  isShuffle: boolean;
  playTrack: (track: Track, newQueue?: Track[]) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  addToQueue: (track: Track) => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  setRepeatMode: (mode: 'none' | 'one' | 'all') => void;
  setIsShuffle: (isShuffle: boolean) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);
  const [shuffledQueue, setShuffledQueue] = useState<Track[]>([]);
  const [history, setHistory] = useState<Track[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Media Session API support
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', resumeTrack);
      navigator.mediaSession.setActionHandler('pause', pauseTrack);
      navigator.mediaSession.setActionHandler('previoustrack', playPrevious);
      navigator.mediaSession.setActionHandler('nexttrack', playNext);
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) seekTo(details.seekTime);
      });
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [repeatMode, currentTrack, queue, isShuffle]); // Re-bind when state changes that handlers depend on

  useEffect(() => {
    if (currentTrack && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        artwork: [{ src: currentTrack.thumbnail, sizes: '512x512', type: 'image/png' }]
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }, [isPlaying]);

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const playTrack = (track: Track, newQueue?: Track[]) => {
    if (audioRef.current) {
      if (currentTrack && currentTrack.id !== track.id) {
        setHistory(prev => [currentTrack, ...prev.slice(0, 10)]);
      }
      
      if (newQueue) {
        setQueue(newQueue);
        if (isShuffle) {
          const shuffled = [...newQueue].sort(() => Math.random() - 0.5);
          setShuffledQueue(shuffled.filter(t => t.id !== track.id));
        }
      }

      audioRef.current.src = `/api/stream?url=${encodeURIComponent(track.url)}`;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== 'AbortError') {
            console.error("Playback failed:", err);
          }
        });
      }
      
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeTrack = () => {
    if (audioRef.current && currentTrack) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== 'AbortError') {
            console.error("Playback failed:", err);
          }
        });
      }
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (isPlaying) pauseTrack();
    else resumeTrack();
  };

  const playNext = () => {
    const activeQueue = isShuffle ? shuffledQueue : queue;
    if (activeQueue.length > 0) {
      const nextTrack = activeQueue[0];
      if (isShuffle) {
        setShuffledQueue(prev => prev.slice(1));
      } else {
        setQueue(prev => prev.slice(1));
      }
      playTrack(nextTrack);
    } else if (repeatMode === 'all' && history.length > 0) {
      // Loop back to start if repeat all is on
      const fullHistory = [...history, currentTrack].filter(Boolean) as Track[];
      const firstTrack = fullHistory[fullHistory.length - 1];
      setHistory([]);
      setQueue(fullHistory.slice(0, -1).reverse());
      playTrack(firstTrack);
    } else {
      setIsPlaying(false);
    }
  };

  const playPrevious = () => {
    if (history.length > 0) {
      const prevTrack = history[0];
      setHistory(prev => prev.slice(1));
      if (currentTrack) {
        setQueue(prev => [currentTrack, ...prev]);
      }
      playTrack(prevTrack);
    }
  };

  const addToQueue = (track: Track) => {
    setQueue(prev => [...prev, track]);
    if (isShuffle) {
      setShuffledQueue(prev => [...prev, track].sort(() => Math.random() - 0.5));
    }
  };

  return (
    <MusicContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      queue: isShuffle ? shuffledQueue : queue, 
      currentTime, 
      duration,
      volume,
      repeatMode,
      isShuffle,
      playTrack, 
      pauseTrack, 
      resumeTrack, 
      togglePlay,
      playNext,
      playPrevious,
      addToQueue,
      seekTo,
      setVolume,
      setRepeatMode,
      setIsShuffle
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
