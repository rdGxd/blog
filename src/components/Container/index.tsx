type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className='bg--100 min-h-screen text-slate-900'>
      <div className='mx-auto max-w-screen-lg px-8'>{children}</div>
    </div>
  );
}
