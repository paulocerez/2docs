interface HotkeyProps {
  letter: string;
}

export default function Hotkey({ letter }: HotkeyProps) {
  return (
    <div className="text-gray-600 shadow-md border rounded-sm px-1">
      {letter}
    </div>
  );
}
