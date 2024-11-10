interface HotkeyProps {
  letter: string;
}

export default function Hotkey({ letter }: HotkeyProps) {
  return (
    <div className="text-gray-600 text-xs shadow-md border rounded-sm w-4 h-4 flex items-center justify-center">
      {letter}
    </div>
  );
}
