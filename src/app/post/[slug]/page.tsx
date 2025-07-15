type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  return (
    <div>
      <h1>Post Title: {slug}</h1>
      <p>Post content goes here...</p>
    </div>
  );
}
