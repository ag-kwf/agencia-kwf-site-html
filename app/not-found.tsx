import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Página não encontrada</p>
        <Link href="/" className="text-accent underline hover:text-accent/90">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
