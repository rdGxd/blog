import { formatDateTime } from "@/utils/format-datetime";

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      dateTime={dateTime}
      className="text-slate-600 text-sm/tight block"
      title={formatDateTime(dateTime)}
    >
      {formatDateTime(dateTime)}
    </time>
  );
}
