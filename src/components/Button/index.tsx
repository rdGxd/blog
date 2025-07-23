type ButtonVariants = 'default' | 'ghost' | 'danger';

type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant: ButtonVariants;
  size: ButtonSizes;
} & React.ComponentProps<'button'>;

export function Button({
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariants, string> = {
    default: 'bg-blue-600 text-blue-100 hover:bg-blue-700',
    ghost: 'bg-slate-200 text-blue-900 hover:bg-slate-500',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizeClasses: Record<ButtonSizes, string> = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };

  const buttonClasses = `${variantClasses[variant]} ${sizeClasses[size]} `;

  return (
    <>
      <button {...props} className={`${buttonClasses} rounded-md`} />
    </>
  );
}
