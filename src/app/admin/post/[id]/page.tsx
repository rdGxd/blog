export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  return (
    <div>
      <h1>Post Details {id}</h1>
      {/* Fetch and display post details here */}
    </div>
  );
}
