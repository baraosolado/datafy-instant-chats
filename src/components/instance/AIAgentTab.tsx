
import React, { useState } from 'react';
import { Bot, Brain, Zap, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface AIAgentTabProps {
  instanceId: string;
}

const AIAgentTab: React.FC<AIAgentTabProps> = ({ instanceId }) => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [aiConfig, setAiConfig] = useState({
    prompt: 'Você é um assistente de atendimento ao cliente da Loja Virtual. Seja sempre educado, prestativo e profissional. Responda de forma clara e objetiva. Se não souber algo, direcione para o atendimento humano.',
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 150,
    fallbackToHuman: true,
    fallbackTriggers: ['atendimento humano', 'falar com pessoa', 'transferir'],
    workingHours: true
  });

  const [interactions] = useState([
    {
      id: '1',
      customer: 'João Silva',
      message: 'Qual o horário de funcionamento?',
      aiResponse: 'Nosso horário de funcionamento é de segunda a sexta, das 9h às 18h, e aos sábados das 9h às 14h.',
      timestamp: '2024-01-15 14:30',
      satisfied: true
    },
    {
      id: '2',
      customer: 'Maria Santos',
      message: 'Vocês fazem entrega?',
      aiResponse: 'Sim, fazemos entregas em toda a região metropolitana. O prazo é de 1 a 3 dias úteis.',
      timestamp: '2024-01-15 13:45',
      satisfied: true
    },
    {
      id: '3',
      customer: 'Pedro Costa',
      message: 'Quero cancelar meu pedido',
      aiResponse: 'Para cancelamentos, vou transferir você para um atendente humano que poderá ajudá-lo melhor.',
      timestamp: '2024-01-15 12:20',
      satisfied: null
    }
  ]);

  return (
    <div className="space-y-6">
      {/* AI Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span>Agente de IA</span>
            </div>
            <Switch
              checked={aiEnabled}
              onCheckedChange={setAiEnabled}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            {aiEnabled 
              ? 'O agente de IA está ativo e respondendo automaticamente às mensagens.'
              : 'O agente de IA está desativado. Todas as mensagens serão direcionadas para atendimento manual.'
            }
          </p>
        </CardContent>
      </Card>

      {aiEnabled && (
        <>
          {/* AI Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Configuração do Agente</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Prompt do Sistema</Label>
                <Textarea
                  value={aiConfig.prompt}
                  onChange={(e) => setAiConfig(prev => ({ ...prev, prompt: e.target.value }))}
                  rows={4}
                  placeholder="Descreva como o agente deve se comportar..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Define a personalidade e comportamento do agente de IA
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Modelo de IA</Label>
                  <Select 
                    value={aiConfig.model}
                    onValueChange={(value) => setAiConfig(prev => ({ ...prev, model: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Máximo de Tokens</Label>
                  <Select
                    value={aiConfig.maxTokens.toString()}
                    onValueChange={(value) => setAiConfig(prev => ({ ...prev, maxTokens: parseInt(value) }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 tokens</SelectItem>
                      <SelectItem value="150">150 tokens</SelectItem>
                      <SelectItem value="300">300 tokens</SelectItem>
                      <SelectItem value="500">500 tokens</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Criatividade (Temperature): {aiConfig.temperature}</Label>
                <Slider
                  value={[aiConfig.temperature]}
                  onValueChange={(value) => setAiConfig(prev => ({ ...prev, temperature: value[0] }))}
                  max={1}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Mais conservador</span>
                  <span>Mais criativo</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Transferir para humano</Label>
                    <p className="text-sm text-gray-500">Quando não conseguir responder adequadamente</p>
                  </div>
                  <Switch
                    checked={aiConfig.fallbackToHuman}
                    onCheckedChange={(checked) => 
                      setAiConfig(prev => ({ ...prev, fallbackToHuman: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Apenas no horário comercial</Label>
                    <p className="text-sm text-gray-500">IA ativa apenas durante expediente</p>
                  </div>
                  <Switch
                    checked={aiConfig.workingHours}
                    onCheckedChange={(checked) => 
                      setAiConfig(prev => ({ ...prev, workingHours: checked }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label>Palavras-chave para transferência</Label>
                <Textarea
                  value={aiConfig.fallbackTriggers.join(', ')}
                  onChange={(e) => setAiConfig(prev => ({ 
                    ...prev, 
                    fallbackTriggers: e.target.value.split(', ').filter(t => t.trim())
                  }))}
                  placeholder="atendimento humano, falar com pessoa, transferir"
                  rows={2}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separe as palavras-chave com vírgulas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Desempenho da IA</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#25D366]">87%</div>
                  <div className="text-sm text-gray-600">Taxa de Resolução</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#007BFF]">1.2s</div>
                  <div className="text-sm text-gray-600">Tempo Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FFC107]">4.8/5</div>
                  <div className="text-sm text-gray-600">Satisfação</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Últimas Interações</h4>
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-sm">{interaction.customer}</span>
                      <span className="text-xs text-gray-500">{interaction.timestamp}</span>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                      <strong>Pergunta:</strong> {interaction.message}
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Resposta da IA:</strong> {interaction.aiResponse}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {interaction.satisfied === true && (
                          <span className="text-green-600 text-xs">✓ Cliente satisfeito</span>
                        )}
                        {interaction.satisfied === false && (
                          <span className="text-red-600 text-xs">✗ Cliente insatisfeito</span>
                        )}
                        {interaction.satisfied === null && (
                          <span className="text-yellow-600 text-xs">→ Transferido para humano</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default AIAgentTab;
