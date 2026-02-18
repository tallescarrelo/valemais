import { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  Store,
  Clock,
  BarChart3,
  DollarSign,
  TrendingUp,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import { Card, CardBody, Badge, Spinner } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { formatCurrency, formatDateTime } from '@/utils/format';
import styles from './AdminDashboard.module.scss';

interface KPICard {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'accent' | 'info' | 'warning';
  trend?: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await adminService.getDashboard();
      setData(res.data);
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

  const kpis: KPICard[] = [
    {
      label: 'Total de Clientes',
      value: data?.totalClients ?? 0,
      icon: <Users size={22} />,
      color: 'primary',
    },
    {
      label: 'Clientes Ativos',
      value: data?.activeClients ?? 0,
      icon: <UserCheck size={22} />,
      color: 'accent',
      trend: data?.totalClients
        ? `${Math.round(((data.activeClients || 0) / data.totalClients) * 100)}%`
        : undefined,
    },
    {
      label: 'Total de Parceiros',
      value: data?.totalPartners ?? 0,
      icon: <Store size={22} />,
      color: 'info',
    },
    {
      label: 'Parceiros Pendentes',
      value: data?.pendingPartners ?? 0,
      icon: <Clock size={22} />,
      color: 'warning',
    },
    {
      label: 'Total de Validacoes',
      value: data?.totalValidations ?? 0,
      icon: <BarChart3 size={22} />,
      color: 'primary',
      trend: data?.monthlyValidations
        ? `${data.monthlyValidations} este mes`
        : undefined,
    },
    {
      label: 'Receita Mensal',
      value: formatCurrency(data?.monthlyRevenue ?? 0),
      icon: <DollarSign size={22} />,
      color: 'accent',
      trend: data?.totalRevenue
        ? `${formatCurrency(data.totalRevenue)} total`
        : undefined,
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Visao geral da plataforma VALE+</p>
      </header>

      <div className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <Card key={kpi.label} className={styles.kpiCard}>
            <CardBody>
              <div className={styles.kpiTop}>
                <div className={`${styles.kpiIcon} ${styles[`kpiIcon--${kpi.color}`]}`}>
                  {kpi.icon}
                </div>
                {kpi.trend && (
                  <span className={styles.kpiTrend}>
                    <TrendingUp size={14} />
                    {kpi.trend}
                  </span>
                )}
              </div>
              <div className={styles.kpiValue}>{kpi.value}</div>
              <div className={styles.kpiLabel}>{kpi.label}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className={styles.listsGrid}>
        {/* Recent Validations */}
        <Card className={styles.listCard}>
          <CardBody>
            <div className={styles.listHeader}>
              <div className={styles.listTitleRow}>
                <BarChart3 size={18} className={styles.listIcon} />
                <h2 className={styles.listTitle}>Validacoes Recentes</h2>
              </div>
              <a href="/admin/validacoes" className={styles.viewAll}>
                Ver todas <ChevronRight size={14} />
              </a>
            </div>

            {(!data?.recentValidations || data.recentValidations.length === 0) ? (
              <p className={styles.emptyText}>Nenhuma validacao recente.</p>
            ) : (
              <ul className={styles.list}>
                {data.recentValidations.map((v: any, i: number) => (
                  <li key={v.id || i} className={styles.listItem}>
                    <div className={styles.listItemInfo}>
                      <span className={styles.listItemName}>
                        {v.clientName || v.client?.name || 'Cliente'}
                      </span>
                      <span className={styles.listItemSub}>
                        {v.partnerName || v.partner?.name || 'Parceiro'}
                        {' - '}
                        {v.createdAt ? formatDateTime(v.createdAt) : '--'}
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

        {/* Recent Payments */}
        <Card className={styles.listCard}>
          <CardBody>
            <div className={styles.listHeader}>
              <div className={styles.listTitleRow}>
                <CreditCard size={18} className={styles.listIcon} />
                <h2 className={styles.listTitle}>Pagamentos Recentes</h2>
              </div>
              <a href="/admin/pagamentos" className={styles.viewAll}>
                Ver todos <ChevronRight size={14} />
              </a>
            </div>

            {(!data?.recentPayments || data.recentPayments.length === 0) ? (
              <p className={styles.emptyText}>Nenhum pagamento recente.</p>
            ) : (
              <ul className={styles.list}>
                {data.recentPayments.map((p: any, i: number) => (
                  <li key={p.id || i} className={styles.listItem}>
                    <div className={styles.listItemInfo}>
                      <span className={styles.listItemName}>
                        {p.clientName || p.client?.name || 'Cliente'}
                      </span>
                      <span className={styles.listItemSub}>
                        {p.planName || p.plan?.name || 'Plano'}
                        {' - '}
                        {p.createdAt ? formatDateTime(p.createdAt) : '--'}
                      </span>
                    </div>
                    <span className={styles.paymentAmount}>
                      {formatCurrency(p.amount ?? p.value ?? 0)}
                    </span>
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
