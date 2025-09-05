import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderOpen, TrendingUp, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data - will be replaced with real data later
const revenueData = [
  { month: "Jan", revenue: 2400 },
  { month: "Fev", revenue: 1398 },
  { month: "Mar", revenue: 9800 },
  { month: "Abr", revenue: 3908 },
  { month: "Mai", revenue: 4800 },
  { month: "Jun", revenue: 3800 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do seu negócio freelance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Clientes"
          value="24"
          icon={Users}
          description="8 novos este mês"
          trend={{ value: 12, label: "desde o mês passado" }}
        />
        <StatsCard
          title="Projetos Ativos"
          value="12"
          icon={FolderOpen}
          description="4 próximos ao prazo"
        />
        <StatsCard
          title="Receita Mensal"
          value="R$ 12.340"
          icon={DollarSign}
          description="Maio 2024"
          trend={{ value: 8, label: "vs mês anterior" }}
        />
        <StatsCard
          title="Taxa de Crescimento"
          value="23%"
          icon={TrendingUp}
          description="Últimos 6 meses"
          trend={{ value: 5, label: "tendência positiva" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-foreground">Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `R$ ${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value) => [`R$ ${value}`, "Receita"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-foreground">Projetos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Website E-commerce", client: "João Silva", status: "Em andamento", value: "R$ 2.500" },
                { name: "App Mobile", client: "Maria Santos", status: "Em andamento", value: "R$ 4.800" },
                { name: "Logo Design", client: "Tech Corp", status: "Concluído", value: "R$ 800" },
                { name: "Sistema Web", client: "StartupXYZ", status: "Em andamento", value: "R$ 6.200" },
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/20 hover:bg-accent/30 transition-smooth">
                  <div>
                    <p className="font-medium text-foreground">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{project.value}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === "Concluído" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}>
                      {project.status}
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
};

export default Dashboard;