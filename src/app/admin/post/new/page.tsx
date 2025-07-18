export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <div>
      <h1>Create New Post</h1>
      <form>
        <label>
          Title:
          <input type='text' name='title' required />
        </label>
        <label>
          Content:
          <textarea name='content' required />
        </label>
        <button type='submit'>Create Post</button>
      </form>
    </div>
  );
}
