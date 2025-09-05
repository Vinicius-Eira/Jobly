import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Projeto {
  id: number;
  nome: string;
  cliente: string;
  status: string;
  valor: number;
}

const dadosReceita = [
  { mes: "Jan", receita: 2500 },
  { mes: "Fev", receita: 1800 },
  { mes: "Mar", receita: 10000 },
  { mes: "Abr", receita: 3700 },
  { mes: "Mai", receita: 5000 },
  { mes: "Jun", receita: 4200 },
];

const projetosRecentes: Projeto[] = [
  { id: 1, nome: "Website E-commerce", cliente: "João Silva", status: "Em andamento", valor: 2500 },
  { id: 2, nome: "App Mobile", cliente: "Maria Santos", status: "Em andamento", valor: 4800 },
  { id: 3, nome: "Logo Design", cliente: "Tech Corp", status: "Concluído", valor: 800 },
  { id: 4, nome: "Sistema Web", cliente: "StartupXYZ", status: "Em andamento", valor: 6200 },
];

export default function Dashboard() {
  const totalClientes = 24;
  const projetosAtivos = 12;
  const receitaMensal = 12340;
  const taxaCrescimento = 23;

  return (
    <div className="space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do seu negócio freelance
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total de Clientes</p>
            <p className="text-2xl font-bold">{totalClientes}</p>
            <p className="text-xs text-green-500">+12% desde o mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Projetos Ativos</p>
            <p className="text-2xl font-bold">{projetosAtivos}</p>
            <p className="text-xs text-blue-500">4 próximos ao prazo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Receita Mensal</p>
            <p className="text-2xl font-bold">R$ {receitaMensal.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-green-500">+8% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Taxa de Crescimento</p>
            <p className="text-2xl font-bold">{taxaCrescimento}%</p>
            <p className="text-xs text-green-500">+5% tendência positiva</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico + Projetos Recentes */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Gráfico de Receita */}
        <Card>
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosReceita}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="mes" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projetos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Projetos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projetosRecentes.map((projeto) => (
                <div key={projeto.id} className="flex items-center justify-between border-b pb-2 last:border-none last:pb-0">
                  <div>
                    <p className="font-medium">{projeto.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {projeto.cliente}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      R$ {projeto.valor.toLocaleString("pt-BR")}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                        projeto.status === "Concluído"
                          ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400"
                      }`}
                    >
                      {projeto.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
