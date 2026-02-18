import { useState, useEffect } from 'react';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, Badge, Spinner, EmptyState } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { formatDateTime, formatDate } from '@/utils/format';
import styles from './AdminValidations.module.scss';

const STATUS_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'neutral' }> = {
  APPROVED: { label: 'Aprovada', variant: 'success' },
  PENDING: { label: 'Pendente', variant: 'warning' },
  REJECTED: { label: 'Rejeitada', variant: 'error' },
  EXPIRED: { label: 'Expirada', variant: 'neutral' },
};

export default function AdminValidations() {
  const [validations, setValidations] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadValidations();
  }, [page]);

  async function loadValidations() {
    setLoading(true);
    try {
      const res = await adminService.listValidations(page, 10);
      setValidations(res.data?.validations || res.data?.items || []);
      setPagination(res.data?.pagination || res.data?.meta || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = pagination.totalPages || pagination.lastPage || 1;

  if (loading && validations.length === 0) {
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
          <h1 className={styles.title}>Validacoes</h1>
          <p className={styles.subtitle}>
            {pagination.total ?? validations.length} validac{(pagination.total ?? validations.length) !== 1 ? 'oes' : 'ao'} registrada{(pagination.total ?? validations.length) !== 1 ? 's' : ''}
          </p>
        </div>
      </header>

      {validations.length === 0 && !loading ? (
        <EmptyState
          icon={BarChart3}
          title="Nenhuma validacao encontrada"
          description="Ainda nao ha validacoes registradas na plataforma."
        />
      ) : (
        <Card>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Cliente</th>
                  <th>Parceiro</th>
                  <th className={styles.hideOnMobile}>Desconto</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {validations.map((v, i) => {
                  const status = STATUS_MAP[v.status] || {
                    label: v.status || '--',
                    variant: 'neutral' as const,
                  };

                  return (
                    <tr key={v.id || i} className={styles.tableRow}>
                      <td className={styles.cellDate}>
                        <span className={styles.dateMain}>
                          {v.createdAt ? formatDate(v.createdAt) : '--'}
                        </span>
                        {v.createdAt && (
                          <span className={styles.dateTime}>
                            {new Date(v.createdAt).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </td>
                      <td className={styles.cellName}>
                        {v.clientName || v.client?.name || '--'}
                      </td>
                      <td>
                        {v.partnerName || v.partner?.name || v.partner?.establishmentName || '--'}
                      </td>
                      <td className={styles.hideOnMobile}>
                        {v.discount != null ? (
                          <span className={styles.discount}>{v.discount}%</span>
                        ) : (
                          '--'
                        )}
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
