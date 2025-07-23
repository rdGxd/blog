import { Button } from '@/components/Button';
import { BanIcon, BugIcon, CheckIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <>
      <div className='flex flex-wrap items-center gap-4 py-16'>
        <Button variant='danger' size='sm'>
          <BugIcon /> Confirma
        </Button>
        <Button variant='ghost' size='md'>
          <BanIcon /> Cancelar
        </Button>
        <Button variant='default' size='lg'>
          <CheckIcon /> OK
        </Button>
      </div>

      <div className='flex flex-wrap items-center gap-4 py-16'>
        <Button variant='danger' size='sm' disabled>
          Confirma <BugIcon />
        </Button>
        <Button variant='default' size='md' disabled>
          <BanIcon /> Confirma
        </Button>
        <Button variant='default' size='lg' disabled>
          <CheckIcon /> OK
        </Button>
      </div>
    </>
  );
}
