import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Store,
  Tag,
  Calendar,
} from 'lucide-react';
import { Card, CardBody, Badge, Spinner, EmptyState } from '@/components/ui';
import { clientService } from '@/services/client.service';
import { formatDate, formatDateTime } from '@/utils/format';
import styles from './ClientValidations.module.scss';

const LIMIT = 10;

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

export default function ClientValidations() {
  const [validations, setValidations] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadValidations();
  }, [page]);

  async function loadValidations() {
    setLoading(true);
    try {
      const res = await clientService.getValidations(page, LIMIT);
      const data = res.data;
      setValidations(data?.validations || data?.items || []);
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
          <h1 className={styles.title}>Validacoes</h1>
          <p className={styles.subtitle}>
            Historico de descontos utilizados na rede VALE+
          </p>
        </div>
        {total > 0 && (
          <span className={styles.totalLabel}>
            {total} validaca{total !== 1 ? 'oes' : 'o'}
          </span>
        )}
      </header>

      {validations.length === 0 && !loading ? (
        <Card>
          <CardBody>
            <EmptyState
              icon={ShieldCheck}
              title="Nenhuma validacao encontrada"
              description="Use seu cartao VALE+ em parceiros para ver suas validacoes aqui."
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
                    <th>Parceiro</th>
                    <th>Categoria</th>
                    <th>Desconto</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5}>
                        <div className={styles.tableLoading}>
                          <Spinner size="sm" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    validations.map((v: any, index: number) => (
                      <tr key={v.id || index}>
                        <td>
                          <span className={styles.dateCell}>
                            {v.createdAt ? formatDateTime(v.createdAt) : '--'}
                          </span>
                        </td>
                        <td>
                          <div className={styles.partnerCell}>
                            <Store size={16} className={styles.partnerIcon} />
                            <span>{v.partnerName || v.partner?.name || 'Parceiro'}</span>
                          </div>
                        </td>
                        <td>
                          <span className={styles.categoryCell}>
                            {v.category || v.partner?.category || '--'}
                          </span>
                        </td>
                        <td>
                          <span className={styles.discountCell}>
                            {v.discount ? `${v.discount}%` : '--'}
                          </span>
                        </td>
                        <td>{getStatusBadge(v.status)}</td>
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
              validations.map((v: any, index: number) => (
                <Card key={v.id || index} className={styles.validationCard}>
                  <CardBody>
                    <div className={styles.validationCardHeader}>
                      <div className={styles.validationIcon}>
                        <Store size={18} />
                      </div>
                      <div className={styles.validationInfo}>
                        <span className={styles.validationPartner}>
                          {v.partnerName || v.partner?.name || 'Parceiro'}
                        </span>
                        <span className={styles.validationCategory}>
                          {v.category || v.partner?.category || '--'}
                        </span>
                      </div>
                      {getStatusBadge(v.status)}
                    </div>
                    <div className={styles.validationCardFooter}>
                      <div className={styles.validationMeta}>
                        <Calendar size={14} />
                        <span>
                          {v.createdAt ? formatDate(v.createdAt) : '--'}
                        </span>
                      </div>
                      <div className={styles.validationDiscount}>
                        <Tag size={14} />
                        <span>{v.discount ? `${v.discount}% desconto` : '--'}</span>
                      </div>
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
