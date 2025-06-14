
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Phone, Wifi, WifiOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from '@/components/chat/ChatInterface';
import RestrictionsTab from '@/components/instance/RestrictionsTab';
import AIAgentTab from '@/components/instance/AIAgentTab';

interface InstanceData {
  id: string;
  name: string;
  phone: string;
  status: 'connected' | 'disconnected' | 'connecting';
  avatar: string;
  profilePhoto?: string;
}

interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  isGroup?: boolean;
}

const Instance = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [instance, setInstance] = useState<InstanceData | null>(null);

  // Mock conversations data
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'João Silva',
      phone: '+55 11 99999-1111',
      lastMessage: 'Olá, gostaria de saber mais sobre os produtos',
      timestamp: '14:35',
      unread: 2,
      avatar: 'JS'
    },
    {
      id: '2',
      name: 'Maria Santos',
      phone: '+55 11 88888-2222',
      lastMessage: 'Obrigada pelo atendimento!',
      timestamp: '13:20',
      unread: 0,
      avatar: 'MS'
    },
    {
      id: '3',
      name: 'Grupo Vendas',
      phone: 'grupo',
      lastMessage: 'Pedro: Vamos fechar mais vendas hoje!',
      timestamp: '12:45',
      unread: 5,
      avatar: 'GV',
      isGroup: true
    }
  ]);

  useEffect(() => {
    // Simular carregamento dos dados da instância
    const instanceData: InstanceData = {
      id: id || '1',
      name: id === '1' ? 'Loja Virtual' : 'Suporte Técnico',
      phone: '+55 11 99999-9999',
      status: id === '1' ? 'connected' : 'disconnected',
      avatar: id === '1' ? 'LV' : 'ST'
    };
    setInstance(instanceData);
  }, [id]);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.phone.includes(searchTerm)
  );

  if (!instance) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#25D366]"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold">
                {instance.avatar}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{instance.name}</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{instance.phone}</span>
                  <div className="flex items-center space-x-1">
                    {instance.status === 'connected' ? (
                      <Wifi className="w-4 h-4 text-green-500" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      instance.status === 'connected' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {instance.status === 'connected' ? 'Conectado' : 'Desconectado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {instance.status === 'disconnected' && (
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                Conectar
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar conversa"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 m-4">
              <TabsTrigger value="chat">Bate-papo</TabsTrigger>
              <TabsTrigger value="restrictions">Restrições</TabsTrigger>
              <TabsTrigger value="ai">Agente de IA</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 overflow-hidden">
              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-[#25D366]/10' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                          {conversation.avatar}
                        </div>
                        {conversation.unread > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">{conversation.unread}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="restrictions" className="flex-1 p-4">
              <RestrictionsTab instanceId={instance.id} />
            </TabsContent>

            <TabsContent value="ai" className="flex-1 p-4">
              <AIAgentTab instanceId={instance.id} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <ChatInterface 
              conversation={conversations.find(c => c.id === selectedConversation)!}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-16 h-16 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Selecione uma conversa para começar a interagir
                </h3>
                <p className="text-gray-600">
                  Escolha uma conversa da lista ao lado para visualizar e responder as mensagens
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Instance;
