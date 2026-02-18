import { useState, useEffect } from 'react';
import { CreditCard, Calendar, Shield, Copy, Check } from 'lucide-react';
import { Card, CardBody, Badge, Spinner } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { clientService } from '@/services/client.service';
import { formatDate } from '@/utils/format';
import styles from './ClientCard.module.scss';

export default function ClientCard() {
  const { user } = useAuth();

  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadCard();
  }, []);

  async function loadCard() {
    try {
      const res = await clientService.getCard();
      setCard(res.data?.card || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyCode() {
    if (!card?.cardCode) return;
    try {
      await navigator.clipboard.writeText(card.cardCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Falha ao copiar');
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Meu Cartao</h1>
        <p className={styles.subtitle}>
          Seu cartao virtual VALE+ para descontos em parceiros
        </p>
      </header>

      {/* Large Virtual Card */}
      <div className={styles.cardContainer}>
        <div className={styles.virtualCard}>
          <div className={styles.cardGlow} />
          <div className={styles.cardContent}>
            <div className={styles.cardTop}>
              <span className={styles.logoText}>
                VALE<span className={styles.logoAccent}>+</span>
              </span>
              <div className={styles.cardChip}>
                <CreditCard size={24} />
              </div>
            </div>

            <div className={styles.cardCodeSection}>
              <span className={styles.cardCodeLabel}>Codigo do Cartao</span>
              <span className={styles.cardCode}>
                {card?.cardCode || '--- --- ---'}
              </span>
            </div>

            <div className={styles.cardBottom}>
              <div className={styles.cardHolder}>
                <span className={styles.cardLabel}>Titular</span>
                <span className={styles.cardValue}>
                  {user?.name || 'Membro VALE+'}
                </span>
              </div>
              <div className={styles.cardMember}>
                <span className={styles.cardLabel}>Membro desde</span>
                <span className={styles.cardValue}>
                  {card?.createdAt ? formatDate(card.createdAt) : '--/--/----'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className={styles.infoGrid}>
        <Card className={styles.infoCard}>
          <CardBody>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Shield size={20} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Status</span>
                <div className={styles.infoValue}>
                  <Badge
                    variant={card?.status === 'ACTIVE' ? 'success' : 'warning'}
                    dot
                  >
                    {card?.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className={styles.infoCard}>
          <CardBody>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <Calendar size={20} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Membro desde</span>
                <span className={styles.infoValue}>
                  {card?.createdAt ? formatDate(card.createdAt) : '--'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className={styles.infoCard}>
          <CardBody>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <CreditCard size={20} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Codigo</span>
                <div className={styles.codeRow}>
                  <span className={styles.infoValue}>
                    {card?.cardCode || '---'}
                  </span>
                  <button
                    className={styles.copyBtn}
                    onClick={handleCopyCode}
                    title="Copiar codigo"
                  >
                    {copied ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Usage Tip */}
      <Card variant="flat" className={styles.tipCard}>
        <CardBody>
          <div className={styles.tipContent}>
            <div className={styles.tipIcon}>
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className={styles.tipTitle}>Como usar seu cartao</h3>
              <p className={styles.tipText}>
                Apresente o codigo do seu cartao em qualquer parceiro VALE+ para
                obter descontos exclusivos. Voce tambem pode usar a funcao
                "Validar Desconto" para escanear o QR Code do parceiro.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
