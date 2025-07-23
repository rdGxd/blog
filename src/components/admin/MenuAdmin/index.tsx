import { Link } from 'lucide-react';

export function MenuAdmin() {
  return (
    <nav>
      <a href='/' target='_blank'>
        Home
      </a>

      <Link href='/admin/post'>Posts</Link>
    </nav>
  );
}
