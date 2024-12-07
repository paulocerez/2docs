export default function Button({
  title,
  icon,
  onClick,
  children,
  border,
  className = "",
  disabled = false,
}: {
  title?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  border?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`w-fit flex justify-center items-center text-gray-800 rounded-md transition-colors duration-200 ${
        border ? "border border-gray-200" : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={`flex flex-row items-center ${title ? "gap-0.5" : "gap-0"}`}
      >
        <span className="hover:bg-gray-100 p-2 rounded-md">{icon}</span>
        <div>{children}</div>
        {title && (
          <span className="text-sm font-medium text-gray-800">{title}</span>
        )}
      </div>
    </button>
  );
}
