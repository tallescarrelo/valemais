import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CalendarCheck,
  Users,
  Activity,
  QrCode,
  ListChecks,
  ChevronRight,
  Store,
  Clock,
} from 'lucide-react';
import { Card, CardBody, Badge, Spinner } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { partnerService } from '@/services/partner.service';
import { formatDateTime } from '@/utils/format';
import styles from './PartnerHome.module.scss';

export default function PartnerHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [validations, setValidations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [statsRes, valRes] = await Promise.all([
        partnerService.getStats(),
        partnerService.getValidations(1, 5),
      ]);
      setStats(statsRes.data?.stats || statsRes.data);
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

  const partnerName = user?.partnerName || user?.name || 'Parceiro';

  function getStatusBadge(status: string) {
    switch (status) {
      case 'APPROVED':
      case 'VALIDATED':
        return <Badge variant="success" size="sm">Aprovada</Badge>;
      case 'PENDING':
        return <Badge variant="warning" size="sm">Pendente</Badge>;
      case 'REJECTED':
      case 'DENIED':
        return <Badge variant="error" size="sm">Negada</Badge>;
      case 'EXPIRED':
        return <Badge variant="neutral" size="sm">Expirada</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>
            Ola, {partnerName}!
          </h1>
          <p className={styles.subtitle}>
            Painel do estabelecimento parceiro VALE+
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <CardBody>
            <div className={styles.statIcon}>
              <ShieldCheck size={22} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>
                {stats?.totalValidations ?? 0}
              </span>
              <span className={styles.statLabel}>Total de Validacoes</span>
            </div>
          </CardBody>
        </Card>

        <Card className={styles.statCard}>
          <CardBody>
            <div className={`${styles.statIcon} ${styles.statIconAccent}`}>
              <CalendarCheck size={22} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>
                {stats?.monthValidations ?? 0}
              </span>
              <span className={styles.statLabel}>Validacoes no Mes</span>
            </div>
          </CardBody>
        </Card>

        <Card className={styles.statCard}>
          <CardBody>
            <div className={`${styles.statIcon} ${styles.statIconInfo}`}>
              <Users size={22} />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>
                {stats?.totalClients ?? 0}
              </span>
              <span className={styles.statLabel}>Clientes Atendidos</span>
            </div>
          </CardBody>
        </Card>

        <Card className={styles.statCard}>
          <CardBody>
            <div className={`${styles.statIcon} ${styles.statIconStatus}`}>
              <Activity size={22} />
            </div>
            <div className={styles.statInfo}>
              <Badge
                variant={stats?.status === 'ACTIVE' ? 'success' : 'warning'}
                size="sm"
                dot
              >
                {stats?.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
              </Badge>
              <span className={styles.statLabel}>Status</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <button
          className={styles.actionBtn}
          onClick={() => navigate('/parceiro/qrcode')}
        >
          <div className={`${styles.actionIcon} ${styles.actionIconAccent}`}>
            <QrCode size={22} />
          </div>
          <span>Ver QR Code</span>
        </button>
        <button
          className={styles.actionBtn}
          onClick={() => navigate('/parceiro/validacoes')}
        >
          <div className={styles.actionIcon}>
            <ListChecks size={22} />
          </div>
          <span>Todas Validacoes</span>
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
              onClick={() => navigate('/parceiro/validacoes')}
            >
              Ver todas
              <ChevronRight size={14} />
            </button>
          </div>

          {validations.length === 0 ? (
            <div className={styles.emptyValidations}>
              <Store size={32} />
              <p>Nenhuma validacao ainda.</p>
              <span>Quando clientes validarem descontos, elas aparecerao aqui.</span>
            </div>
          ) : (
            <ul className={styles.validationsList}>
              {validations.map((v: any, i: number) => (
                <li key={v.id || i} className={styles.validationItem}>
                  <div className={styles.validationInfo}>
                    <span className={styles.validationClient}>
                      {v.clientName || v.client?.name || 'Cliente'}
                    </span>
                    <span className={styles.validationDate}>
                      {v.createdAt ? formatDateTime(v.createdAt) : '--'}
                    </span>
                  </div>
                  <div className={styles.validationRight}>
                    {v.discount && (
                      <span className={styles.validationDiscount}>
                        {v.discount}%
                      </span>
                    )}
                    {getStatusBadge(v.status)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
