export interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  url: string;
  duration?: string;
}

export interface SearchResult extends Track {}

export interface Mood {
  label: string;
  icon: string;
  color: string;
  query: string;
}
