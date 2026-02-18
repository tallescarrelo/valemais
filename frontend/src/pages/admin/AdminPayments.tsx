import { useState, useEffect } from 'react';
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from 'lucide-react';
import { Card, CardBody, Badge, Spinner, EmptyState } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { formatCurrency, formatDate } from '@/utils/format';
import styles from './AdminPayments.module.scss';

const STATUS_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'neutral' }> = {
  PAID: { label: 'Pago', variant: 'success' },
  APPROVED: { label: 'Aprovado', variant: 'success' },
  PENDING: { label: 'Pendente', variant: 'warning' },
  FAILED: { label: 'Falhou', variant: 'error' },
  REFUNDED: { label: 'Reembolsado', variant: 'neutral' },
  CANCELLED: { label: 'Cancelado', variant: 'neutral' },
};

export default function AdminPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalCount: 0,
  });

  useEffect(() => {
    loadData();
  }, [page]);

  async function loadData() {
    setLoading(true);
    try {
      const [paymentsRes, dashboardRes] = await Promise.all([
        adminService.listPayments(page, 10),
        page === 1 ? adminService.getDashboard() : Promise.resolve(null),
      ]);

      setPayments(paymentsRes.data?.payments || paymentsRes.data?.items || []);
      setPagination(paymentsRes.data?.pagination || paymentsRes.data?.meta || {});

      if (dashboardRes) {
        setSummary({
          totalRevenue: dashboardRes.data?.totalRevenue ?? 0,
          monthlyRevenue: dashboardRes.data?.monthlyRevenue ?? 0,
          totalCount: paymentsRes.data?.pagination?.total || paymentsRes.data?.meta?.total || 0,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = pagination.totalPages || pagination.lastPage || 1;

  if (loading && payments.length === 0) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Pagamentos</h1>
          <p className={styles.subtitle}>Financeiro da plataforma VALE+</p>
        </div>
      </header>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <Card className={styles.summaryCard}>
          <CardBody>
            <div className={styles.summaryTop}>
              <div className={`${styles.summaryIcon} ${styles['summaryIcon--accent']}`}>
                <DollarSign size={20} />
              </div>
            </div>
            <div className={styles.summaryValue}>
              {formatCurrency(summary.totalRevenue)}
            </div>
            <div className={styles.summaryLabel}>Receita Total</div>
          </CardBody>
        </Card>

        <Card className={styles.summaryCard}>
          <CardBody>
            <div className={styles.summaryTop}>
              <div className={`${styles.summaryIcon} ${styles['summaryIcon--info']}`}>
                <TrendingUp size={20} />
              </div>
            </div>
            <div className={styles.summaryValue}>
              {formatCurrency(summary.monthlyRevenue)}
            </div>
            <div className={styles.summaryLabel}>Receita Mensal</div>
          </CardBody>
        </Card>

        <Card className={styles.summaryCard}>
          <CardBody>
            <div className={styles.summaryTop}>
              <div className={`${styles.summaryIcon} ${styles['summaryIcon--primary']}`}>
                <CreditCard size={20} />
              </div>
            </div>
            <div className={styles.summaryValue}>
              {summary.totalCount || pagination.total || 0}
            </div>
            <div className={styles.summaryLabel}>Total de Pagamentos</div>
          </CardBody>
        </Card>
      </div>

      {/* Payments Table */}
      {payments.length === 0 && !loading ? (
        <EmptyState
          icon={Receipt}
          title="Nenhum pagamento encontrado"
          description="Ainda nao ha pagamentos registrados na plataforma."
        />
      ) : (
        <Card>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th className={styles.hideOnMobile}>Plano</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => {
                  const status = STATUS_MAP[p.status] || {
                    label: p.status || '--',
                    variant: 'neutral' as const,
                  };

                  return (
                    <tr key={p.id || i} className={styles.tableRow}>
                      <td className={styles.cellDate}>
                        <span className={styles.dateMain}>
                          {p.createdAt ? formatDate(p.createdAt) : p.paidAt ? formatDate(p.paidAt) : '--'}
                        </span>
                        {(p.createdAt || p.paidAt) && (
                          <span className={styles.dateTime}>
                            {new Date(p.createdAt || p.paidAt).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </td>
                      <td className={styles.cellName}>
                        {p.clientName || p.client?.name || '--'}
                      </td>
                      <td className={styles.hideOnMobile}>
                        {p.planName || p.plan?.name || '--'}
                      </td>
                      <td className={styles.cellAmount}>
                        {formatCurrency(p.amount ?? p.value ?? p.price ?? 0)}
                      </td>
                      <td>
                        <Badge variant={status.variant} size="sm">
                          {status.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft size={16} />
                Anterior
              </button>
              <span className={styles.pageInfo}>
                Pagina {page} de {totalPages}
              </span>
              <button
                className={styles.pageBtn}
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Proxima
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
