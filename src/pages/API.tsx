
import React, { useState } from 'react';
import { Code, Copy, Check, Play, Key, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const API = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [apiKey] = useState('datafy_sk_1234567890abcdef');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/send/text',
      description: 'Enviar mensagem de texto',
      parameters: [
        { name: 'token', type: 'string', required: true, description: 'Token da instância' },
        { name: 'number', type: 'string', required: true, description: 'Número do destinatário' },
        { name: 'message', type: 'string', required: true, description: 'Texto da mensagem' }
      ]
    },
    {
      method: 'POST',
      path: '/api/v1/send/media',
      description: 'Enviar imagem ou documento',
      parameters: [
        { name: 'token', type: 'string', required: true, description: 'Token da instância' },
        { name: 'number', type: 'string', required: true, description: 'Número do destinatário' },
        { name: 'media', type: 'file', required: true, description: 'Arquivo de mídia' },
        { name: 'caption', type: 'string', required: false, description: 'Legenda opcional' }
      ]
    },
    {
      method: 'POST',
      path: '/api/v1/send/audio',
      description: 'Enviar áudio',
      parameters: [
        { name: 'token', type: 'string', required: true, description: 'Token da instância' },
        { name: 'number', type: 'string', required: true, description: 'Número do destinatário' },
        { name: 'audio', type: 'file', required: true, description: 'Arquivo de áudio' }
      ]
    },
    {
      method: 'GET',
      path: '/api/v1/chats',
      description: 'Listar conversas',
      parameters: [
        { name: 'token', type: 'string', required: true, description: 'Token da instância' },
        { name: 'limit', type: 'number', required: false, description: 'Número máximo de resultados' }
      ]
    }
  ];

  const codeExamples = {
    curl: {
      text: `curl -X POST https://api.datafy.com/v1/send/text \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "number": "5511999999999",
    "message": "Olá! Esta é uma mensagem da API Datafy Chats."
  }'`,
      response: `{
  "success": true,
  "messageId": "msg_1234567890",
  "status": "sent",
  "timestamp": "2024-01-15T14:30:00Z"
}`
    },
    javascript: `const response = await fetch('https://api.datafy.com/v1/send/text', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    number: '5511999999999',
    message: 'Olá! Esta é uma mensagem da API Datafy Chats.'
  })
});

const data = await response.json();
console.log(data);`,
    python: `import requests

url = "https://api.datafy.com/v1/send/text"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer ${apiKey}"
}
data = {
    "number": "5511999999999",
    "message": "Olá! Esta é uma mensagem da API Datafy Chats."
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
    php: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.datafy.com/v1/send/text',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Authorization: Bearer ${apiKey}'
  ),
  CURLOPT_POSTFIELDS => json_encode(array(
    'number' => '5511999999999',
    'message' => 'Olá! Esta é uma mensagem da API Datafy Chats.'
  ))
));

$response = curl_exec($curl);
curl_close($curl);

echo $response;
?>`
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">API Datafy Chats</h1>
        <p className="text-gray-600">Integre o WhatsApp em suas aplicações com nossa API RESTful</p>
      </div>

      {/* API Key */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Autenticação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">API Key</label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(apiKey, 'apikey')}
              >
                {copiedCode === 'apikey' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <code className="text-sm font-mono text-gray-800">{apiKey}</code>
            <p className="text-xs text-gray-500 mt-2">
              Inclua este token no header Authorization como Bearer token
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Endpoints */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="w-5 h-5" />
                <span>Endpoints Disponíveis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{endpoint.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Parâmetros:</h4>
                      {endpoint.parameters.map((param, pIndex) => (
                        <div key={pIndex} className="flex items-start space-x-2 text-xs">
                          <code className="bg-gray-100 px-2 py-1 rounded">{param.name}</code>
                          <span className="text-gray-500">{param.type}</span>
                          {param.required && <Badge variant="destructive" className="text-xs">obrigatório</Badge>}
                          <span className="text-gray-600">{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Code Examples */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Exemplos de Código</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curl">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="php">PHP</TabsTrigger>
                </TabsList>

                <TabsContent value="curl" className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Requisição</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(codeExamples.curl.text, 'curl-req')}
                      >
                        {copiedCode === 'curl-req' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                      <code>{codeExamples.curl.text}</code>
                    </pre>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Resposta</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(codeExamples.curl.response, 'curl-res')}
                      >
                        {copiedCode === 'curl-res' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                      <code>{codeExamples.curl.response}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="javascript">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">JavaScript (Fetch API)</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(codeExamples.javascript, 'js')}
                    >
                      {copiedCode === 'js' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-blue-400 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{codeExamples.javascript}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="python">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Python (Requests)</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(codeExamples.python, 'python')}
                    >
                      {copiedCode === 'python' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-yellow-400 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{codeExamples.python}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="php">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">PHP (cURL)</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(codeExamples.php, 'php')}
                    >
                      {copiedCode === 'php' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-purple-400 p-4 rounded-lg text-xs overflow-x-auto">
                    <code>{codeExamples.php}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Rate Limits */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Limites e Códigos de Resposta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Rate Limits</h4>
                <div className="space-y-1 text-sm">
                  <div>Trial: 100 requisições/dia</div>
                  <div>Basic: 1.000 requisições/dia</div>
                  <div>Premium: 10.000 requisições/dia</div>
                  <div>Enterprise: Ilimitado</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Códigos de Resposta</h4>
                <div className="space-y-1 text-sm">
                  <div><code>200</code> - Sucesso</div>
                  <div><code>400</code> - Erro na requisição</div>
                  <div><code>401</code> - Token inválido</div>
                  <div><code>429</code> - Rate limit excedido</div>
                  <div><code>500</code> - Erro interno</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default API;
