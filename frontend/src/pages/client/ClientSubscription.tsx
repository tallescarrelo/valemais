import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Calendar,
  CreditCard,
  Check,
  AlertTriangle,
  X,
} from 'lucide-react';
import { Card, CardBody, Badge, Button, Spinner, Modal } from '@/components/ui';
import { clientService } from '@/services/client.service';
import { formatCurrency, formatDate } from '@/utils/format';
import styles from './ClientSubscription.module.scss';

const DEFAULT_FEATURES = [
  'Acesso a todos os parceiros da rede',
  'Descontos exclusivos em produtos e servicos',
  'Cartao virtual VALE+',
  'Historico de validacoes',
  'Suporte prioritario',
];

export default function ClientSubscription() {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  useEffect(() => {
    loadSubscription();
  }, []);

  async function loadSubscription() {
    try {
      const res = await clientService.getSubscription();
      setSubscription(res.data?.subscription || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    setCancelling(true);
    try {
      await clientService.cancelSubscription();
      setCancelSuccess(true);
      setCancelModalOpen(false);
      // Reload subscription data
      const res = await clientService.getSubscription();
      setSubscription(res.data?.subscription || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setCancelling(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
      </div>
    );
  }

  const isActive = subscription?.status === 'ACTIVE';
  const features = subscription?.features || DEFAULT_FEATURES;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Minha Assinatura</h1>
        <p className={styles.subtitle}>
          Gerencie seu plano e detalhes da assinatura
        </p>
      </header>

      {/* Cancel success feedback */}
      {cancelSuccess && (
        <div className={styles.successAlert}>
          <Check size={18} />
          <span>Assinatura cancelada com sucesso. Seu acesso permanece ativo ate o fim do periodo pago.</span>
          <button
            className={styles.dismissBtn}
            onClick={() => setCancelSuccess(false)}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Plan Overview */}
      <Card className={styles.planCard}>
        <CardBody>
          <div className={styles.planHeader}>
            <div className={styles.planIcon}>
              <ShieldCheck size={28} />
            </div>
            <div className={styles.planInfo}>
              <div className={styles.planNameRow}>
                <h2 className={styles.planName}>
                  {subscription?.planName || 'Plano VALE+'}
                </h2>
                <Badge
                  variant={isActive ? 'success' : 'warning'}
                  dot
                >
                  {isActive ? 'Ativa' : subscription?.status === 'CANCELLED' ? 'Cancelada' : 'Inativa'}
                </Badge>
              </div>
              <p className={styles.planDescription}>
                {subscription?.description || 'Acesso completo a rede de parceiros VALE+'}
              </p>
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceValue}>
              {subscription?.price
                ? formatCurrency(subscription.price)
                : 'R$ --'}
            </div>
            <span className={styles.pricePeriod}>/mes</span>
          </div>
        </CardBody>
      </Card>

      {/* Details Grid */}
      <div className={styles.detailsGrid}>
        <Card>
          <CardBody>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <Calendar size={20} />
              </div>
              <div>
                <span className={styles.detailLabel}>Data de Renovacao</span>
                <span className={styles.detailValue}>
                  {subscription?.renewalDate
                    ? formatDate(subscription.renewalDate)
                    : '--/--/----'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <CreditCard size={20} />
              </div>
              <div>
                <span className={styles.detailLabel}>Forma de Pagamento</span>
                <span className={styles.detailValue}>
                  {subscription?.paymentMethod || 'Cartao de credito'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <Calendar size={20} />
              </div>
              <div>
                <span className={styles.detailLabel}>Membro desde</span>
                <span className={styles.detailValue}>
                  {subscription?.createdAt
                    ? formatDate(subscription.createdAt)
                    : '--/--/----'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardBody>
          <h3 className={styles.featuresTitle}>O que esta incluso</h3>
          <ul className={styles.featuresList}>
            {features.map((feature: string, index: number) => (
              <li key={index} className={styles.featureItem}>
                <div className={styles.featureCheck}>
                  <Check size={14} />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {/* Cancel Action */}
      {isActive && (
        <Card variant="outlined" className={styles.cancelCard}>
          <CardBody>
            <div className={styles.cancelContent}>
              <div className={styles.cancelInfo}>
                <div className={styles.cancelIcon}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className={styles.cancelTitle}>Cancelar assinatura</h3>
                  <p className={styles.cancelText}>
                    Ao cancelar, voce mantera acesso ate o final do periodo pago.
                    Apos isso, nao podera utilizar os descontos da rede VALE+.
                  </p>
                </div>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setCancelModalOpen(true)}
              >
                Cancelar assinatura
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        type="confirm"
        title="Cancelar assinatura"
        message="Tem certeza que deseja cancelar sua assinatura? Voce perdera acesso aos descontos ao fim do periodo atual."
        confirmLabel="Sim, cancelar"
        cancelLabel="Manter assinatura"
        onConfirm={handleCancel}
        loading={cancelling}
      />
    </div>
  );
}
