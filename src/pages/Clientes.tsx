import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Phone, Mail, Edit, Trash2, Users } from "lucide-react";

// Mock data - will be replaced with real data from Supabase
const mockClientes = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@exemplo.com",
    telefone: "(11) 99999-9999",
    projetos: 3,
    valorTotal: 8500,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@exemplo.com",
    telefone: "(11) 88888-8888",
    projetos: 2,
    valorTotal: 5200,
  },
  {
    id: 3,
    nome: "Tech Corp",
    email: "contato@techcorp.com",
    telefone: "(11) 77777-7777",
    projetos: 1,
    valorTotal: 12000,
  },
];

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes] = useState(mockClientes);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus clientes e relacionamentos
          </p>
        </div>
        <Button className="gradient-primary shadow-[var(--shadow-button)] hover:shadow-elegant transition-smooth">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <Card className="card-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Clientes</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredClientes.map((cliente) => (
              <Card key={cliente.id} className="hover:shadow-card transition-smooth border border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {cliente.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{cliente.nome}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {cliente.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {cliente.telefone}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {cliente.projetos} projeto{cliente.projetos !== 1 ? 's' : ''}
                        </Badge>
                        <span className="text-sm font-medium text-green-600">
                          R$ {cliente.valorTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-destructive hover:text-destructive-foreground transition-smooth">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClientes.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Nenhum cliente encontrado</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Tente ajustar sua busca" : "Comece adicionando seu primeiro cliente"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clientes;