import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  QrCode,
  Clock,
  ChevronRight,
  CalendarDays,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { Card, CardBody, Badge, Spinner } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { clientService } from '@/services/client.service';
import { formatDate, formatCurrency } from '@/utils/format';
import styles from './ClientHome.module.scss';

export default function ClientHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [card, setCard] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [validations, setValidations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [cardRes, subRes, valRes] = await Promise.all([
        clientService.getCard(),
        clientService.getSubscription(),
        clientService.getValidations(1, 3),
      ]);
      setCard(cardRes.data?.card || cardRes.data);
      setSubscription(subRes.data?.subscription || subRes.data);
      setValidations(valRes.data?.validations || valRes.data?.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
      </div>
    );
  }

  const firstName = user?.name?.split(' ')[0] || 'Cliente';

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>
            Ola, {firstName}!
          </h1>
          <p className={styles.subtitle}>
            Bem-vindo ao seu painel VALE+
          </p>
        </div>
      </header>

      <div className={styles.grid}>
        {/* Card Preview */}
        <Card
          className={styles.cardPreview}
          padding="none"
          clickable
          onClick={() => navigate('/cliente/cartao')}
        >
          <div className={styles.virtualCard}>
            <div className={styles.virtualCardHeader}>
              <span className={styles.logoText}>
                VALE<span className={styles.logoAccent}>+</span>
              </span>
              <Badge variant="success" size="sm" dot>
                Ativo
              </Badge>
            </div>
            <div className={styles.cardCode}>
              {card?.cardCode || '---'}
            </div>
            <div className={styles.cardName}>
              {user?.name || 'Membro VALE+'}
            </div>
          </div>
          <div className={styles.cardAction}>
            <span>Ver cartao</span>
            <ChevronRight size={16} />
          </div>
        </Card>

        {/* Subscription Status */}
        <Card className={styles.subscriptionCard}>
          <CardBody>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className={styles.sectionTitle}>Assinatura</h3>
                <p className={styles.planName}>
                  {subscription?.planName || 'Plano VALE+'}
                </p>
              </div>
              <Badge
                variant={subscription?.status === 'ACTIVE' ? 'success' : 'warning'}
                size="sm"
              >
                {subscription?.status === 'ACTIVE' ? 'Ativa' : 'Inativa'}
              </Badge>
            </div>

            <div className={styles.subscriptionDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Valor</span>
                <span className={styles.detailValue}>
                  {subscription?.price
                    ? formatCurrency(subscription.price)
                    : '--'}
                  <span className={styles.detailSuffix}>/mes</span>
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Renovacao</span>
                <span className={styles.detailValue}>
                  {subscription?.renewalDate
                    ? formatDate(subscription.renewalDate)
                    : '--'}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button
            className={styles.actionBtn}
            onClick={() => navigate('/cliente/cartao')}
          >
            <div className={styles.actionIcon}>
              <CreditCard size={22} />
            </div>
            <span>Ver Cartao</span>
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => navigate('/cliente/validar')}
          >
            <div className={`${styles.actionIcon} ${styles.actionIconAccent}`}>
              <QrCode size={22} />
            </div>
            <span>Validar Desconto</span>
          </button>
          <button
            className={styles.actionBtn}
            onClick={() => navigate('/cliente/pagamentos')}
          >
            <div className={styles.actionIcon}>
              <CalendarDays size={22} />
            </div>
            <span>Pagamentos</span>
          </button>
        </div>

        {/* Recent Validations */}
        <Card className={styles.validationsCard}>
          <CardBody>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>
                  <Clock size={20} />
                </div>
                <h3 className={styles.sectionTitle}>Ultimas Validacoes</h3>
              </div>
              <button
                className={styles.viewAll}
                onClick={() => navigate('/cliente/validacoes')}
              >
                Ver todas
                <ChevronRight size={14} />
              </button>
            </div>

            {validations.length === 0 ? (
              <div className={styles.emptyValidations}>
                <Store size={32} />
                <p>Nenhuma validacao ainda.</p>
                <span>Use seu cartao em parceiros para obter descontos!</span>
              </div>
            ) : (
              <ul className={styles.validationsList}>
                {validations.map((v: any, i: number) => (
                  <li key={v.id || i} className={styles.validationItem}>
                    <div className={styles.validationInfo}>
                      <span className={styles.validationPartner}>
                        {v.partnerName || v.partner?.name || 'Parceiro'}
                      </span>
                      <span className={styles.validationDate}>
                        {v.createdAt ? formatDate(v.createdAt) : '--'}
                      </span>
                    </div>
                    <Badge
                      variant={v.status === 'APPROVED' ? 'success' : 'neutral'}
                      size="sm"
                    >
                      {v.discount ? `${v.discount}%` : v.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
