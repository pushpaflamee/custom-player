import { useState } from 'react';
import {
  FullscreenButton,
  MuteButton,
  PlayButton,
  Time,
  Tooltip,
  useMediaState,
} from '@vidstack/react';
// 1. Alias 'Play' to 'PlayIcon' here:
import {
  Play as PlayIcon,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  RectangleHorizontal,
} from 'lucide-react';

export function Play() {
  const isPaused = useMediaState('paused');
  return (
    <PlayButton className="ring-media-focus relative inline-flex h-10 w-14 cursor-pointer items-center justify-center rounded-full outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
      {/* 2. Use PlayIcon here instead of Play: */}
      {isPaused ? (
        <PlayIcon className="h-6 w-6 fill-white" />
      ) : (
        <Pause className="h-6 w-6 fill-white" />
      )}
    </PlayButton>
  );
}

export function Mute() {
  const volume = useMediaState('volume'),
    isMuted = useMediaState('muted');
  return (
    <MuteButton className="group ring-media-focus relative inline-flex h-10 w-14 cursor-pointer items-center justify-center rounded-full outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
      {isMuted || volume === 0 ? (
        <VolumeX className="h-6 w-6" />
      ) : volume < 0.5 ? (
        <Volume1 className="h-6 w-6" />
      ) : (
        <Volume2 className="h-6 w-6" />
      )}
    </MuteButton>
  );
}

export function TimePill() {
  const [showRemainder, setShowRemainder] = useState(false);
  return (
    <button
      onClick={() => setShowRemainder(!showRemainder)}
      className="ring-media-focus relative inline-flex h-10 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-medium outline-none ring-inset hover:bg-white/20 focus-visible:ring-4 transition-all duration-150 ease-in-out"
    >
      <Time type="current" remainder={showRemainder} />
      <div className="mx-1 text-white/80">/</div>
      <Time type="duration" />
    </button>
  );
}

export function Theatre({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="ring-media-focus relative inline-flex h-10 w-12 cursor-pointer items-center justify-center rounded-full outline-none ring-inset hover:bg-white/20"
    >
      <RectangleHorizontal className="h-6 w-6" />
    </button>
  );
}

export function Fullscreen() {
  const isActive = useMediaState('fullscreen');
  return (
    <FullscreenButton className="ring-media-focus group relative inline-flex h-10 w-12 cursor-pointer items-center justify-center rounded-full outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
      {isActive ? (
        <Minimize className="h-6 w-6" />
      ) : (
        <Maximize className="h-6 w-6" />
      )}
    </FullscreenButton>
  );
}
