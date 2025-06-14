
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Image, FileText, Video, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
  type: 'text' | 'image' | 'audio' | 'document' | 'video';
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}

interface ChatInterfaceProps {
  conversation: Conversation;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ conversation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Gostaria de saber mais sobre os produtos da loja.',
      timestamp: '14:30',
      isSent: false,
      type: 'text',
      status: 'read'
    },
    {
      id: '2',
      text: 'Olá! Claro, ficaria feliz em ajudar você com informações sobre nossos produtos. O que você gostaria de saber especificamente?',
      timestamp: '14:32',
      isSent: true,
      type: 'text',
      status: 'read'
    },
    {
      id: '3',
      text: 'Estou interessado nos smartphones mais recentes. Vocês têm alguma promoção?',
      timestamp: '14:35',
      isSent: false,
      type: 'text',
      status: 'read'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isSent: true,
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simular status de entregue após 1s
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    // Simular status de lido após 3s
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
      ));
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="bg-[#25D366] text-white p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
          {conversation.avatar}
        </div>
        <div>
          <h3 className="font-semibold">{conversation.name}</h3>
          <p className="text-sm opacity-90">{conversation.phone}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="whatsapp-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Cg opacity="0.05"%3E%3Cpath d="M20 20h60v60H20z" fill="none" stroke="%23128C7E" stroke-width="1"/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23whatsapp-bg)"/%3E%3C/svg%3E")' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.isSent
                  ? 'bg-[#DCF8C6] text-gray-900'
                  : 'bg-white text-gray-900 shadow-sm'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <div className={`flex items-center justify-end space-x-1 mt-1 ${
                msg.isSent ? 'text-gray-600' : 'text-gray-500'
              }`}>
                <span className="text-xs">{msg.timestamp}</span>
                {msg.isSent && (
                  <span className={`text-xs ${
                    msg.status === 'read' ? 'text-blue-500' : 'text-gray-500'
                  }`}>
                    {getStatusIcon(msg.status)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          {/* Media Buttons */}
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="p-2">
              <Paperclip className="w-4 h-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Image className="w-4 h-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <FileText className="w-4 h-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Video className="w-4 h-4 text-gray-500" />
            </Button>
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite uma mensagem..."
              className="pr-10"
            />
            <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1">
              <Smile className="w-4 h-4 text-gray-500" />
            </Button>
          </div>

          {/* Send/Mic Button */}
          {message.trim() ? (
            <Button
              onClick={handleSendMessage}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="p-2">
              <Mic className="w-4 h-4 text-gray-500" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
