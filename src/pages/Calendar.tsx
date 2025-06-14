
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Calendar = () => {
  const [currentDate] = useState(new Date());
  
  // Mock events data
  const events = [
    {
      id: '1',
      title: 'Reunião com equipe de vendas',
      time: '09:00 - 10:00',
      type: 'meeting',
      participants: 5,
      instance: 'Loja Virtual'
    },
    {
      id: '2',
      title: 'Campanha de marketing automático',
      time: '14:00 - 15:30',
      type: 'campaign',
      participants: 1200,
      instance: 'Suporte Técnico'
    },
    {
      id: '3',
      title: 'Backup automático de conversas',
      time: '18:00',
      type: 'system',
      participants: 0,
      instance: 'Sistema'
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'campaign':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'system':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="w-4 h-4" />;
      case 'campaign':
        return <CalendarIcon className="w-4 h-4" />;
      case 'system':
        return <Clock className="w-4 h-4" />;
      default:
        return <CalendarIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendário</h1>
            <p className="text-gray-600">Gerencie seus agendamentos e campanhas automatizadas</p>
          </div>
          <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Widget */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Simplified calendar grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const dayNumber = i - 6; // Offset to start on correct day
                  const isToday = dayNumber === currentDate.getDate();
                  const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
                  
                  return (
                    <div
                      key={i}
                      className={`h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer hover:bg-gray-100 ${
                        isToday 
                          ? 'bg-[#25D366] text-white hover:bg-[#128C7E]' 
                          : isCurrentMonth 
                            ? 'text-gray-900' 
                            : 'text-gray-400'
                      }`}
                    >
                      {isCurrentMonth ? dayNumber : ''}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Eventos de Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border ${getEventColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getEventIcon(event.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <div className="flex items-center space-x-2 mt-1 text-sm">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                            {event.participants > 0 && (
                              <>
                                <Users className="w-3 h-3 ml-2" />
                                <span>{event.participants} participantes</span>
                              </>
                            )}
                          </div>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {event.instance}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Agendar Mensagem
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Criar Campanha
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Configurar Horários
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Reunião semanal</div>
                    <div className="text-xs text-gray-500">Amanhã, 09:00</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Campanha Black Friday</div>
                    <div className="text-xs text-gray-500">Sex, 10:00</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Backup mensal</div>
                    <div className="text-xs text-gray-500">30/01, 23:00</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Eventos este mês</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Campanhas ativas</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Mensagens agendadas</span>
                  <span className="font-semibold">147</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taxa de entrega</span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
