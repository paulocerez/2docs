interface MessageProps {
  text: string;
}
export default function Message({ text }: MessageProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md text-center text-xs">
      <p>{text}</p>
    </div>
  );
}
