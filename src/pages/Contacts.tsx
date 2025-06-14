
import React, { useState } from 'react';
import { Users, Search, Plus, Filter, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tags: string[];
  lastSeen: string;
  messageCount: number;
  status: 'active' | 'inactive';
  instance: string;
}

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Mock contacts data
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'João Silva',
      phone: '+55 11 99999-1111',
      email: 'joao@email.com',
      tags: ['Cliente', 'VIP'],
      lastSeen: '2 horas atrás',
      messageCount: 45,
      status: 'active',
      instance: 'Loja Virtual'
    },
    {
      id: '2',
      name: 'Maria Santos',
      phone: '+55 11 88888-2222',
      email: 'maria@email.com',
      tags: ['Lead', 'Interessado'],
      lastSeen: '1 dia atrás',
      messageCount: 12,
      status: 'active',
      instance: 'Loja Virtual'
    },
    {
      id: '3',
      name: 'Pedro Costa',
      phone: '+55 11 77777-3333',
      tags: ['Cliente'],
      lastSeen: '1 semana atrás',
      messageCount: 8,
      status: 'inactive',
      instance: 'Suporte Técnico'
    },
    {
      id: '4',
      name: 'Ana Oliveira',
      phone: '+55 11 66666-4444',
      email: 'ana@email.com',
      tags: ['Lead', 'Potencial'],
      lastSeen: '3 horas atrás',
      messageCount: 23,
      status: 'active',
      instance: 'Loja Virtual'
    }
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectAllContacts = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(c => c.id));
    }
  };

  const getTagColor = (tag: string) => {
    const colors = {
      'Cliente': 'bg-green-100 text-green-800',
      'VIP': 'bg-purple-100 text-purple-800',
      'Lead': 'bg-blue-100 text-blue-800',
      'Interessado': 'bg-yellow-100 text-yellow-800',
      'Potencial': 'bg-orange-100 text-orange-800'
    };
    return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contatos</h1>
            <p className="text-gray-600">Gerencie todos os seus contatos WhatsApp</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Contato
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Contatos</p>
                <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
              </div>
              <Users className="w-8 h-8 text-[#25D366]" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Contatos Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {contacts.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Novos esta Semana</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa de Engajamento</p>
                <p className="text-2xl font-bold text-purple-600">87%</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-600 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar contatos por nome, telefone ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              {selectedContacts.length > 0 && (
                <Button variant="outline">
                  {selectedContacts.length} selecionados
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Contatos</span>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                onChange={selectAllContacts}
                className="rounded"
              />
              <span className="text-sm text-gray-600">Selecionar todos</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onChange={selectAllContacts}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left py-3 px-4">Contato</th>
                  <th className="text-left py-3 px-4">Tags</th>
                  <th className="text-left py-3 px-4">Instância</th>
                  <th className="text-left py-3 px-4">Última Atividade</th>
                  <th className="text-left py-3 px-4">Mensagens</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {contact.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.phone}</div>
                          {contact.email && (
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag) => (
                          <Badge key={tag} className={`text-xs ${getTagColor(tag)}`}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{contact.instance}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">{contact.lastSeen}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium">{contact.messageCount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>
                        {contact.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredContacts.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm ? 'Nenhum contato encontrado' : 'Nenhum contato cadastrado'}
                </h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Tente buscar com outros termos'
                    : 'Comece adicionando seu primeiro contato'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
