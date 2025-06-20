
import React, { useState } from 'react';
import { Plus, Search, Wifi, WifiOff, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QRCodeModal from '@/components/modals/QRCodeModal';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Instance {
  id: string;
  name: string;
  tag: string;
  status: 'connected' | 'disconnected' | 'connecting';
  phone?: string;
  avatar?: string;
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [instances, setInstances] = useState<Instance[]>([
    {
      id: '1',
      name: 'Loja Virtual',
      tag: 'Datafy',
      status: 'connected',
      phone: '+55 11 99999-9999',
      avatar: 'LV'
    },
    {
      id: '2',
      name: 'Suporte Técnico',
      tag: 'Trial',
      status: 'disconnected',
      phone: '+55 11 88888-8888',
      avatar: 'ST'
    }
  ]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredInstances = instances.filter(instance =>
    instance.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateInstance = () => {
    if (user?.subscription.instancesUsed >= user?.subscription.instancesLimit) {
      alert('Limite de instâncias atingido. Faça upgrade do seu plano.');
      return;
    }
    setShowQRModal(true);
  };

  const handleInstanceClick = (instanceId: string) => {
    navigate(`/instance/${instanceId}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'connecting':
        return <div className="w-4 h-4 border-2 border-[#25D366] border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Datafy':
        return 'bg-[#25D366] text-white';
      case 'Trial':
        return 'bg-[#FFC107] text-black';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Instâncias</h1>
        <p className="text-gray-600">Gerencie todas as suas instâncias WhatsApp</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar instância..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button
          onClick={handleCreateInstance}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Instância
        </Button>
      </div>

      {/* Instances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredInstances.map((instance) => (
          <Card 
            key={instance.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleInstanceClick(instance.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white font-bold">
                    {instance.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{instance.name}</h3>
                    <p className="text-sm text-gray-500">{instance.phone}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="p-1">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(instance.status)}
                  <span className="text-sm text-gray-600 capitalize">
                    {instance.status === 'connected' ? 'Conectado' : 
                     instance.status === 'connecting' ? 'Conectando' : 'Desconectado'}
                  </span>
                </div>
                <Badge className={getTagColor(instance.tag)}>
                  {instance.tag}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredInstances.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'Nenhuma instância encontrada' : 'Selecione uma instância para começar a interagir'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Tente buscar por outro termo'
              : 'Crie sua primeira instância para começar a usar o WhatsApp Business'
            }
          </p>
          {!searchTerm && (
            <Button
              onClick={handleCreateInstance}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Primeira Instância
            </Button>
          )}
        </div>
      )}

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQRModal} 
        onClose={() => setShowQRModal(false)} 
        onSuccess={(instanceData) => {
          setInstances(prev => [...prev, instanceData]);
          setShowQRModal(false);
        }}
      />
    </div>
  );
};

export default Dashboard;
