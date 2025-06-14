
import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Globe, Shield, Bell, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Settings = () => {
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt-BR');
  const [timezone, setTimezone] = useState('America/Sao_Paulo');
  
  const [privacy, setPrivacy] = useState({
    shareUsageData: false,
    allowAnalytics: true,
    showOnlineStatus: true
  });

  const [notifications, setNotifications] = useState({
    desktop: true,
    email: true,
    mobile: false,
    marketing: false
  });

  const handleSaveSettings = () => {
    // Simular salvamento
    toast.success('Configurações salvas com sucesso!');
  };

  const handleExportData = () => {
    // Simular exportação
    toast.success('Seus dados foram exportados e enviados por email!');
  };

  const handleDeleteAccount = () => {
    // Simular exclusão
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      toast.error('Conta excluída com sucesso!');
      logout();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
        <p className="text-gray-600">Personalize sua experiência no Datafy Chats</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun className="w-5 h-5" />
              <span>Aparência</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Modo escuro</Label>
                <p className="text-sm text-gray-500">Alterna entre tema claro e escuro</p>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Moon className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Idioma e Região</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Idioma</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Fuso Horário</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                    <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificações</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações no desktop</Label>
                <p className="text-sm text-gray-500">Mostrar notificações do sistema</p>
              </div>
              <Switch
                checked={notifications.desktop}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, desktop: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações por email</Label>
                <p className="text-sm text-gray-500">Receber emails sobre atividades importantes</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, email: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações mobile</Label>
                <p className="text-sm text-gray-500">Push notifications no dispositivo móvel</p>
              </div>
              <Switch
                checked={notifications.mobile}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, mobile: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing e promoções</Label>
                <p className="text-sm text-gray-500">Receber ofertas e novidades</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Privacidade e Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Compartilhar dados de uso</Label>
                <p className="text-sm text-gray-500">Ajudar a melhorar o produto com dados anônimos</p>
              </div>
              <Switch
                checked={privacy.shareUsageData}
                onCheckedChange={(checked) =>
                  setPrivacy(prev => ({ ...prev, shareUsageData: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Permitir analytics</Label>
                <p className="text-sm text-gray-500">Coletar dados para análise de performance</p>
              </div>
              <Switch
                checked={privacy.allowAnalytics}
                onCheckedChange={(checked) =>
                  setPrivacy(prev => ({ ...prev, allowAnalytics: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Mostrar status online</Label>
                <p className="text-sm text-gray-500">Outros usuários podem ver quando você está online</p>
              </div>
              <Switch
                checked={privacy.showOnlineStatus}
                onCheckedChange={(checked) =>
                  setPrivacy(prev => ({ ...prev, showOnlineStatus: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Exportar dados</Label>
                <p className="text-sm text-gray-500">Baixar uma cópia de todos os seus dados</p>
              </div>
              <Button variant="outline" onClick={handleExportData}>
                Exportar
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-red-600">Excluir conta</Label>
                <p className="text-sm text-gray-500">Remover permanentemente sua conta e dados</p>
              </div>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Excluir
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={logout} className="flex items-center space-x-2">
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </Button>
          
          <Button onClick={handleSaveSettings} className="bg-[#25D366] hover:bg-[#128C7E] text-white">
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
