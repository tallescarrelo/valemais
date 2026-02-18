import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard, CreditCard, Receipt, QrCode, History,
  UserCircle, Store, Settings, Users, Building2,
  BarChart3, DollarSign, ShieldCheck, ChevronLeft, LogOut, X
} from 'lucide-react';
import styles from './Sidebar.module.scss';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarProps {
  role: 'client' | 'partner' | 'admin';
  collapsed: boolean;
  onToggle: () => void;
  onClose: () => void;
  mobileOpen: boolean;
  onLogout: () => void;
}

const clientNav: NavItem[] = [
  { label: 'Inicio', path: '/cliente', icon: LayoutDashboard },
  { label: 'Meu Cartao', path: '/cliente/cartao', icon: CreditCard },
  { label: 'Meu Plano', path: '/cliente/plano', icon: ShieldCheck },
  { label: 'Pagamentos', path: '/cliente/pagamentos', icon: Receipt },
  { label: 'Validar Desconto', path: '/cliente/validar', icon: QrCode },
  { label: 'Historico', path: '/cliente/historico', icon: History },
  { label: 'Meus Dados', path: '/cliente/dados', icon: UserCircle },
];

const partnerNav: NavItem[] = [
  { label: 'Inicio', path: '/parceiro', icon: LayoutDashboard },
  { label: 'Meu QR Code', path: '/parceiro/qrcode', icon: QrCode },
  { label: 'Validacoes', path: '/parceiro/validacoes', icon: History },
  { label: 'Meus Dados', path: '/parceiro/dados', icon: Store },
];

const adminNav: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Planos', path: '/admin/planos', icon: CreditCard },
  { label: 'Clientes', path: '/admin/clientes', icon: Users },
  { label: 'Parceiros', path: '/admin/parceiros', icon: Building2 },
  { label: 'Validacoes', path: '/admin/validacoes', icon: ShieldCheck },
  { label: 'Financeiro', path: '/admin/financeiro', icon: DollarSign },
  { label: 'Relatorios', path: '/admin/relatorios', icon: BarChart3 },
  { label: 'Configuracoes', path: '/admin/configuracoes', icon: Settings },
];

const navMap = {
  client: clientNav,
  partner: partnerNav,
  admin: adminNav,
};

const roleLabel = {
  client: 'Area do Cliente',
  partner: 'Area do Parceiro',
  admin: 'Administracao',
};

export default function Sidebar({ role, collapsed, onToggle, onClose, mobileOpen, onLogout }: SidebarProps) {
  const location = useLocation();
  const items = navMap[role];

  const isActive = (path: string) => {
    if (path === `/${role === 'client' ? 'cliente' : role === 'partner' ? 'parceiro' : 'admin'}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {mobileOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside
        className={[
          styles.sidebar,
          collapsed ? styles.collapsed : '',
          mobileOpen ? styles.mobileOpen : '',
        ].filter(Boolean).join(' ')}
      >
        {/* Header */}
        <div className={styles.sidebarHeader}>
          {!collapsed && (
            <div className={styles.brand}>
              <img src="/logo-white.svg" alt="Vale+" className={styles.logoImg} />
            </div>
          )}
          {collapsed && <img src="/logo-white.svg" alt="V+" className={styles.logoImgSmall} />}

          <button className={styles.mobileClose} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {!collapsed && (
          <div className={styles.roleLabel}>{roleLabel[role]}</div>
        )}

        {/* Navigation */}
        <nav className={styles.nav}>
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={[styles.navItem, active ? styles.active : '']
                  .filter(Boolean)
                  .join(' ')}
                title={collapsed ? item.label : undefined}
                onClick={onClose}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.label}</span>}
                {active && <div className={styles.activeIndicator} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <button
            className={styles.navItem}
            onClick={onLogout}
            title={collapsed ? 'Sair' : undefined}
          >
            <LogOut size={20} />
            {!collapsed && <span>Sair</span>}
          </button>

          <button
            className={`${styles.collapseBtn}`}
            onClick={onToggle}
            title={collapsed ? 'Expandir' : 'Recolher'}
          >
            <ChevronLeft
              size={18}
              style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
