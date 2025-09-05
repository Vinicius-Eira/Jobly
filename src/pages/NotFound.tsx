import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Oops! Página não encontrada.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
      >
        Voltar para o Dashboard
      </Link>
    </div>
  );
}
