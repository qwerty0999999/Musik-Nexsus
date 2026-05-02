'use client';

import React, { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  color?: string;
}

export default function AudioVisualizer({ audioRef, isPlaying, color = '#00e293' }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    if (!contextRef.current) {
      contextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyzerRef.current = contextRef.current.createAnalyser();
      sourceRef.current = contextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyzerRef.current);
      analyzerRef.current.connect(contextRef.current.destination);
    }

    const analyzer = analyzerRef.current!;
    analyzer.fftSize = 256;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;

    const draw = () => {
      if (!isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      animationRef.current = requestAnimationFrame(draw);
      analyzer.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '33'); // Adding transparency

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [audioRef, isPlaying, color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-32 opacity-50 pointer-events-none"
      width={600}
      height={128}
    />
  );
}
