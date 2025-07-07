"use client";

export function Header() {
  return (
    <h1
      className="text-6xl font-bold text-blue-500 hover:text-blue-50 hover:bg-blue-500 transition duration-1000"
      onClick={() => alert("Olá mundo!")}
    >
      Olá mundo!
    </h1>
  );
}
