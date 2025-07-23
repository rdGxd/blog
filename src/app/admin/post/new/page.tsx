import { InputText } from '@/components/InputText';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <>
      <div className='flex flex-col gap-6'>
        <InputText placeholder='Digite seu nome' labelText='Nome' />
        <InputText placeholder='Digite seu email' labelText='Email' />
      </div>
    </>
  );
}
