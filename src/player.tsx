import { useEffect, useRef, useState } from 'react';
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  useMediaRemote,
  type MediaPlayerInstance,
} from '@vidstack/react';
import {
  FastForward,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RectangleHorizontal,
  Maximize,
  Minimize,
} from 'lucide-react';

import { VideoLayout } from './components/layouts/video-layout';
import { textTracks } from './tracks';

export function Player() {
  const player = useRef<MediaPlayerInstance>(null);
  const remote = useMediaRemote(player);

  // --- States ---
  const [isTheatre, setIsTheatre] = useState(false);
  const [isFF, setIsFF] = useState(false);
  const [indicator, setIndicator] = useState<string | null>(null);
  const [indicatorKey, setIndicatorKey] = useState(0); // Used to re-trigger CSS animations
  const wasMuted = useRef(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const prevSpeed = useRef(1);

  // --- Theatre Mode Body Class ---
  useEffect(() => {
    if (isTheatre) document.body.classList.add('theatre-mode');
    else document.body.classList.remove('theatre-mode');
    return () => document.body.classList.remove('theatre-mode');
  }, [isTheatre]);

  // --- Center Indicator Trigger ---
  const triggerIndicator = (icon: string) => {
    setIndicator(icon);
    setIndicatorKey((prev) => prev + 1);
  };

  const toggleTheatre = () => {
    setIsTheatre((prev) => !prev);
    triggerIndicator('theatre');
  };

  // --- Fast Forward Logic ---
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('.vds-controls'))
      return;
    holdTimeout.current = setTimeout(() => {
      setIsFF(true);
      prevSpeed.current = player.current?.state.playbackRate || 1;
      remote.changePlaybackRate(2);
    }, 400);
  };

  useEffect(() => {
    const handlePointerUp = (e: PointerEvent) => {
      if (holdTimeout.current) clearTimeout(holdTimeout.current);
      if (isFF) {
        setIsFF(false);
        remote.changePlaybackRate(prevSpeed.current);
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('pointerup', handlePointerUp, { capture: true });
    window.addEventListener('pointercancel', handlePointerUp, {
      capture: true,
    });
    return () => {
      window.removeEventListener('pointerup', handlePointerUp, {
        capture: true,
      });
      window.removeEventListener('pointercancel', handlePointerUp, {
        capture: true,
      });
    };
  }, [isFF, remote]);

  return (
    <MediaPlayer
      className="ring-media-focus aspect-video w-full overflow-hidden rounded-md bg-slate-950 font-sans text-white data-[focus]:ring-4"
      title="Sprite Fight"
      src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      crossOrigin
      playsInline
      ref={player}
      onPointerDownCapture={handlePointerDown}
      onPlay={() => triggerIndicator('play')}
      onPause={() => triggerIndicator('pause')}
      onFullscreenChange={(isFullscreen) =>
        triggerIndicator(isFullscreen ? 'fullscreen-enter' : 'fullscreen-exit')
      }
      onVolumeChange={(detail) => {
        if (detail.muted !== wasMuted.current) {
          triggerIndicator(detail.muted ? 'mute' : 'unmute');
          wasMuted.current = detail.muted;
        }
      }}
    >
      <MediaProvider>
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src="https://wsrv.nl/?url=https://artworks.thetvdb.com/banners/v4/episode/11441213/screencap/694bdf2fb0ee5.jpg&w=500&q=80"
          alt="Girl walks into campfire"
        />
        {textTracks.map((track) => (
          <Track {...track} key={track.src} />
        ))}
      </MediaProvider>

      {/* Overlays */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-[5%] xl:top-[3%] bg-black/60 backdrop-blur-md rounded-full px-4 py-2 max-w-xs z-20 flex items-center justify-center gap-1.5 text-xs lg:text-sm pointer-events-none text-white transition-opacity duration-150 ${
          isFF ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <FastForward className="h-4 w-4" />
        <p className="font-medium text-center mt-0.5">2x</p>
      </div>

      <div
        key={indicatorKey}
        className="center-indicator absolute inset-0 z-20 pointer-events-none flex items-center justify-center show"
      >
        {indicator && (
          <div className="bg-black/40 backdrop-blur-md rounded-full p-5 text-white shadow-lg">
            {indicator === 'play' && <Play className="h-12 w-12 ml-1" />}
            {indicator === 'pause' && <Pause className="h-12 w-12" />}
            {indicator === 'unmute' && <Volume2 className="h-12 w-12" />}
            {indicator === 'mute' && <VolumeX className="h-12 w-12" />}
            {indicator === 'theatre' && (
              <RectangleHorizontal className="h-12 w-12" />
            )}
            {indicator === 'fullscreen-enter' && (
              <Maximize className="h-12 w-12" />
            )}
            {indicator === 'fullscreen-exit' && (
              <Minimize className="h-12 w-12" />
            )}
          </div>
        )}
      </div>

      <VideoLayout
        thumbnails="https://mgstatics.xyz/thumbnails/68a7d9b9b5c148d8ca32612032e8bde8/thumbnails.vtt"
        toggleTheatre={toggleTheatre}
      />
    </MediaPlayer>
  );
}
