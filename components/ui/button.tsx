export default function Button({
  title,
  icon,
  onClick,
  children,
  border,
}: {
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  border?: boolean;
}) {
  return (
    <button
      className={`w-fit flex justify-center items-center p-2 text-gray-800 rounded-md transition-colors duration-200 ${
        border ? "border border-gray-200" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-2">
        <span>{icon}</span>
        <div>{children}</div>
        <span className="text-sm font-medium text-gray-800">{title}</span>
      </div>
    </button>
  );
}
