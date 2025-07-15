import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-center pb-16">
      <p>
        <span>Copyright &copy; {new Date().getFullYear()} - </span>
        <Link href="/">My Blog</Link>
      </p>
    </footer>
  );
}
