import { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
  CreditCard,
  Calendar,
} from 'lucide-react';
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  Badge,
  Spinner,
  EmptyState,
  Modal,
} from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { formatDate, formatCPF, formatPhone, formatCurrency } from '@/utils/format';
import styles from './AdminClients.module.scss';

const STATUS_MAP: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'neutral' }> = {
  ACTIVE: { label: 'Ativo', variant: 'success' },
  INACTIVE: { label: 'Inativo', variant: 'warning' },
  BLOCKED: { label: 'Bloqueado', variant: 'error' },
};

const STATUS_OPTIONS = [
  { value: 'ACTIVE', label: 'Ativo' },
  { value: 'INACTIVE', label: 'Inativo' },
  { value: 'BLOCKED', label: 'Bloqueado' },
];

export default function AdminClients() {
  const [clients, setClients] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    loadClients();
  }, [page]);

  async function loadClients() {
    setLoading(true);
    try {
      const res = await adminService.listClients(page, 10);
      setClients(res.data?.clients || res.data?.items || []);
      setPagination(res.data?.pagination || res.data?.meta || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function openDetail(client: any) {
    setShowDetail(true);
    setDetailLoading(true);
    try {
      const res = await adminService.getClient(client.id);
      setSelectedClient(res.data?.client || res.data);
    } catch (err) {
      console.error(err);
      setSelectedClient(client);
    } finally {
      setDetailLoading(false);
    }
  }

  function closeDetail() {
    setShowDetail(false);
    setSelectedClient(null);
  }

  async function handleStatusChange(clientId: string, newStatus: string) {
    setUpdatingStatus(true);
    try {
      await adminService.updateClientStatus(clientId, newStatus);
      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient({ ...selectedClient, status: newStatus });
      }
      await loadClients();
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingStatus(false);
    }
  }

  const totalPages = pagination.totalPages || pagination.lastPage || 1;

  if (loading && clients.length === 0) {
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
          <h1 className={styles.title}>Clientes</h1>
          <p className={styles.subtitle}>
            {pagination.total ?? clients.length} cliente{(pagination.total ?? clients.length) !== 1 ? 's' : ''} cadastrado{(pagination.total ?? clients.length) !== 1 ? 's' : ''}
          </p>
        </div>
      </header>

      {clients.length === 0 && !loading ? (
        <EmptyState
          icon={Users}
          title="Nenhum cliente encontrado"
          description="Ainda nao ha clientes cadastrados na plataforma."
        />
      ) : (
        <Card>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th className={styles.hideOnMobile}>CPF</th>
                  <th className={styles.hideOnMobile}>Plano</th>
                  <th>Status</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => {
                  const status = STATUS_MAP[client.status] || { label: client.status, variant: 'neutral' as const };
                  return (
                    <tr
                      key={client.id}
                      className={styles.tableRow}
                      onClick={() => openDetail(client)}
                    >
                      <td className={styles.cellName}>
                        {client.name || client.user?.name || '--'}
                      </td>
                      <td className={styles.cellEmail}>
                        {client.email || client.user?.email || '--'}
                      </td>
                      <td className={styles.hideOnMobile}>
                        {client.cpf ? formatCPF(client.cpf) : '--'}
                      </td>
                      <td className={styles.hideOnMobile}>
                        {client.planName || client.plan?.name || '--'}
                      </td>
                      <td>
                        <Badge variant={status.variant} size="sm">
                          {status.label}
                        </Badge>
                      </td>
                      <td>
                        <button
                          className={styles.viewBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            openDetail(client);
                          }}
                          title="Ver detalhes"
                        >
                          <Eye size={16} />
                        </button>
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
        title="Detalhes do Cliente"
      >
        {detailLoading ? (
          <div className={styles.modalLoading}>
            <Spinner size="md" />
          </div>
        ) : selectedClient ? (
          <div className={styles.detail}>
            <div className={styles.detailSection}>
              <h4 className={styles.detailSectionTitle}>Informacoes Pessoais</h4>
              <div className={styles.detailGrid}>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Nome</span>
                  <span className={styles.detailValue}>
                    {selectedClient.name || selectedClient.user?.name || '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <Mail size={14} /> E-mail
                  </span>
                  <span className={styles.detailValue}>
                    {selectedClient.email || selectedClient.user?.email || '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <CreditCard size={14} /> CPF
                  </span>
                  <span className={styles.detailValue}>
                    {selectedClient.cpf ? formatCPF(selectedClient.cpf) : '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <Phone size={14} /> Telefone
                  </span>
                  <span className={styles.detailValue}>
                    {selectedClient.phone ? formatPhone(selectedClient.phone) : '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>
                    <Calendar size={14} /> Cadastro
                  </span>
                  <span className={styles.detailValue}>
                    {selectedClient.createdAt ? formatDate(selectedClient.createdAt) : '--'}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.detailSectionTitle}>Assinatura</h4>
              <div className={styles.detailGrid}>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Plano</span>
                  <span className={styles.detailValue}>
                    {selectedClient.planName || selectedClient.plan?.name || '--'}
                  </span>
                </div>
                <div className={styles.detailField}>
                  <span className={styles.detailLabel}>Codigo do Cartao</span>
                  <span className={styles.detailValue}>
                    {selectedClient.cardCode || '--'}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h4 className={styles.detailSectionTitle}>Alterar Status</h4>
              <div className={styles.statusChange}>
                <Select
                  label=""
                  value={selectedClient.status || ''}
                  onChange={(e) =>
                    handleStatusChange(selectedClient.id, e.target.value)
                  }
                  options={STATUS_OPTIONS}
                />
                {updatingStatus && <Spinner size="sm" />}
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
