import { useState, useEffect } from 'react';
import {
  BarChart3, TrendingUp, Users, Building2, CreditCard,
  DollarSign, Download, Calendar
} from 'lucide-react';
import { adminService } from '@/services/admin.service';
import { formatCurrency } from '@/utils/format';
import { Card, CardBody, Button, Spinner } from '@/components/ui';
import styles from './AdminReports.module.scss';

export default function AdminReports() {
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
    return <div className={styles.loading}><Spinner size="lg" /></div>;
  }

  const metrics = [
    { label: 'Total de Clientes', value: data?.totalClients || 0, icon: Users, color: 'primary' },
    { label: 'Clientes Ativos', value: data?.activeClients || 0, icon: TrendingUp, color: 'accent' },
    { label: 'Total de Parceiros', value: data?.totalPartners || 0, icon: Building2, color: 'info' },
    { label: 'Parceiros Ativos', value: data?.activePartners || 0, icon: Building2, color: 'accent' },
    { label: 'Total de Validacoes', value: data?.totalValidations || 0, icon: CreditCard, color: 'primary' },
    { label: 'Validacoes no Mes', value: data?.monthlyValidations || 0, icon: BarChart3, color: 'info' },
    { label: 'Receita Total', value: formatCurrency(data?.totalRevenue || 0), icon: DollarSign, color: 'accent' },
    { label: 'Receita Mensal', value: formatCurrency(data?.monthlyRevenue || 0), icon: DollarSign, color: 'primary' },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Relatorios</h1>
          <p className={styles.subtitle}>Visao consolidada da plataforma</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" size="sm">
            <Calendar size={16} />
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </Button>
        </div>
      </header>

      <div className={styles.metricsGrid}>
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className={styles.metricCard}>
              <CardBody>
                <div className={styles.metricHeader}>
                  <div className={`${styles.metricIcon} ${styles[m.color]}`}>
                    <Icon size={20} />
                  </div>
                </div>
                <div className={styles.metricValue}>{m.value}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardBody>
          <div className={styles.exportSection}>
            <div>
              <h3 className={styles.exportTitle}>Exportar Dados</h3>
              <p className={styles.exportDesc}>Exporte os dados da plataforma em formato CSV para analise externa.</p>
            </div>
            <div className={styles.exportButtons}>
              <Button variant="outline" size="sm">
                <Download size={16} />
                Clientes (.csv)
              </Button>
              <Button variant="outline" size="sm">
                <Download size={16} />
                Parceiros (.csv)
              </Button>
              <Button variant="outline" size="sm">
                <Download size={16} />
                Validacoes (.csv)
              </Button>
              <Button variant="outline" size="sm">
                <Download size={16} />
                Pagamentos (.csv)
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
