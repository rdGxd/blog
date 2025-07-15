import { formatDateTime } from '@/utils/format-datetime';

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      dateTime={dateTime}
      className='block text-sm/tight text-slate-600'
      title={formatDateTime(dateTime)}
    >
      {formatDateTime(dateTime)}
    </time>
  );
}
