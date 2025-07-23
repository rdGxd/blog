import { Button } from '@/components/Button';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <div>
      <Button className='cursor-pointer'>Create Post</Button>
    </div>
  );
}
