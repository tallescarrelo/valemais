import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from '@/components/layout/PublicLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Public pages
import Home from '@/pages/public/Home';
import Login from '@/pages/public/Login';
import Register from '@/pages/public/Register';
import ForgotPassword from '@/pages/public/ForgotPassword';
import ResetPassword from '@/pages/public/ResetPassword';
import PartnerRegister from '@/pages/public/PartnerRegister';
import Terms from '@/pages/public/Terms';
import Privacy from '@/pages/public/Privacy';
import ValidateDiscount from '@/pages/public/ValidateDiscount';
import ComponentShowcase from '@/pages/public/ComponentShowcase';
import Segments from '@/pages/public/Segments';

// Client pages
import ClientHome from '@/pages/client/ClientHome';
import ClientCard from '@/pages/client/ClientCard';
import ClientSubscription from '@/pages/client/ClientSubscription';
import ClientPayments from '@/pages/client/ClientPayments';
import ClientValidateDiscount from '@/pages/client/ClientValidateDiscount';
import ClientValidations from '@/pages/client/ClientValidations';
import ClientProfile from '@/pages/client/ClientProfile';

// Partner pages
import PartnerHome from '@/pages/partner/PartnerHome';
import PartnerQrCode from '@/pages/partner/PartnerQrCode';
import PartnerValidations from '@/pages/partner/PartnerValidations';
import PartnerProfile from '@/pages/partner/PartnerProfile';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminPlans from '@/pages/admin/AdminPlans';
import AdminClients from '@/pages/admin/AdminClients';
import AdminPartners from '@/pages/admin/AdminPartners';
import AdminValidations from '@/pages/admin/AdminValidations';
import AdminPayments from '@/pages/admin/AdminPayments';
import AdminReports from '@/pages/admin/AdminReports';
import AdminSettings from '@/pages/admin/AdminSettings';

// Shared
import ProtectedRoute from '@/components/shared/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ========== PUBLIC (Header + Footer) ========== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        <Route path="/parceiro/cadastro" element={<PartnerRegister />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/parceiros" element={<Segments />} />
      </Route>

      {/* Validacao de desconto (rota especial via QR Code) */}
      <Route path="/validar/:partnerCode" element={<ValidateDiscount />} />

      {/* ========== CLIENTE (Sidebar + TopBar) ========== */}
      <Route element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <DashboardLayout role="client" />
        </ProtectedRoute>
      }>
        <Route path="/cliente" element={<ClientHome />} />
        <Route path="/cliente/cartao" element={<ClientCard />} />
        <Route path="/cliente/plano" element={<ClientSubscription />} />
        <Route path="/cliente/pagamentos" element={<ClientPayments />} />
        <Route path="/cliente/validar" element={<ClientValidateDiscount />} />
        <Route path="/cliente/historico" element={<ClientValidations />} />
        <Route path="/cliente/dados" element={<ClientProfile />} />
      </Route>

      {/* ========== PARCEIRO (Sidebar + TopBar) ========== */}
      <Route element={
        <ProtectedRoute allowedRoles={['PARTNER']}>
          <DashboardLayout role="partner" />
        </ProtectedRoute>
      }>
        <Route path="/parceiro" element={<PartnerHome />} />
        <Route path="/parceiro/qrcode" element={<PartnerQrCode />} />
        <Route path="/parceiro/validacoes" element={<PartnerValidations />} />
        <Route path="/parceiro/dados" element={<PartnerProfile />} />
      </Route>

      {/* ========== ADMIN (Sidebar + TopBar) ========== */}
      <Route element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <DashboardLayout role="admin" />
        </ProtectedRoute>
      }>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/planos" element={<AdminPlans />} />
        <Route path="/admin/clientes" element={<AdminClients />} />
        <Route path="/admin/parceiros" element={<AdminPartners />} />
        <Route path="/admin/validacoes" element={<AdminValidations />} />
        <Route path="/admin/financeiro" element={<AdminPayments />} />
        <Route path="/admin/relatorios" element={<AdminReports />} />
        <Route path="/admin/configuracoes" element={<AdminSettings />} />
      </Route>

      {/* ========== DESIGN SYSTEM (sem layout) ========== */}
      <Route path="/design-system" element={<ComponentShowcase />} />
    </Routes>
  );
}
