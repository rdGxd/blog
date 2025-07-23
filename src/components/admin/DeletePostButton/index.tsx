'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

type DeletePostButtonProps = {
  title: string;
  id: string;
};

export function DeletePostButtonAdmin({ title, id }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm(`Tem certeza que deseja excluir o post "${title}"?`)) return;

    startTransition(async () => {
      const result = await deletePostAction(id);
      console.log(`Post "${result}" deleted successfully.`);
    });
  }

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className={`cursor-pointer text-red-500 transition hover:scale-110 hover:text-red-700 disabled:cursor-not-allowed disabled:text-slate-600 [&_svg]:h-4 [&_svg]:w-4`}
      aria-label={`Excluir post ${title}`}
      title={`Excluir post ${title}`}
    >
      <Trash2Icon />
    </button>
  );
}
