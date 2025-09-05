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
import { Users, DollarSign, Briefcase } from "lucide-react";

interface Cliente {
  id: number;
  nome: string;
  projetos: number;
  receita: number;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [nome, setNome] = useState("");
  const [projetos, setProjetos] = useState("");
  const [receita, setReceita] = useState("");

  const adicionarCliente = () => {
    if (!nome || !projetos || !receita) return;

    const novoCliente: Cliente = {
      id: Date.now(),
      nome,
      projetos: Number(projetos),
      receita: Number(receita),
    };

    setClientes([...clientes, novoCliente]);

    // limpar campos
    setNome("");
    setProjetos("");
    setReceita("");
  };

  // Resumos
  const totalClientes = clientes.length;
  const totalProjetos = clientes.reduce((acc, c) => acc + c.projetos, 0);
  const receitaTotal = clientes.reduce((acc, c) => acc + c.receita, 0);

  return (
    <div className="space-y-8">
      {/* Título */}
      <div>
        <h1 className="text-3xl font-bold">Clientes</h1>
        <p className="text-muted-foreground">
          Acompanhe sua base de clientes e o impacto financeiro
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Users className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Clientes</p>
              <p className="text-2xl font-bold">{totalClientes}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Briefcase className="h-10 w-10 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Projetos</p>
              <p className="text-2xl font-bold">{totalProjetos}</p>
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
          <CardTitle>Adicionar Cliente</CardTitle>
          <CardDescription>
            Preencha os dados do novo cliente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome do cliente"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projetos">Projetos</Label>
              <Input
                id="projetos"
                type="number"
                value={projetos}
                onChange={(e) => setProjetos(e.target.value)}
                placeholder="Qtd. de projetos"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="receita">Receita</Label>
              <Input
                id="receita"
                type="number"
                value={receita}
                onChange={(e) => setReceita(e.target.value)}
                placeholder="Receita total (R$)"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={adicionarCliente} className="w-full md:w-auto">
            Adicionar
          </Button>
        </CardFooter>
      </Card>

      {/* Lista de clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>
            Confira os clientes cadastrados abaixo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {clientes.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nenhum cliente cadastrado ainda.
            </p>
          ) : (
            <table className="w-full border-collapse rounded-md overflow-hidden">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="p-3">Nome</th>
                  <th className="p-3">Projetos</th>
                  <th className="p-3">Receita</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente, index) => (
                  <tr
                    key={cliente.id}
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  >
                    <td className="p-3">{cliente.nome}</td>
                    <td className="p-3">{cliente.projetos}</td>
                    <td className="p-3">
                      R$ {cliente.receita.toLocaleString("pt-BR")}
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
