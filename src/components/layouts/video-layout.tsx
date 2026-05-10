import { Captions, Controls, Gesture } from '@vidstack/react';
import * as Buttons from '../buttons';
import * as Menus from '../menus';
import * as Sliders from '../sliders';

export interface VideoLayoutProps {
  thumbnails?: string;
  toggleTheatre: () => void;
}

export function VideoLayout({ thumbnails, toggleTheatre }: VideoLayoutProps) {
  return (
    <>
      <Gestures />
      <Captions className="media-preview:opacity-0 media-controls:bottom-[85px] media-captions:opacity-100 absolute inset-0 bottom-2 z-10 select-none break-words opacity-0 transition-[opacity,bottom] duration-300" />

      <Controls.Root className="vds-controls media-controls:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity">
        <div className="pointer-events-none flex-1" />

        <Controls.Group className="flex w-full items-center px-2">
          <Sliders.Time thumbnails={thumbnails} />
        </Controls.Group>

        <Controls.Group className="-mt-0.5 flex w-full items-center px-2 pb-2">
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full px-1 py-1">
            <Buttons.Play />
          </div>

          <div className="group/vol ml-2 flex items-center bg-black/40 backdrop-blur-md rounded-full px-1 py-1 transition-all duration-300 ease-in-out">
            <Buttons.Mute />
            <Sliders.Volume />
          </div>

          <div className="ml-2 flex items-center bg-black/40 backdrop-blur-md rounded-full px-1 py-1">
            <Buttons.TimePill />
          </div>

          <span className="inline-block flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-2 text-sm font-medium text-white/70"></span>

          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-[1.5rem] px-1 py-1 ml-2">
            <Menus.Settings />
            <Buttons.Theatre onClick={toggleTheatre} />
            <Buttons.Fullscreen />
          </div>
        </Controls.Group>
      </Controls.Root>
    </>
  );
}

function Gestures() {
  return (
    <>
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="pointerup"
        action="toggle:paused"
      />
      <Gesture
        className="absolute left-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:-10"
      />
      <Gesture
        className="absolute right-0 top-0 z-10 block h-full w-1/5"
        event="dblpointerup"
        action="seek:10"
      />
    </>
  );
}
