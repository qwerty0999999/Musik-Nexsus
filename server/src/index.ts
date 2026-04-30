import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import play from 'play-dl';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint untuk mencari lagu
app.get('/api/search', async (req, res) => {
  const query = req.query.q as string;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const results = await play.search(query, {
      limit: 10,
      source: { youtube: 'video' }
    });

    const formattedResults = results.map(video => ({
      id: video.id,
      title: video.title,
      artist: video.channel?.name || 'Unknown Artist',
      thumbnail: video.thumbnails[0]?.url || '',
      duration: video.durationRaw,
      url: video.url
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search music' });
  }
});

// Endpoint untuk mendapatkan stream audio
app.get('/api/stream', async (req, res) => {
  const url = req.query.url as string;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const stream = await play.stream(url);
    
    // Set headers untuk streaming audio
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.stream.pipe(res);
  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).json({ error: 'Failed to stream audio' });
  }
});

app.get('/', (req, res) => {
  res.send('Musik Nexsus API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
