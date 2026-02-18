import { useState, useEffect } from 'react';
import {
  Receipt,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from 'lucide-react';
import { Card, CardBody, Badge, Spinner, EmptyState } from '@/components/ui';
import { clientService } from '@/services/client.service';
import { formatCurrency, formatDate } from '@/utils/format';
import styles from './ClientPayments.module.scss';

const LIMIT = 10;

function getStatusBadge(status: string) {
  switch (status) {
    case 'PAID':
    case 'APPROVED':
      return <Badge variant="success" size="sm">Pago</Badge>;
    case 'PENDING':
      return <Badge variant="warning" size="sm">Pendente</Badge>;
    case 'FAILED':
    case 'REJECTED':
      return <Badge variant="error" size="sm">Falhou</Badge>;
    case 'REFUNDED':
      return <Badge variant="info" size="sm">Reembolsado</Badge>;
    case 'CANCELLED':
      return <Badge variant="neutral" size="sm">Cancelado</Badge>;
    default:
      return <Badge variant="neutral" size="sm">{status}</Badge>;
  }
}

export default function ClientPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, [page]);

  async function loadPayments() {
    setLoading(true);
    try {
      const res = await clientService.getPayments(page, LIMIT);
      const data = res.data;
      setPayments(data?.payments || data?.items || []);
      setTotalPages(data?.totalPages || data?.meta?.totalPages || 1);
      setTotal(data?.total || data?.meta?.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading && page === 1) {
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
          <p className={styles.subtitle}>
            Historico de pagamentos da sua assinatura
          </p>
        </div>
        {total > 0 && (
          <span className={styles.totalLabel}>
            {total} pagamento{total !== 1 ? 's' : ''}
          </span>
        )}
      </header>

      {payments.length === 0 && !loading ? (
        <Card>
          <CardBody>
            <EmptyState
              icon={Receipt}
              title="Nenhum pagamento encontrado"
              description="Seus pagamentos aparecerão aqui quando forem processados."
            />
          </CardBody>
        </Card>
      ) : (
        <>
          {/* Desktop Table */}
          <Card className={styles.tableCard} padding="none">
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descricao</th>
                    <th>Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4}>
                        <div className={styles.tableLoading}>
                          <Spinner size="sm" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment: any, index: number) => (
                      <tr key={payment.id || index}>
                        <td>
                          <span className={styles.dateCell}>
                            {payment.createdAt
                              ? formatDate(payment.createdAt)
                              : '--'}
                          </span>
                        </td>
                        <td>
                          <span className={styles.descriptionCell}>
                            {payment.description || 'Assinatura VALE+'}
                          </span>
                        </td>
                        <td>
                          <span className={styles.amountCell}>
                            {payment.amount
                              ? formatCurrency(payment.amount)
                              : '--'}
                          </span>
                        </td>
                        <td>{getStatusBadge(payment.status)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mobile Cards */}
          <div className={styles.mobileCards}>
            {loading ? (
              <div className={styles.loading}>
                <Spinner size="sm" />
              </div>
            ) : (
              payments.map((payment: any, index: number) => (
                <Card key={payment.id || index} className={styles.paymentCard}>
                  <CardBody>
                    <div className={styles.paymentCardHeader}>
                      <div className={styles.paymentIcon}>
                        <DollarSign size={18} />
                      </div>
                      <div className={styles.paymentInfo}>
                        <span className={styles.paymentDesc}>
                          {payment.description || 'Assinatura VALE+'}
                        </span>
                        <span className={styles.paymentDate}>
                          {payment.createdAt
                            ? formatDate(payment.createdAt)
                            : '--'}
                        </span>
                      </div>
                    </div>
                    <div className={styles.paymentCardFooter}>
                      <span className={styles.paymentAmount}>
                        {payment.amount
                          ? formatCurrency(payment.amount)
                          : '--'}
                      </span>
                      {getStatusBadge(payment.status)}
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={18} />
                Anterior
              </button>
              <span className={styles.pageInfo}>
                Pagina {page} de {totalPages}
              </span>
              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Proximo
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
