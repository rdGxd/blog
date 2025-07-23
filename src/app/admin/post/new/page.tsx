import { Button } from '@/components/Button';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <div className='flex flex-wrap gap-4 py-16'>
      <Button className='cursor-pointer' variant='danger' size='small'>
        Confirma
      </Button>
      <Button className='cursor-pointer' variant='default' size='medium'>
        Confirma
      </Button>
      <Button className='cursor-pointer' variant='ghost' size='large'>
        Confirma
      </Button>
    </div>
  );
}
