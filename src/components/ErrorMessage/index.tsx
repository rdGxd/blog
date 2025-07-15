'use client';

type ErrorMessageProps = {
  pageTitle: string;
  contentTitle: string;
  content: React.ReactNode;
};

export default function ErrorMessage({
  pageTitle,
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <div className='mb-16 flex min-h-[320px] items-center justify-center rounded-xl bg-slate-900 p-8 text-center text-slate-100'>
        <div>
          <h1 className='mb-4 text-7xl/tight font-extrabold'>{contentTitle}</h1>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}
