export const dynamic = 'force-dynamic';

export default async function AdminPostPage() {
  return (
    <div>
      <h1>Create Post</h1>
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
