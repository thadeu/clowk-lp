'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

// Fallback: mp4 for Safari (native HLS) or browsers without MSE
const VIDEO_HLS = '/videos/demo.m3u8';
const VIDEO_MP4 = '/videos/demo.mp4';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);

  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function VideoBlock() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [controlsHidden, setControlsHidden] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const showControls = !controlsHidden || !playing;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        startLevel: -1,
        capLevelToPlayerSize: true,
      });

      hls.loadSource(VIDEO_HLS);
      hls.attachMedia(video);
      hlsRef.current = hls;

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = VIDEO_HLS;
    } else {
      // Fallback mp4
      video.src = VIDEO_MP4;
    }
  }, []);

  // Time updates
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const onTime = () => setCurrentTime(video.currentTime);
    const onDuration = () => setDuration(video.duration || 0);
    const onEnded = () => setPlaying(false);

    video.addEventListener('timeupdate', onTime);
    video.addEventListener('loadedmetadata', onDuration);
    video.addEventListener('durationchange', onDuration);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('loadedmetadata', onDuration);
      video.removeEventListener('durationchange', onDuration);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      const bar = progressRef.current;

      if (!video || !bar || !duration) return;

      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

      video.currentTime = ratio * duration;
    },
    [duration]
  );

  const toggleFullscreen = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  }, []);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);

    setControlsHidden(false);

    if (playing) {
      hideTimer.current = setTimeout(() => setControlsHidden(true), 3000);
    }
  }, [playing]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <section className="py-24 px-6 bg-[#FEF2F4]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#F43F5E] tracking-widest uppercase mb-3">See it in action</p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#18181B] leading-tight mb-4">
            Set up auth in under 5 minutes
          </h2>
          <p className="text-[#71717A] text-lg max-w-xl mx-auto">
            Watch how to add authentication to your app with Clowk, from scratch.
          </p>
        </div>

        {/* Video player */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[#FBCCD3] shadow-xl shadow-[#F43F5E]/10 bg-[#0C0014] group"
          style={{ aspectRatio: '16/9' }}
          onMouseMove={scheduleHide}
          onMouseLeave={() => playing && setControlsHidden(true)}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="metadata"
            poster="/videos/demo-poster.jpg"
          />

          {/* Center play overlay (visible when paused) */}
          {!playing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/30 z-10">
              <button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-[#F43F5E] flex items-center justify-center shadow-2xl shadow-[#F43F5E]/40 hover:bg-[#E8385A] hover:scale-105 transition-all"
              >
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </button>
              <p className="text-white/60 text-sm font-medium">5 min walkthrough</p>
            </div>
          )}

          {/* Bottom controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-300 ${
              showControls || !playing ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Progress bar */}
            <div
              ref={progressRef}
              className="h-1 bg-white/10 cursor-pointer group/progress mx-4 mb-1 rounded-full overflow-hidden"
              onClick={seek}
            >
              <div
                className="h-full bg-[#F43F5E] rounded-full transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Control buttons */}
            <div className="flex items-center gap-3 px-4 py-3">
              {/* Play/Pause */}
              <button onClick={togglePlay} className="text-white/80 hover:text-white transition-colors">
                {playing ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                )}
              </button>

              {/* Time */}
              <span className="text-white/50 text-xs font-mono min-w-[80px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex-1" />

              {/* Mute */}
              <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                {muted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.15a.75.75 0 011.28.53v12.74a.75.75 0 01-1.28.53l-4.72-3.15H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                    />
                  </svg>
                )}
              </button>

              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="text-white/80 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
