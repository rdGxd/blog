type ButtonVariants = 'default' | 'ghost' | 'danger';

type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export function Button({ variant, size = 'md', ...props }: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: 'bg-blue-600 text-blue-100 hover:bg-blue-700',
    ghost: 'bg-slate-300 text-blue-900 hover:bg-slate-400',
    danger: 'bg-red-500 text-white hover:bg-red-700',
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: 'text-xs/tight py-1 px-2 rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1',
    md: 'text-base/tight py-2 px-4 rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2',
    lg: 'text-lg/tight py-4 px-6 rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3',
  };

  const buttonClasses = `${buttonVariants[variant]} ${buttonSizes[size]} flex items-center justify-center cursor-pointer transition disabled:cursor-not-allowed  disabled:bg-slate-200  disabled:text-slate-400 disabled:opacity-50 ${props.className}`;

  return (
    <>
      <button {...props} className={`${buttonClasses}`} />
    </>
  );
}
