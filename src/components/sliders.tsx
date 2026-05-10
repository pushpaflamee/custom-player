import { TimeSlider, VolumeSlider } from '@vidstack/react';

export function Volume() {
  return (
    <VolumeSlider.Root className="group relative inline-flex h-10 cursor-pointer touch-none select-none items-center outline-none w-0 opacity-0 mx-0 transition-all duration-300 ease-in-out group-hover/vol:w-[80px] group-hover/vol:opacity-100 group-hover/vol:mx-2 group-focus-within/vol:w-[80px] group-focus-within/vol:opacity-100 group-focus-within/vol:mx-2 data-[active]:w-[80px] data-[active]:opacity-100 data-[active]:mx-2">
      <VolumeSlider.Track className="ring-media-focus relative z-0 h-[4px] w-full rounded-full bg-white/30 transition-[height] duration-200 ease-out group-hover:h-[8px] data-[active]:h-[8px] group-data-[focus]:ring-[3px]">
        <VolumeSlider.TrackFill className="bg-white absolute h-full w-[var(--slider-fill)] rounded-full will-change-[width]" />
      </VolumeSlider.Track>
      <VolumeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />
    </VolumeSlider.Root>
  );
}

export interface TimeSliderProps {
  thumbnails?: string;
}

export function Time({ thumbnails }: TimeSliderProps) {
  return (
    <TimeSlider.Root className="group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none">
      <TimeSlider.Chapters className="relative flex h-full w-full items-center rounded-[1px]">
        {(cues, forwardRef) =>
          cues.map((cue) => (
            <div
              className="last-child:mr-0 relative mr-0.5 flex h-full w-full items-center rounded-[1px]"
              style={{ contain: 'layout style' }}
              key={cue.startTime}
              ref={forwardRef}
            >
              <TimeSlider.Track className="ring-media-focus relative z-0 h-[4px] w-full rounded-full bg-white/30 transition-[height] duration-200 ease-out group-hover:h-[8px] group-data-[active]:h-[8px] group-data-[focus]:ring-[3px]">
                <TimeSlider.TrackFill className="bg-media-brand absolute h-full w-[var(--chapter-fill)] rounded-full will-change-[width]" />
                <TimeSlider.Progress className="absolute z-10 h-full w-[var(--chapter-progress)] rounded-full bg-white/50 will-change-[width]" />
              </TimeSlider.Track>
            </div>
          ))
        }
      </TimeSlider.Chapters>

      <TimeSlider.Thumb className="absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-0 ring-white/40 transition-opacity will-change-[left] group-data-[active]:opacity-100 group-data-[dragging]:ring-4" />

      <TimeSlider.Preview className="pointer-events-none flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100">
        {thumbnails ? (
          <TimeSlider.Thumbnail.Root
            src={thumbnails}
            className="block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white/20 bg-black rounded-md shadow-lg"
          >
            <TimeSlider.Thumbnail.Img />
          </TimeSlider.Thumbnail.Root>
        ) : null}
        <TimeSlider.ChapterTitle className="mt-1.5 text-sm drop-shadow-md font-medium text-white" />
        <TimeSlider.Value className="mt-1 bg-black/70 backdrop-blur-md rounded-md px-2.5 py-0.5 text-[13px] font-medium text-white shadow-md tracking-wide" />
      </TimeSlider.Preview>
    </TimeSlider.Root>
  );
}
