import {
  Menu,
  useCaptionOptions,
  usePlaybackRateOptions,
  useVideoQualityOptions,
} from '@vidstack/react';
import {
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Captions,
  Video,
  Circle,
  CheckCircle2,
} from 'lucide-react';

export function Settings() {
  return (
    <Menu.Root>
      <Menu.Button className="group ring-media-focus relative mr-0.5 inline-flex h-10 w-12 cursor-pointer items-center justify-center rounded-full outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
        <SettingsIcon className="h-6 w-6 transform transition-transform duration-200 ease-out group-data-[open]:rotate-90 text-white" />
      </Menu.Button>

      {/* h-[var(--menu-height)] allows Vidstack to dynamically resize the menu 
        based on the active panel's height. 
      */}
      <Menu.Content
        className="relative flex h-[var(--menu-height)] max-h-[400px] min-w-[260px] flex-col overflow-hidden rounded-md border border-white/10 bg-black/70 p-2.5 text-[15px] font-medium outline-none backdrop-blur-lg transition-[height] duration-300 will-change-[height] animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4"
        placement="top end"
        offset={30}
      >
        <div className="flex w-full flex-col">
          <SpeedSubmenu />
          <CaptionSubmenu />
          <QualitySubmenu />
        </div>
      </Menu.Content>
    </Menu.Root>
  );
}

function SpeedSubmenu() {
  const options = usePlaybackRateOptions({ normalLabel: 'Normal' });
  const hint =
    options.selectedValue === '1' ? 'Normal' : options.selectedValue + 'x';
  return (
    <Menu.Root>
      <SubmenuButton label="Playback Speed" hint={hint} icon={Gauge} />
      <SubmenuPanel title="Playback Speed">
        <Menu.RadioGroup
          className="flex w-full flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>
              {label}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </SubmenuPanel>
    </Menu.Root>
  );
}

function CaptionSubmenu() {
  const options = useCaptionOptions({ offLabel: 'Off' });
  const hint = options.selectedTrack?.label ?? 'Off';
  return (
    <Menu.Root>
      <SubmenuButton
        label="Captions"
        hint={hint}
        icon={Captions}
        disabled={options.disabled}
      />
      <SubmenuPanel title="Captions">
        <Menu.RadioGroup
          className="flex w-full flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>
              {label}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </SubmenuPanel>
    </Menu.Root>
  );
}

function QualitySubmenu() {
  const options = useVideoQualityOptions({ autoLabel: 'Auto' });
  const hint = options.selectedQuality?.height
    ? `${options.selectedQuality.height}p`
    : 'Auto';
  return (
    <Menu.Root>
      <SubmenuButton
        label="Quality"
        hint={hint}
        icon={Video}
        disabled={options.disabled}
      />
      <SubmenuPanel title="Quality">
        <Menu.RadioGroup
          className="flex w-full flex-col"
          value={options.selectedValue}
        >
          {options.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>
              {label}
            </Radio>
          ))}
        </Menu.RadioGroup>
      </SubmenuPanel>
    </Menu.Root>
  );
}

// --- REUSABLE PANEL COMPONENTS ---

function SubmenuPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Menu.Content className="absolute inset-0 z-10 hidden w-full flex-col bg-black/95 p-2.5 data-[open]:flex transition-all">
      <Menu.Button className="ring-media-focus sticky top-0 z-20 mb-2 flex w-full cursor-pointer items-center rounded-md p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px]">
        <ChevronLeft className="mr-1.5 h-5 w-5 text-white" />
        <span className="font-semibold text-white">{title}</span>
      </Menu.Button>
      <div className="flex w-full flex-col overflow-y-auto overscroll-y-contain">
        {children}
      </div>
    </Menu.Content>
  );
}

function SubmenuButton({ label, hint, icon: Icon, disabled }: any) {
  return (
    <Menu.Button
      disabled={disabled}
      className="ring-media-focus flex w-full cursor-pointer items-center !rounded-md p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px] text-white"
    >
      <Icon className="mr-1.5 h-5 w-5" />
      <span className="ml-1.5">{label}</span>
      <span className="ml-auto text-sm text-white/50">{hint}</span>
      <ChevronRight className="ml-0.5 h-[18px] w-[18px] text-white/50" />
    </Menu.Button>
  );
}

function Radio({ children, ...props }: Menu.RadioProps) {
  return (
    <Menu.Radio
      className="ring-media-focus group flex w-full cursor-pointer items-center !rounded-md p-2.5 outline-none data-[hocus]:bg-white/10 data-[focus]:ring-[3px] text-white"
      {...props}
    >
      <Circle className="h-4 w-4 text-white/40 group-data-[checked]:hidden" />
      <CheckCircle2 className="text-media-brand hidden h-4 w-4 group-data-[checked]:block" />
      <span className="ml-2">{children}</span>
    </Menu.Radio>
  );
}
