
import React, { useState } from 'react';
import { Clock, Shield, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RestrictionsTabProps {
  instanceId: string;
}

const RestrictionsTab: React.FC<RestrictionsTabProps> = ({ instanceId }) => {
  const [businessHours, setBusinessHours] = useState({
    enabled: true,
    start: '09:00',
    end: '18:00',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  });

  const [autoReply, setAutoReply] = useState({
    welcome: true,
    welcomeMessage: 'Olá! Obrigado por entrar em contato. Como posso ajudá-lo?',
    away: true,
    awayMessage: 'No momento estamos fora do horário de atendimento. Retornaremos em breve!'
  });

  const [restrictions, setRestrictions] = useState({
    blockUnknown: false,
    messageLimit: 10,
    messageLimitWindow: 60
  });

  const [blockedNumbers, setBlockedNumbers] = useState(['']);

  const addBlockedNumber = () => {
    setBlockedNumbers([...blockedNumbers, '']);
  };

  const updateBlockedNumber = (index: number, value: string) => {
    const updated = [...blockedNumbers];
    updated[index] = value;
    setBlockedNumbers(updated);
  };

  const removeBlockedNumber = (index: number) => {
    const updated = blockedNumbers.filter((_, i) => i !== index);
    setBlockedNumbers(updated);
  };

  return (
    <div className="space-y-6">
      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Horário de Funcionamento</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Ativar horário de funcionamento</Label>
            <Switch
              checked={businessHours.enabled}
              onCheckedChange={(checked) =>
                setBusinessHours(prev => ({ ...prev, enabled: checked }))
              }
            />
          </div>
          
          {businessHours.enabled && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Horário de início</Label>
                  <Input
                    type="time"
                    value={businessHours.start}
                    onChange={(e) =>
                      setBusinessHours(prev => ({ ...prev, start: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label>Horário de fim</Label>
                  <Input
                    type="time"
                    value={businessHours.end}
                    onChange={(e) =>
                      setBusinessHours(prev => ({ ...prev, end: e.target.value }))
                    }
                  />
                </div>
              </div>
              
              <div>
                <Label>Dias da semana</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { key: 'monday', label: 'Segunda' },
                    { key: 'tuesday', label: 'Terça' },
                    { key: 'wednesday', label: 'Quarta' },
                    { key: 'thursday', label: 'Quinta' },
                    { key: 'friday', label: 'Sexta' },
                    { key: 'saturday', label: 'Sábado' },
                    { key: 'sunday', label: 'Domingo' }
                  ].map((day) => (
                    <div key={day.key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={day.key}
                        checked={businessHours.days.includes(day.key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBusinessHours(prev => ({
                              ...prev,
                              days: [...prev.days, day.key]
                            }));
                          } else {
                            setBusinessHours(prev => ({
                              ...prev,
                              days: prev.days.filter(d => d !== day.key)
                            }));
                          }
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={day.key} className="text-sm">{day.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Auto Reply Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Mensagens Automáticas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Mensagem de boas-vindas</Label>
              <Switch
                checked={autoReply.welcome}
                onCheckedChange={(checked) =>
                  setAutoReply(prev => ({ ...prev, welcome: checked }))
                }
              />
            </div>
            {autoReply.welcome && (
              <Textarea
                placeholder="Digite a mensagem de boas-vindas..."
                value={autoReply.welcomeMessage}
                onChange={(e) =>
                  setAutoReply(prev => ({ ...prev, welcomeMessage: e.target.value }))
                }
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Mensagem de ausência</Label>
              <Switch
                checked={autoReply.away}
                onCheckedChange={(checked) =>
                  setAutoReply(prev => ({ ...prev, away: checked }))
                }
              />
            </div>
            {autoReply.away && (
              <Textarea
                placeholder="Digite a mensagem de ausência..."
                value={autoReply.awayMessage}
                onChange={(e) =>
                  setAutoReply(prev => ({ ...prev, awayMessage: e.target.value }))
                }
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Message Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Restrições de Mensagens</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Bloquear números desconhecidos</Label>
              <p className="text-sm text-gray-500">Rejeitar mensagens de contatos não salvos</p>
            </div>
            <Switch
              checked={restrictions.blockUnknown}
              onCheckedChange={(checked) =>
                setRestrictions(prev => ({ ...prev, blockUnknown: checked }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Limite de mensagens por usuário</Label>
              <Input
                type="number"
                value={restrictions.messageLimit}
                onChange={(e) =>
                  setRestrictions(prev => ({ ...prev, messageLimit: parseInt(e.target.value) }))
                }
              />
            </div>
            <div>
              <Label>Janela de tempo (minutos)</Label>
              <Input
                type="number"
                value={restrictions.messageLimitWindow}
                onChange={(e) =>
                  setRestrictions(prev => ({ ...prev, messageLimitWindow: parseInt(e.target.value) }))
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blocked Numbers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Números Bloqueados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {blockedNumbers.map((number, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder="+55 11 99999-9999"
                value={number}
                onChange={(e) => updateBlockedNumber(index, e.target.value)}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeBlockedNumber(index)}
                disabled={blockedNumbers.length <= 1}
              >
                Remover
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addBlockedNumber}
            className="w-full"
          >
            Adicionar Número
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default RestrictionsTab;
