'use client';

import { Trash2Icon } from 'lucide-react';

type DeletePostButtonProps = {
  title: string;
  id: string;
};

export function DeletePostButtonAdmin({ title, id }: DeletePostButtonProps) {
  return (
    <button
      className={`cursor-pointer text-red-500 transition hover:scale-110 hover:text-red-700 [&_svg]:h-4 [&_svg]:w-4`}
      aria-label={`Excluir post ${title}`}
      title={`Excluir post ${title}`}
    >
      <Trash2Icon />
    </button>
  );
}
