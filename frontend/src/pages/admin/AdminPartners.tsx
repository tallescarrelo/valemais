import { useState, useEffect } from 'react';
import {
  Store,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Tag,
} from 'lucide-react';
import {
  Card,
  CardBody,
  Button,
  Select,
  Badge,
  Spinner,
  EmptyState,
  Modal,
} from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { formatDate, formatPhone } from '@/utils/format';
import styles from './AdminPartners.module.scss';

const STATUS_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'neutral' }> = {
  PENDING_APPROVAL: { label: 'Pendente', variant: 'warning' },
  ACTIVE: { label: 'Ativo', variant: 'success' },
  INACTIVE: { label: 'Inativo', variant: 'neutral' },
  REJECTED: { label: 'Rejeitado', variant: 'error' },
};

const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'INACTIVE', label: 'Inativo' },
  { value: 'REJECTED', label: 'Rejeitado' },
];

export default function AdminPartners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadPartners();
  }, [page]);

  async function loadPartners() {
    setLoading(true);
    try {
      const res = await adminService.listPartners(page, 10);
      setPartners(res.data?.partners || res.data?.items || []);
      setPagination(res.data?.pagination || res.data?.meta || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function openDetail(partner: any) {
    setShowDetail(true);
    setDetailLoading(true);
    try {
      const res = await adminService.getPartner(partner.id);
      setSelectedPartner(res.data?.partner || res.data);
    } catch (err) {
      console.error(err);
      setSelectedPartner(partner);
    } finally {
      setDetailLoading(false);
    }
  }

  function closeDetail() {
    setShowDetail(false);
    setSelectedPartner(null);
  }

  async function handleApprove(partnerId: string) {
    setActionLoading(partnerId);
    try {
      await adminService.approvePartner(partnerId);
      if (selectedPartner?.id === partnerId) {
        setSelectedPartner({ ...selectedPartner, status: 'ACTIVE' });
      }
      await loadPartners();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(partnerId: string) {
    setActionLoading(partnerId);
    try {
      await adminService.rejectPartner(partnerId);
      if (selectedPartner?.id === partnerId) {
        setSelectedPartner({ ...selectedPartner, status: 'REJECTED' });
      }
      await loadPartners();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleStatusChange(partnerId: string, newStatus: string) {
    setActionLoading(partnerId);
    try {
      await adminService.updatePartnerStatus(partnerId, newStatus);
      if (selectedPartner?.id === partnerId) {
        setSelectedPartner({ ...selectedPartner, status: newStatus });
      }
      await loadPartners();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  }

  const totalPages = pagination.totalPages || pagination.lastPage || 1;

  if (loading && partners.length === 0) {
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
          <h1 className={styles.title}>Parceiros</h1>
          <p className={styles.subtitle}>
            {pagination.total ?? partners.length} parceiro{(pagination.total ?? partners.length) !== 1 ? 's' : ''} cadastrado{(pagination.total ?? partners.length) !== 1 ? 's' : ''}
          </p>
        </div>
      </header>

      {partners.length === 0 && !loading ? (
        <EmptyState
          icon={Store}
          title="Nenhum parceiro encontrado"
          description="Ainda nao ha parceiros cadastrados na plataforma."
        />
      ) : (
        <Card>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Estabelecimento</th>
                  <th className={styles.hideOnMobile}>Categoria</th>
                  <th className={styles.hideOnMobile}>Cidade</th>
                  <th>Status</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner) => {
                  const status = STATUS_MAP[partner.status] || {
                    label: partner.status,
                    variant: 'neutral' as const,
                  };
                  const isPending = partner.status === 'PENDING_APPROVAL';

                  return (
                    <tr
                      key={partner.id}
                      className={styles.tableRow}
                      onClick={() => openDetail(partner)}
                    >
                      <td className={styles.cellName}>
                        {partner.establishmentName || partner.name || '--'}
                      </td>
                      <td className={styles.hideOnMobile}>
                        {partner.category || '--'}
                      </td>
                      <td className={styles.hideOnMobile}>
                        {partner.city || partner.address?.city || '--'}
                      </td>
                      <td>
                        <Badge variant={status.variant} size="sm">
                          {status.label}
                        </Badge>
                      </td>
                      <td>
                        <div className={styles.actionButtons}>
                          {isPending && (
                            <>
                              <button
                                className={`${styles.inlineBtn} ${styles.approveBtn}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApprove(partner.id);
                                }}
                                disabled={actionLoading === partner.id}
                                title="Aprovar"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                className={`${styles.inlineBtn} ${styles.rejectBtn}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReject(partner.id);
                                }}
                                disabled={actionLoading === partner.id}
                                title="Rejeitar"
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                          <button
                            className={styles.viewBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetail(partner);
                            }}
                            title="Ver detalhes"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
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

      <Modal
        isOpen={showDetail}
        onClose={closeDetail}
        title="Detalhes do Parceiro"
      >
        {detailLoading ? (
          <div className={styles.modalLoading}>
            <Spinner size="md" />
          </div>
        ) : selectedPartner ? (
          <div className={styles.detail}>
            <div className={styles.detailSection}>
              <h4 className={styles.detailSectionTitle}>Estabelecimento</h4>
              <div className={styles.detailGrid}>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <Store size={14} /> Nome
                  </span>
                  <span className={styles.detailValue}>
                    {selectedPartner.establishmentName || selectedPartner.name || '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <Tag size={14} /> Categoria
                  </span>
                  <span className={styles.detailValue}>
                    {selectedPartner.category || '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <Mail size={14} /> E-mail
                  </span>
                  <span className={styles.detailValue}>
                    {selectedPartner.email || selectedPartner.user?.email || '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <Phone size={14} /> Telefone
                  </span>
                  <span className={styles.detailValue}>
                    {selectedPartner.phone ? formatPhone(selectedPartner.phone) : '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <MapPin size={14} /> Endereco
                  </span>
                  <span className={styles.detailValue}>
                    {selectedPartner.address
                      ? `${selectedPartner.address.street || ''}, ${selectedPartner.address.number || ''} - ${selectedPartner.address.city || ''} / ${selectedPartner.address.state || ''}`
                      : selectedPartner.city || '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <Calendar size={14} /> Cadastro
                  </span>
                  <span className={styles.detailValue}>
                    {selectedPartner.createdAt ? formatDate(selectedPartner.createdAt) : '--'}
                  </span>
                </div>
              </div>
            </div>

            {selectedPartner.discount && (
              <div className={styles.detailSection}>
                <h4 className={styles.detailSectionTitle}>Desconto Oferecido</h4>
                <span className={styles.discountBadge}>
                  {selectedPartner.discount}%
                </span>
              </div>
            )}

            <div className={styles.detailSection}>
              <h4 className={styles.detailSectionTitle}>Acoes</h4>

              {selectedPartner.status === 'PENDING_APPROVAL' ? (
                <div className={styles.approvalActions}>
                  <Button
                    onClick={() => handleApprove(selectedPartner.id)}
                    disabled={actionLoading === selectedPartner.id}
                  >
                    <Check size={16} />
                    {actionLoading === selectedPartner.id ? 'Aguarde...' : 'Aprovar Parceiro'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleReject(selectedPartner.id)}
                    disabled={actionLoading === selectedPartner.id}
                  >
                    <X size={16} />
                    Rejeitar
                  </Button>
                </div>
              ) : (
                <div className={styles.statusChange}>
                  <Select
                    label="Alterar status"
                    value={selectedPartner.status || ''}
                    onChange={(e) =>
                      handleStatusChange(selectedPartner.id, e.target.value)
                    }
                    options={STATUS_OPTIONS}
                  />
                  {actionLoading === selectedPartner.id && <Spinner size="sm" />}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
