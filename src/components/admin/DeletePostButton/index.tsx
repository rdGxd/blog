'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import { Dialog } from '@/components/Dialog';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type DeletePostButtonProps = {
  title: string;
  id: string;
};

export function DeletePostButtonAdmin({ title, id }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm() {
    toast.dismiss();
    startTransition(async () => {
      const result = await deletePostAction(id);

      if (result.error) {
        toast.error(`Erro ao excluir o post "${title}": ${result.error}`);
        return;
      }

      toast.success(`Post "${title}" excluído com sucesso.`);

      setShowDialog(false);
    });
  }

  return (
    <>
      <button
        disabled={isPending}
        onClick={handleClick}
        className={`cursor-pointer text-red-500 transition hover:scale-110 hover:text-red-700 disabled:cursor-not-allowed disabled:text-slate-600 [&_svg]:h-4 [&_svg]:w-4`}
        aria-label={`Excluir post ${title}`}
        title={`Excluir post ${title}`}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title={`Excluir post ${title}`}
          content={`Tem certeza que deseja excluir o post "${title}"?`}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
