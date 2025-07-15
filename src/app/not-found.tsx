export default function NotFoundPage() {
  return (
    <>
      <title>Página não encontrada</title>
      <div className='mb-16 flex min-h-[320px] items-center justify-center rounded-xl bg-slate-900 p-8 text-center text-slate-100'>
        <div>
          <h1 className='mb-4 text-7xl/tight font-extrabold'>404</h1>
          <p>Error 404 - A página que você está procurando não existe.</p>
        </div>
      </div>
    </>
  );
}
