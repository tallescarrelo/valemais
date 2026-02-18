import { useState, useEffect, useRef } from 'react';
import {
  QrCode,
  Printer,
  Download,
  Info,
  Copy,
  Check,
} from 'lucide-react';
import { Card, CardBody, Button, Spinner } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { partnerService } from '@/services/partner.service';
import styles from './PartnerQrCode.module.scss';

export default function PartnerQrCode() {
  const { user } = useAuth();
  const qrRef = useRef<HTMLImageElement>(null);

  const [qrData, setQrData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadQrCode();
  }, []);

  async function loadQrCode() {
    try {
      const res = await partnerService.getQrCode();
      setQrData(res.data?.qrCode || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handlePrint() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const partnerName = user?.partnerName || user?.name || 'Parceiro VALE+';
    const code = qrData?.code || qrData?.partnerCode || '';
    const imgSrc = qrData?.dataUrl || qrData?.image || qrData?.qrCodeUrl || '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - ${partnerName}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: 'Inter', sans-serif;
              color: #3c3c3b;
            }
            img { width: 300px; height: 300px; }
            h2 { margin-top: 16px; font-size: 20px; }
            p { color: #737373; font-size: 14px; margin-top: 4px; }
            .code {
              font-size: 24px;
              font-weight: 700;
              letter-spacing: 3px;
              margin-top: 12px;
            }
          </style>
        </head>
        <body>
          <img src="${imgSrc}" alt="QR Code" />
          <h2>${partnerName}</h2>
          <div class="code">${code}</div>
          <p>Escaneie para validar seu desconto VALE+</p>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  function handleDownload() {
    const imgSrc = qrData?.dataUrl || qrData?.image || qrData?.qrCodeUrl || '';
    if (!imgSrc) return;

    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = `qrcode-vale-mais-${qrData?.code || 'parceiro'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleCopyCode() {
    const code = qrData?.code || qrData?.partnerCode || '';
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
      </div>
    );
  }

  const partnerName = user?.partnerName || user?.name || 'Parceiro VALE+';
  const code = qrData?.code || qrData?.partnerCode || '';
  const imgSrc = qrData?.dataUrl || qrData?.image || qrData?.qrCodeUrl || '';

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>QR Code</h1>
        <p className={styles.subtitle}>
          Codigo de validacao do seu estabelecimento
        </p>
      </header>

      <div className={styles.content}>
        {/* QR Code Display */}
        <Card className={styles.qrCard}>
          <CardBody>
            <div className={styles.qrContainer}>
              {imgSrc ? (
                <img
                  ref={qrRef}
                  src={imgSrc}
                  alt={`QR Code - ${partnerName}`}
                  className={styles.qrImage}
                />
              ) : (
                <div className={styles.qrPlaceholder}>
                  <QrCode size={80} />
                  <p>QR Code indisponivel</p>
                </div>
              )}

              <h2 className={styles.partnerName}>{partnerName}</h2>

              {code && (
                <div className={styles.codeWrapper}>
                  <span className={styles.codeLabel}>Codigo do parceiro</span>
                  <div className={styles.codeValue}>
                    <span>{code}</span>
                    <button
                      className={styles.copyBtn}
                      onClick={handleCopyCode}
                      title="Copiar codigo"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              <Button
                variant="primary"
                icon={Printer}
                onClick={handlePrint}
                disabled={!imgSrc}
              >
                Imprimir
              </Button>
              <Button
                variant="outline"
                icon={Download}
                onClick={handleDownload}
                disabled={!imgSrc}
              >
                Baixar QR Code
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Instructions */}
        <Card className={styles.instructionsCard}>
          <CardBody>
            <div className={styles.instructionsHeader}>
              <div className={styles.instructionsIcon}>
                <Info size={20} />
              </div>
              <h3 className={styles.instructionsTitle}>Como utilizar</h3>
            </div>

            <ol className={styles.instructionsList}>
              <li>
                <strong>Imprima ou exiba</strong> este QR Code em local visivel do seu estabelecimento.
              </li>
              <li>
                O cliente VALE+ vai <strong>escanear o QR Code</strong> com o aplicativo para validar o desconto.
              </li>
              <li>
                Apos a leitura, a validacao sera registrada automaticamente e voce podera acompanhar no painel.
              </li>
              <li>
                Aplique o <strong>desconto acordado</strong> na compra do cliente.
              </li>
            </ol>

            <div className={styles.instructionsHighlight}>
              <QrCode size={20} />
              <p>
                Mostre este QR Code para os clientes VALE+ validarem seus descontos
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
