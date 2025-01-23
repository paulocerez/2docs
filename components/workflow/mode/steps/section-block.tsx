interface SectionBlockProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function SectionBlock({
  title,
  description,
  children,
}: SectionBlockProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 leading-6">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
