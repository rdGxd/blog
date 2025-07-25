import { ManagePostForm } from '@/components/admin/ManagePostForm';
import { makePartialPublicPost } from '@/dto/post/dto';
import { findPostsByIdAdmin } from '@/lib/post/queries/admin';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar um post',
  description: 'Página para editar um post existente',
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostsByIdAdmin(id).catch(() => null);

  if (!post) notFound();

  const publicPost = makePartialPublicPost(post);

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-extrabold'>Editar post {id}</h1>
      <ManagePostForm publicPost={publicPost} mode='update' />
    </div>
  );
}
