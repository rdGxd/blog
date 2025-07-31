'use client';

import { logoutAction } from '@/actions/login/logout-action';
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  UserPenIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navClasses = `bg-slate-900 text-slate-100 rounded-lg flex flex-col  mb-8 sm:flex-row sm:flex-wrap ${!isOpen && 'h-10'}
  ${!isOpen && 'overflow-hidden'}
  sm:overflow-visible sm:h-auto
  `;
  const linkClasses = `[&>svg]:w-[16px] [&>svg]:h-[16px] flex items-center gap-2 px-4 hover:bg-slate-800 flex transition hover:bg-slate-800 justify-start h-10 shrink-0 rounded-lg cursor-pointer`;

  const openCloseBtnClasses = `${linkClasses} text-blue-200 italic sm:hidden`;

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen(s => !s)}
        className={openCloseBtnClasses}
      >
        {!isOpen ? (
          <>
            <MenuIcon />
            Menu
          </>
        ) : (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>
      <a href='/' target='_blank' className={linkClasses}>
        <HouseIcon />
        Home
      </a>
      <Link href='/admin/post' className={linkClasses}>
        <FileTextIcon />
        Posts
      </Link>
      <Link href='/admin/user' className={linkClasses}>
        <UserPenIcon />
        Seus dados
      </Link>
      <Link href='/admin/post/new' className={linkClasses}>
        <PlusIcon />
        Criar post
      </Link>

      <a href='' className={linkClasses} onClick={handleLogout}>
        {isPending ? (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        ) : (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
}
