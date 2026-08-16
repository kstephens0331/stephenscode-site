import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, RotateCcw } from 'lucide-react';

export interface DemoVideo {
  title: string;
  duration: string; // "mm:ss"
  thumbnail: string;
}

interface VideoModalProps {
  video: DemoVideo | null;
  onClose: () => void;
}

const parseDuration = (duration: string): number => {
  const [mins, secs] = duration.split(':').map((n) => parseInt(n, 10) || 0);
  return mins * 60 + secs;
};

const formatTime = (totalSeconds: number): string => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = video ? parseDuration(video.duration) : 0;
  const ended = total > 0 && elapsed >= total;

  useEffect(() => {
    // Auto-play when a video is opened
    setElapsed(0);
    setPlaying(video !== null);
  }, [video]);

  useEffect(() => {
    if (playing && video) {
      // Simulated playback runs faster than real time so visitors see progress
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev + 1 >= total) {
            setPlaying(false);
            return total;
          }
          return prev + 1;
        });
      }, 150);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, video, total]);

  if (!video) return null;

  const handleClose = () => {
    setPlaying(false);
    setElapsed(0);
    onClose();
  };

  const togglePlay = () => {
    if (ended) {
      setElapsed(0);
      setPlaying(true);
    } else {
      setPlaying((p) => !p);
    }
  };

  const progressPercent = total > 0 ? (elapsed / total) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-[#000814] rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4">
          <h3 className="text-white font-bold truncate pr-4">{video.title}</h3>
          <button
            onClick={handleClose}
            aria-label="Close video"
            className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Player Area */}
        <div className="relative aspect-video bg-black">
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              playing ? 'opacity-90' : 'opacity-50'
            }`}
          />
          {!playing && (
            <button
              onClick={togglePlay}
              aria-label={ended ? 'Replay video' : 'Play video'}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="bg-[#ffc300] p-5 rounded-full hover:scale-110 transition-transform inline-flex">
                {ended ? (
                  <RotateCcw className="w-10 h-10 text-[#000814]" />
                ) : (
                  <Play className="w-10 h-10 text-[#000814]" />
                )}
              </span>
            </button>
          )}
          {ended && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-white font-semibold">
              Thanks for watching! Tap to replay.
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 flex items-center gap-4">
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : ended ? 'Replay' : 'Play'}
            className="bg-[#ffc300] p-3 rounded-full hover:bg-[#ffcd1a] transition-colors flex-shrink-0"
          >
            {playing ? (
              <Pause className="w-5 h-5 text-[#000814]" />
            ) : ended ? (
              <RotateCcw className="w-5 h-5 text-[#000814]" />
            ) : (
              <Play className="w-5 h-5 text-[#000814]" />
            )}
          </button>
          <span className="text-white text-sm font-mono flex-shrink-0 w-12">{formatTime(elapsed)}</span>
          <input
            type="range"
            aria-label="Seek video"
            min={0}
            max={total}
            value={elapsed}
            onChange={(e) => setElapsed(Number(e.target.value))}
            className="flex-1 accent-[#ffc300]"
          />
          <span className="text-gray-400 text-sm font-mono flex-shrink-0 w-12 text-right">{video.duration}</span>
        </div>
        <div className="h-1 bg-white/10">
          <div className="h-full bg-[#ffc300] transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
