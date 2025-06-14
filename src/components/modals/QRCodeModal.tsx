
import React, { useState, useEffect } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (instanceData: any) => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [timeLeft, setTimeLeft] = useState(18);
  const [isExpired, setIsExpired] = useState(false);
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    if (isOpen) {
      generateQRCode();
      setTimeLeft(18);
      setIsExpired(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  const generateQRCode = () => {
    // Simular geração de QR Code
    const qrData = `whatsapp://connect/${Math.random().toString(36).substr(2, 9)}`;
    setQrCode(qrData);
    setIsExpired(false);
    setTimeLeft(18);
  };

  const handleRefresh = () => {
    generateQRCode();
  };

  // Simular conexão bem-sucedida após alguns segundos
  useEffect(() => {
    if (!isOpen) return;

    const simulateConnection = setTimeout(() => {
      const instanceData = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Nova Instância ${Math.floor(Math.random() * 100)}`,
        tag: 'Trial',
        status: 'connected' as const,
        phone: '+55 11 99999-9999',
        avatar: 'NI'
      };
      onSuccess(instanceData);
    }, 8000); // Conecta após 8 segundos

    return () => clearTimeout(simulateConnection);
  }, [isOpen, onSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Conectar WhatsApp</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* QR Code */}
          <div className="relative">
            <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
              {!isExpired ? (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 w-48 h-48">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-full h-full ${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <p className="text-gray-500 mb-4">QR Code expirado</p>
                  <Button
                    onClick={handleRefresh}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Gerar Novo</span>
                  </Button>
                </div>
              )}
            </div>
            
            {/* Timer */}
            {!isExpired && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#25D366] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {timeLeft}s
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900">Conectar WhatsApp</h3>
            <p className="text-sm text-gray-600">
              Abra o WhatsApp no seu celular e escaneie este QR Code
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>1. Toque nos três pontos no canto superior direito</p>
              <p>2. Selecione "Dispositivos conectados"</p>
              <p>3. Toque em "Conectar um dispositivo"</p>
              <p>4. Escaneie este código QR</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleRefresh}
              disabled={!isExpired}
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Renovar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
