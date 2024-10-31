interface ChecklistItemProps {
  checked: boolean;
  label: string;
}

const checkedStyle = "text-green-500 bg-green-50 border-green-300";
const uncheckedStyle = "text-red-500 bg-red-50 border-red-300";
const checkedIcon = "bg-green-400";
const uncheckedIcon = "bg-red-400";

export default function ChecklistItem({ checked, label }: ChecklistItemProps) {
  return (
    <div
      className={`${
        checked ? checkedStyle : uncheckedStyle
      } flex flex-row justify-center items-center px-1.5 py-0.5 border rounded-full space-x-1 gap-0.5`}
    >
      <div
        className={`rounded-full w-2 h-2 ${
          checked ? checkedIcon : uncheckedIcon
        }`}
      ></div>
      <div>{label}</div>
    </div>
  );
}
