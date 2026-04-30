'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import BottomNavBar from '@/components/BottomNavBar';
import { useMusic } from '@/context/MusicContext';

interface SearchResult {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export default function Discover() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { playTrack, currentTrack, isPlaying, togglePlay } = useMusic();

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
      handleSearch(q);
    }
  }, [searchParams]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-20 bg-[#1A1A1A]/80 backdrop-blur-2xl border-b border-white/10">
        <div className="flex items-center gap-4 flex-1">
          <form onSubmit={onSearchSubmit} className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Search pulse, artists, moods..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container/50 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-tertiary/50 transition-colors"
            />
          </form>
        </div>
        <div className="hidden md:block text-2xl font-black text-white tracking-[0.2em] uppercase font-h1 px-10">PULSE</div>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 relative">
          <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Ws5bf_qnTf_MB6YQWfiN9wBbeH45Tu3ZPr2FM59GeS5iJDMTt-ciaDlkbtVfKGdaeuA349q1y0rZDVPJo8oQssxsXQFQsihhf_qQjrVWToQCv1X4wjDLCe-iiK8_MwDe9IvIVB--mooyHM8yO9pmMMYJAa80_dA9ZAwvWsaOerWehdrkM6KFv-op0-1BRWkkO1JXiyh9M7vAj0rlJXQ_h1IIxoJEq5vzcUEOJw6Gimcm4C9-l366jdJV1ZB_S6uLwtackW6dn1zb" alt="User" fill priority sizes="40px" className="object-cover" />
        </div>
      </header>

      <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.section key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <h2 className="text-on-surface font-h3">Search Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((track, i) => (
                  <motion.div 
                    key={track.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-[#1A1A1A]/60 backdrop-blur-xl border border-white/10 rounded-[24px] p-4 group hover:bg-[#252525]/60 transition-all cursor-pointer"
                    onClick={() => playTrack(track)}
                  >
                    <div className="relative aspect-square rounded-[16px] overflow-hidden mb-4">
                      <Image src={track.thumbnail} alt={track.title} fill sizes="280px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-tertiary text-black flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {currentTrack?.id === track.id && isPlaying ? 'pause' : 'play_arrow'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-white font-bold truncate mb-1">{track.title}</h4>
                    <p className="text-on-surface-variant text-sm truncate">{track.artist}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.div key="placeholders" className="space-y-16 pt-4 text-center">
              <span className="material-symbols-outlined text-8xl text-white/10">music_note</span>
              <p className="text-on-surface-variant text-lg">Search for tracks to begin your journey</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-tertiary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {currentTrack && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-[90px] md:bottom-6 left-0 right-0 z-40 px-6 max-w-[1000px] mx-auto">
          <div className="bg-[#1A1A1A]/90 backdrop-blur-2xl border border-white/10 rounded-[24px] p-3 flex items-center justify-between shadow-2xl">
            <Link href="/player" className="flex items-center gap-3 flex-1 overflow-hidden">
              <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0">
                <Image src={currentTrack.thumbnail} alt={currentTrack.title} fill sizes="48px" className="object-cover" />
              </div>
              <div className="flex flex-col truncate">
                <span className="font-bold text-on-surface text-sm truncate">{currentTrack.title}</span>
                <span className="text-on-surface-variant text-xs truncate">{currentTrack.artist}</span>
              </div>
            </Link>
            <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-tertiary text-black flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>
        </motion.div>
      )}

      <BottomNavBar />
    </div>
  );
}
