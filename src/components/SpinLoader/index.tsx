export type SpinLoaderProps = {
  className?: string;
};

export const SpinLoader = ({ className = "" }: SpinLoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
    </div>
  );
};
