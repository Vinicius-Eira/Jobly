import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, DollarSign } from "lucide-react";

interface Projeto {
  id: number;
  nome: string;
  cliente: string;
  status: string;
  valor: number;
}

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [nome, setNome] = useState("");
  const [cliente, setCliente] = useState("");
  const [status, setStatus] = useState("Em andamento");
  const [valor, setValor] = useState("");

  const adicionarProjeto = () => {
    if (!nome || !cliente || !valor) return;

    const novoProjeto: Projeto = {
      id: Date.now(),
      nome,
      cliente,
      status,
      valor: Number(valor),
    };

    setProjetos([...projetos, novoProjeto]);

    // limpar campos
    setNome("");
    setCliente("");
    setStatus("Em andamento");
    setValor("");
  };

  // Resumos
  const totalProjetos = projetos.length;
  const emAndamento = projetos.filter((p) => p.status === "Em andamento").length;
  const receitaTotal = projetos.reduce((acc, p) => acc + p.valor, 0);

  return (
    <div className="space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold">Projetos</h1>
        <p className="text-muted-foreground">
          Gerencie os projetos em andamento e concluídos
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Briefcase className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Projetos Totais</p>
              <p className="text-2xl font-bold">{totalProjetos}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Users className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Em Andamento</p>
              <p className="text-2xl font-bold">{emAndamento}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <DollarSign className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold">
                R$ {receitaTotal.toLocaleString("pt-BR")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Projeto</CardTitle>
          <CardDescription>
            Preencha os dados do novo projeto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Projeto</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome do projeto"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Digite o nome do cliente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option>Em andamento</option>
                <option>Concluído</option>
                <option>Pausado</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Digite o valor"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={adicionarProjeto} className="w-full md:w-auto">
            Adicionar
          </Button>
        </CardFooter>
      </Card>

      {/* Lista de projetos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Projetos</CardTitle>
          <CardDescription>
            Confira os projetos cadastrados abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projetos.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nenhum projeto cadastrado ainda.
            </p>
          ) : (
            <table className="w-full border-collapse rounded-md overflow-hidden">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="p-3">Projeto</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Valor</th>
                </tr>
              </thead>
              <tbody>
                {projetos.map((projeto, index) => (
                  <tr
                    key={projeto.id}
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  >
                    <td className="p-3">{projeto.nome}</td>
                    <td className="p-3">{projeto.cliente}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          projeto.status === "Concluído"
                            ? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-400"
                            : projeto.status === "Pausado"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-400"
                        }`}
                      >
                        {projeto.status}
                      </span>
                    </td>
                    <td className="p-3">
                      R$ {projeto.valor.toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
