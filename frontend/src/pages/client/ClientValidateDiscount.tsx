import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  QrCode,
  Search,
  CheckCircle,
  AlertCircle,
  Store,
  Tag,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { Card, CardBody, Button, Input, Badge } from '@/components/ui';
import { api } from '@/services/api';
import styles from './ClientValidateDiscount.module.scss';

type Step = 'search' | 'confirm' | 'success' | 'error';

export default function ClientValidateDiscount() {
  const [partnerCode, setPartnerCode] = useState('');
  const [partner, setPartner] = useState<any>(null);
  const [validation, setValidation] = useState<any>(null);
  const [step, setStep] = useState<Step>('search');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearchPartner(e: FormEvent) {
    e.preventDefault();
    if (!partnerCode.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await api.get<any>(`/validations/partner/${partnerCode.trim()}`);
      setPartner(res.data?.partner || res.data);
      setStep('confirm');
    } catch (err: any) {
      setError(err.message || 'Parceiro nao encontrado. Verifique o codigo.');
      setStep('error');
    } finally {
      setLoading(false);
    }
  }

  async function handleValidate() {
    setLoading(true);
    setError('');

    try {
      const res = await api.post<any>('/validations/validate', {
        partnerCode: partnerCode.trim(),
      });
      setValidation(res.data?.validation || res.data);
      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Falha ao validar desconto. Tente novamente.');
      setStep('error');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setPartnerCode('');
    setPartner(null);
    setValidation(null);
    setStep('search');
    setError('');
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Validar Desconto</h1>
        <p className={styles.subtitle}>
          Insira o codigo do parceiro para validar seu desconto
        </p>
      </header>

      {/* Step: Search */}
      {step === 'search' && (
        <Card className={styles.mainCard}>
          <CardBody>
            <div className={styles.searchSection}>
              <div className={styles.searchIcon}>
                <QrCode size={40} />
              </div>
              <h2 className={styles.searchTitle}>
                Codigo do Parceiro
              </h2>
              <p className={styles.searchDescription}>
                Digite o codigo fornecido pelo estabelecimento parceiro
              </p>

              <form onSubmit={handleSearchPartner} className={styles.searchForm}>
                <Input
                  icon={Search}
                  placeholder="Ex: VALE-ABC123"
                  value={partnerCode}
                  onChange={(e) => setPartnerCode(e.target.value)}
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  icon={Search}
                  disabled={!partnerCode.trim()}
                >
                  Buscar Parceiro
                </Button>
              </form>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Step: Confirm */}
      {step === 'confirm' && partner && (
        <Card className={styles.mainCard}>
          <CardBody>
            <div className={styles.confirmSection}>
              <div className={styles.partnerPreview}>
                <div className={styles.partnerAvatar}>
                  <Store size={28} />
                </div>
                <div className={styles.partnerInfo}>
                  <h2 className={styles.partnerName}>
                    {partner.name || partner.businessName || 'Parceiro'}
                  </h2>
                  {partner.category && (
                    <Badge variant="accent" size="sm">
                      {partner.category}
                    </Badge>
                  )}
                </div>
              </div>

              {partner.discount && (
                <div className={styles.discountPreview}>
                  <Tag size={20} />
                  <span className={styles.discountValue}>
                    {partner.discount}% de desconto
                  </span>
                </div>
              )}

              {partner.address && (
                <p className={styles.partnerAddress}>{partner.address}</p>
              )}

              <div className={styles.confirmActions}>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                >
                  Voltar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleValidate}
                  loading={loading}
                  iconRight={ArrowRight}
                >
                  Validar Desconto
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Step: Success */}
      {step === 'success' && (
        <Card className={styles.mainCard}>
          <CardBody>
            <div className={styles.resultSection}>
              <div className={styles.successIcon}>
                <CheckCircle size={48} />
              </div>
              <h2 className={styles.resultTitle}>Desconto Validado!</h2>
              <p className={styles.resultDescription}>
                Seu desconto foi validado com sucesso.
              </p>

              {validation && (
                <div className={styles.resultDetails}>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Parceiro</span>
                    <span className={styles.resultValue}>
                      {validation.partnerName || partner?.name || '--'}
                    </span>
                  </div>
                  {validation.discount && (
                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>Desconto</span>
                      <span className={`${styles.resultValue} ${styles.resultDiscount}`}>
                        {validation.discount}%
                      </span>
                    </div>
                  )}
                  {validation.code && (
                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>Codigo</span>
                      <span className={styles.resultValue}>
                        {validation.code}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className={styles.resultActions}>
                <Button
                  variant="primary"
                  onClick={handleReset}
                  icon={RotateCcw}
                >
                  Nova Validacao
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Step: Error */}
      {step === 'error' && (
        <Card className={styles.mainCard}>
          <CardBody>
            <div className={styles.resultSection}>
              <div className={styles.errorIcon}>
                <AlertCircle size={48} />
              </div>
              <h2 className={styles.resultTitle}>Erro na Validacao</h2>
              <p className={styles.resultDescription}>
                {error || 'Nao foi possivel validar o desconto.'}
              </p>

              <div className={styles.resultActions}>
                <Button
                  variant="primary"
                  onClick={handleReset}
                  icon={RotateCcw}
                >
                  Tentar Novamente
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Help Info */}
      <Card variant="flat" className={styles.helpCard}>
        <CardBody>
          <h3 className={styles.helpTitle}>Como validar um desconto?</h3>
          <ol className={styles.helpSteps}>
            <li>
              <strong>Obtenha o codigo</strong> - Peca o codigo do parceiro no
              estabelecimento
            </li>
            <li>
              <strong>Digite o codigo</strong> - Insira o codigo no campo acima
            </li>
            <li>
              <strong>Confirme o parceiro</strong> - Verifique se e o
              estabelecimento correto
            </li>
            <li>
              <strong>Valide o desconto</strong> - Apresente a confirmacao ao
              atendente
            </li>
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}
