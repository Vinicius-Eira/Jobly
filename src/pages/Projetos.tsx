import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, User, Calendar, DollarSign, FolderOpen } from "lucide-react";

// Mock data - will be replaced with real data from Supabase
const mockProjetos = [
  {
    id: 1,
    descricao: "Website E-commerce Completo",
    cliente: "João Silva",
    valor: 8500,
    status: "em-andamento",
    dataInicio: "2024-04-15",
    prazo: "2024-06-15",
  },
  {
    id: 2,
    descricao: "Aplicativo Mobile React Native",
    cliente: "Maria Santos",
    valor: 12000,
    status: "em-andamento",
    dataInicio: "2024-05-01",
    prazo: "2024-07-30",
  },
  {
    id: 3,
    descricao: "Redesign de Logo e Identidade Visual",
    cliente: "Tech Corp",
    valor: 2500,
    status: "concluido",
    dataInicio: "2024-03-10",
    prazo: "2024-04-10",
  },
  {
    id: 4,
    descricao: "Sistema de Gestão Interno",
    cliente: "StartupXYZ",
    valor: 15000,
    status: "em-andamento",
    dataInicio: "2024-05-15",
    prazo: "2024-08-15",
  },
];

const statusConfig = {
  "em-andamento": {
    label: "Em Andamento",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  "concluido": {
    label: "Concluído",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  "pausado": {
    label: "Pausado",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
};

const Projetos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [projetos] = useState(mockProjetos);

  const filteredProjetos = projetos.filter(projeto => {
    const matchSearch = projeto.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       projeto.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "todos" || projeto.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projetos</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os seus projetos freelance
          </p>
        </div>
        <Button className="gradient-primary shadow-[var(--shadow-button)] hover:shadow-elegant transition-smooth">
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Lista de Projetos</CardTitle>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar projetos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="em-andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="pausado">Pausado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredProjetos.map((projeto) => (
              <Card key={projeto.id} className="hover:shadow-card transition-smooth border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{projeto.descricao}</h3>
                        <Badge className={statusConfig[projeto.status as keyof typeof statusConfig].color}>
                          {statusConfig[projeto.status as keyof typeof statusConfig].label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{projeto.cliente}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium text-green-600">{formatCurrency(projeto.valor)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Prazo: {formatDate(projeto.prazo)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-destructive hover:text-destructive-foreground transition-smooth">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-smooth"
                      style={{ 
                        width: projeto.status === "concluido" ? "100%" : "65%" 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {projeto.status === "concluido" ? "Projeto concluído" : "Progresso estimado"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjetos.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "todos" 
                  ? "Tente ajustar seus filtros de busca" 
                  : "Comece adicionando seu primeiro projeto"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Projetos;