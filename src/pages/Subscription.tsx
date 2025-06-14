
import React from 'react';
import { Crown, Check, X, CreditCard, Calendar, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const Subscription = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Trial',
      price: 'Grátis',
      period: '7 dias',
      instances: 1,
      messages: 100,
      features: ['1 instância WhatsApp', '100 mensagens/dia', 'Suporte por email', 'Interface básica'],
      notIncluded: ['Agente de IA', 'API completa', 'Suporte prioritário', 'Relatórios avançados'],
      color: 'yellow',
      current: user?.subscription.plan === 'trial'
    },
    {
      name: 'Basic',
      price: 'R$ 29',
      period: '/mês',
      instances: 3,
      messages: 1000,
      features: ['3 instâncias WhatsApp', '1.000 mensagens/dia', 'Suporte por email', 'Webhooks básicos'],
      notIncluded: ['Agente de IA', 'API completa', 'Suporte prioritário'],
      color: 'blue',
      current: user?.subscription.plan === 'basic'
    },
    {
      name: 'Premium',
      price: 'R$ 79',
      period: '/mês',
      instances: 10,
      messages: 10000,
      features: ['10 instâncias WhatsApp', '10.000 mensagens/dia', 'Agente de IA incluído', 'API completa', 'Suporte prioritário', 'Relatórios avançados'],
      notIncluded: [],
      color: 'green',
      current: user?.subscription.plan === 'premium',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'R$ 199',
      period: '/mês',
      instances: -1, // Unlimited
      messages: -1, // Unlimited
      features: ['Instâncias ilimitadas', 'Mensagens ilimitadas', 'Agente de IA avançado', 'API completa', 'Suporte 24/7', 'Relatórios customizados', 'Webhook personalizado', 'Gerente de conta dedicado'],
      notIncluded: [],
      color: 'purple',
      current: user?.subscription.plan === 'enterprise'
    }
  ];

  const getColorClasses = (color: string, current: boolean) => {
    const colors = {
      yellow: current ? 'border-yellow-400 ring-yellow-400' : 'border-gray-200',
      blue: current ? 'border-blue-400 ring-blue-400' : 'border-gray-200',
      green: current ? 'border-green-400 ring-green-400' : 'border-gray-200',
      purple: current ? 'border-purple-400 ring-purple-400' : 'border-gray-200'
    };
    return colors[color as keyof typeof colors] || 'border-gray-200';
  };

  const getBadgeColor = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800', 
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Minha Assinatura</h1>
        <p className="text-gray-600">Gerencie seu plano e acompanhe o uso da sua conta</p>
      </div>

      {/* Current Status */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5" />
            <span>Status Atual</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#25D366] mb-1">
                {user?.subscription.plan.charAt(0).toUpperCase() + user?.subscription.plan.slice(1)}
              </div>
              <div className="text-sm text-gray-600">Plano Atual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {user?.subscription.instancesUsed}/{user?.subscription.instancesLimit}
              </div>
              <div className="text-sm text-gray-600">Instâncias Utilizadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {user?.subscription.messagesUsed}/{user?.subscription.messagesLimit}
              </div>
              <div className="text-sm text-gray-600">Mensagens Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {new Date(user?.subscription.expiresAt || '').toLocaleDateString('pt-BR')}
              </div>
              <div className="text-sm text-gray-600">Renovação</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative ${getColorClasses(plan.color, plan.current)} ${
              plan.current ? 'ring-2' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-[#25D366] text-white">Mais Popular</Badge>
              </div>
            )}
            
            {plan.current && (
              <div className="absolute -top-3 right-3">
                <Badge className={getBadgeColor(plan.color)}>Plano Atual</Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                {plan.price}
                <span className="text-sm font-normal text-gray-600">{plan.period}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-gray-600">
                <div>{plan.instances === -1 ? 'Instâncias ilimitadas' : `${plan.instances} instâncias`}</div>
                <div>{plan.messages === -1 ? 'Mensagens ilimitadas' : `${plan.messages} mensagens/dia`}</div>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full" 
                variant={plan.current ? "outline" : "default"}
                disabled={plan.current}
              >
                {plan.current ? 'Plano Atual' : 'Escolher Plano'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment History */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Histórico de Pagamentos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '15/01/2024', description: 'Plano Trial - Gratuito', amount: 'R$ 0,00', status: 'Ativo' },
              { date: '08/01/2024', description: 'Período de teste iniciado', amount: 'R$ 0,00', status: 'Concluído' }
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{payment.description}</div>
                    <div className="text-sm text-gray-500">{payment.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{payment.amount}</div>
                  <div className={`text-sm ${
                    payment.status === 'Ativo' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {payment.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Datafy One Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Datafy One</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Libere mais instâncias</h3>
              <p className="text-sm text-gray-600">
                Acesse o Datafy One para liberar instâncias adicionais e recursos premium
              </p>
            </div>
            <Button variant="outline">
              Acessar Datafy One
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscription;
