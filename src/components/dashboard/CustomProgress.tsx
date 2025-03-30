export default function CustomProgress({
  value,
  className = "",
}: {
  value: number;
  className?: string;
}) {
  return (
    <div
      className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-[#39CCB5] rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
