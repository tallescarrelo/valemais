import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QrCode, CheckCircle, XCircle, LogIn, Store, MapPin, Clock, ShieldCheck, RotateCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { Card, CardBody, Button, Badge, Spinner } from '@/components/ui';
import styles from './ValidateDiscount.module.scss';

function BrandMark() {
  return (
    <div className={styles.brand}>
      <img src="/logo.svg" alt="Vale+ Vantagens" className={styles.brandImg} />
    </div>
  );
}

export default function ValidateDiscount() {
  const { partnerCode } = useParams<{ partnerCode: string }>();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [resultData, setResultData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && isAuthenticated && partnerCode) {
      loadPartner();
    } else if (!authLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [authLoading, isAuthenticated, partnerCode]);

  async function loadPartner() {
    try {
      const res = await api.get<any>(`/validations/partner/${partnerCode}`);
      setPartner(res.data?.partner || res.data);
    } catch (err: any) {
      setError(err.message || 'Parceiro nao encontrado');
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckin() {
    if (!partnerCode) return;
    setValidating(true);
    try {
      const res = await api.post<any>('/validations/validate', { partnerCode });
      setResult('success');
      setResultData(res.data?.validation || res.data);
    } catch (err: any) {
      setResult('error');
      setError(err.message || 'Erro ao validar desconto');
    } finally {
      setValidating(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.page}>
        <BrandMark />
        <Card className={styles.card}>
          <CardBody>
            <div className={styles.center}>
              <div className={styles.iconBox}>
                <LogIn size={48} />
              </div>
              <h1 className={styles.title}>Check-in no Parceiro</h1>
              <p className={styles.description}>
                Faca login com sua conta Vale+ para validar seu desconto neste estabelecimento.
              </p>
              <Button
                variant="primary"
                size="lg"
                icon={LogIn}
                fullWidth
                onClick={() => navigate('/login', { state: { from: { pathname: `/validar/${partnerCode}` } } })}
              >
                Entrar na minha conta
              </Button>
              <p className={styles.hint}>
                Ainda nao tem conta? <a href="/cadastro">Cadastre-se agora</a>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Not a CLIENT
  if (user?.role !== 'CLIENT') {
    return (
      <div className={styles.page}>
        <BrandMark />
        <Card className={styles.card}>
          <CardBody>
            <div className={styles.center}>
              <div className={styles.iconBoxError}>
                <XCircle size={48} />
              </div>
              <h1 className={styles.title}>Acesso Restrito</h1>
              <p className={styles.description}>
                Apenas clientes Vale+ com plano ativo podem fazer check-in.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Error loading partner
  if (error && !result) {
    return (
      <div className={styles.page}>
        <BrandMark />
        <Card className={styles.card}>
          <CardBody>
            <div className={styles.center}>
              <div className={styles.iconBoxError}>
                <XCircle size={48} />
              </div>
              <h1 className={styles.title}>Parceiro nao encontrado</h1>
              <p className={styles.description}>{error}</p>
              <Button variant="outline" onClick={() => navigate('/')}>
                Voltar ao inicio
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // ============ CHECK-IN SUCCESS - TICKET ============
  if (result === 'success') {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
      <div className={styles.page}>
        <div className={styles.successTicket}>
          <div className={styles.ticketHeader}>
            <div className={styles.ticketBadge}>
              <CheckCircle size={22} />
              <span>CHECK-IN APROVADO</span>
            </div>
            <div className={styles.ticketLogo}>
              <img src="/logo-white.svg" alt="Vale+" className={styles.ticketLogoImg} />
            </div>
          </div>

          <div className={styles.ticketClient}>
            <div className={styles.ticketAvatar}>
              {user?.name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div className={styles.ticketClientInfo}>
              <strong>{user?.name}</strong>
              <span>{user?.cardCode || 'Membro Vale+'}</span>
            </div>
            <Badge variant="accent" size="md">ATIVO</Badge>
          </div>

          <div className={styles.ticketDivider}>
            <div className={styles.ticketNotchLeft} />
            <div className={styles.ticketDash} />
            <div className={styles.ticketNotchRight} />
          </div>

          <div className={styles.ticketBody}>
            <div className={styles.ticketPartner}>
              <Store size={20} />
              <div>
                <strong>{partner?.name || partner?.tradeName}</strong>
                {partner?.category && <span>{partner.category}</span>}
              </div>
            </div>

            <div className={styles.ticketDiscount}>
              <span className={styles.ticketDiscountValue}>
                {partner?.discountPercent || partner?.discount || partner?.discountValue}% OFF
              </span>
              <span className={styles.ticketDiscountDesc}>
                {partner?.discountDescription || 'Desconto exclusivo Vale+'}
              </span>
            </div>

            <div className={styles.ticketDetails}>
              <div className={styles.ticketDetailRow}>
                <Clock size={14} />
                <span>{timeStr} - {dateStr}</span>
              </div>
              {resultData?.code && (
                <div className={styles.ticketDetailRow}>
                  <ShieldCheck size={14} />
                  <span>Codigo: <strong>{resultData.code}</strong></span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.ticketFooter}>
            <p>Apresente esta tela ao estabelecimento</p>
          </div>

          <div className={styles.ticketActions}>
            <Button variant="outline" size="sm" onClick={() => navigate('/cliente/historico')}>
              Ver meu historico
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/cliente')}>
              Ir ao Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ============ CHECK-IN ERROR ============
  if (result === 'error') {
    return (
      <div className={styles.page}>
        <BrandMark />
        <Card className={styles.card}>
          <CardBody>
            <div className={styles.center}>
              <div className={styles.iconBoxError}>
                <XCircle size={56} />
              </div>
              <h1 className={styles.titleError}>Check-in Negado</h1>
              <p className={styles.description}>{error}</p>
              <div className={styles.errorActions}>
                <Button variant="outline" icon={RotateCcw} onClick={() => { setResult(null); setError(''); }}>
                  Tentar Novamente
                </Button>
                <Button variant="ghost" onClick={() => navigate('/cliente')}>
                  Ir ao Dashboard
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // ============ PARTNER LOADED - CHECK-IN SCREEN ============
  return (
    <div className={styles.page}>
      <BrandMark />
      <Card className={styles.card}>
        <CardBody>
          <div className={styles.center}>
            <div className={styles.iconBox}>
              <QrCode size={40} />
            </div>
            <h1 className={styles.title}>Check-in</h1>
            <p className={styles.description}>
              Confirme seu check-in para obter o desconto neste estabelecimento.
            </p>

            <div className={styles.partnerInfo}>
              <div className={styles.partnerIcon}>
                <Store size={24} />
              </div>
              <h2 className={styles.partnerName}>{partner?.name || partner?.tradeName}</h2>
              {partner?.category && <Badge variant="accent">{partner.category}</Badge>}
              <div className={styles.discountHighlight}>
                {partner?.discountPercent || partner?.discount || partner?.discountValue}% OFF
              </div>
              <p className={styles.discountDesc}>
                {partner?.discountDescription}
              </p>
              {partner?.address && (
                <p className={styles.address}>
                  <MapPin size={14} />
                  {partner.address.street}, {partner.address.number} - {partner.address.neighborhood}
                </p>
              )}
            </div>

            <div className={styles.userPreview}>
              <div className={styles.userPreviewAvatar}>
                {user?.name?.charAt(0)?.toUpperCase() || 'C'}
              </div>
              <div className={styles.userPreviewInfo}>
                <strong>{user?.name}</strong>
                <span>Membro Vale+</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={CheckCircle}
              fullWidth
              onClick={handleCheckin}
              loading={validating}
            >
              Fazer Check-in
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
