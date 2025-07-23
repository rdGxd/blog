import { FileTextIcon, HouseIcon } from 'lucide-react';
import Link from 'next/link';

export function MenuAdmin() {
  const navClasses =
    'bg-slate-900 text-slate-100 rounded-lg flex flex-col overflow-hidden mb-8 sm:flex-row sm:flex-wrap';
  const linkClasses =
    '[&>svg]:w-[16px] [&>svg]:h-[16px] flex items-center gap-2 px-4 hover:bg-slate-800 flex transition hover:bg-slate-800 justify-start h-10 shrink-0 rounded-lg';

  return (
    <nav className={navClasses}>
      <a href='/' target='_blank' className={linkClasses}>
        <HouseIcon />
        Home
      </a>
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>{' '}
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
    </nav>
  );
}
