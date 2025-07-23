import { Button } from '../Button';

type DialogProps = {
  isVisible: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible,
  content,
  title,
  onConfirm,
  onCancel,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;
    onCancel();
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs'
      onClick={handleCancel}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
        className='mx-6 flex max-w-2xl flex-col gap-6 rounded-lg bg-slate-100 p-6 text-center shadow-lg shadow-black/30'
      >
        <h3 className='text-xl font-extrabold' id='dialog-title'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className='flex items-center justify-around'>
          <Button
            size='md'
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
            variant='ghost'
          >
            Cancelar
          </Button>
          <Button
            size='md'
            onClick={onConfirm}
            disabled={disabled}
            variant='default'
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
