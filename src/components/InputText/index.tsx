import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className='flex flex-col gap-2'>
      {labelText && (
        <label htmlFor={id} className='text-sm'>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={`rounded bg-white p-2 text-base/tight ring-2 ring-slate-400 outline-0 transition placeholder:text-slate-400 read-only:bg-slate-200 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder:text-slate-300 ${props.className}`}
        id={id}
      />
    </div>
  );
}
