import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
  role: 'client' | 'partner' | 'admin';
}

const pageTitles: Record<string, string> = {
  // Client
  '/cliente': 'Inicio',
  '/cliente/cartao': 'Meu Cartao',
  '/cliente/plano': 'Meu Plano',
  '/cliente/pagamentos': 'Pagamentos',
  '/cliente/validar': 'Validar Desconto',
  '/cliente/historico': 'Historico de Validacoes',
  '/cliente/dados': 'Meus Dados',
  // Partner
  '/parceiro': 'Inicio',
  '/parceiro/qrcode': 'Meu QR Code',
  '/parceiro/validacoes': 'Validacoes',
  '/parceiro/dados': 'Dados do Estabelecimento',
  // Admin
  '/admin': 'Dashboard',
  '/admin/planos': 'Gestao de Planos',
  '/admin/clientes': 'Gestao de Clientes',
  '/admin/parceiros': 'Gestao de Parceiros',
  '/admin/validacoes': 'Validacoes',
  '/admin/financeiro': 'Financeiro',
  '/admin/relatorios': 'Relatorios',
  '/admin/configuracoes': 'Configuracoes',
};

export default function DashboardLayout({ role }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const pageTitle = pageTitles[location.pathname] || 'Dashboard';
  const userName = user?.name || 'Usuario';

  return (
    <div className={styles.layout}>
      <Sidebar
        role={role}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        onClose={() => setMobileOpen(false)}
        mobileOpen={mobileOpen}
        onLogout={logout}
      />

      <div
        className={[
          styles.content,
          collapsed ? styles.collapsed : '',
        ].filter(Boolean).join(' ')}
      >
        <TopBar
          title={pageTitle}
          userName={userName}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
