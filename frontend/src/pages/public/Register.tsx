import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, Phone, FileText, ArrowRight } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Register.module.scss';

// ===================== MASKS =====================

function maskCpf(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

// ===================== COMPONENT =====================

export default function Register() {
  const navigate = useNavigate();
  const { register, user, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Se ja autenticado, redireciona
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/cliente', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = 'Nome e obrigatorio';
    if (onlyDigits(cpf).length !== 11) errors.cpf = 'CPF deve ter 11 digitos';
    if (onlyDigits(phone).length < 10)
      errors.phone = 'Telefone deve ter pelo menos 10 digitos';
    if (password.length < 6)
      errors.password = 'Senha deve ter no minimo 6 caracteres';
    if (password !== confirmPassword)
      errors.confirmPassword = 'As senhas nao coincidem';
    if (!acceptTerms) errors.terms = 'Voce precisa aceitar os termos';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (!validate()) return;

    setLoading(true);

    try {
      await register({
        name: name.trim(),
        cpf: onlyDigits(cpf),
        phone: onlyDigits(phone),
        password,
        acceptTerms: true,
      });
      // Apos registro, o useEffect cuida do redirect para /cliente
    } catch (err: unknown) {
      const apiError = err as {
        error?: {
          message?: string;
          details?: Array<{ field: string; message: string }>;
        };
      };

      if (apiError?.error?.details) {
        const mapped: Record<string, string> = {};
        for (const detail of apiError.error.details) {
          mapped[detail.field] = detail.message;
        }
        setFieldErrors(mapped);
      }

      setError(
        apiError?.error?.message || 'Erro ao criar conta. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Vale+ Vantagens" className={styles.logoImg} />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Criar sua conta</h1>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {error && (
            <div className={styles.errorAlert} role="alert">
              {error}
            </div>
          )}

          <Input
            label="Nome completo"
            type="text"
            icon={User}
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={fieldErrors.name}
            autoComplete="name"
            required
          />

          <div className={styles.row}>
            <Input
              label="CPF"
              type="text"
              icon={FileText}
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              error={fieldErrors.cpf}
              inputMode="numeric"
              autoComplete="off"
              required
            />

            <Input
              label="Telefone"
              type="tel"
              icon={Phone}
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              error={fieldErrors.phone}
              autoComplete="tel"
              required
            />
          </div>

          <Input
            label="Senha"
            type="password"
            icon={Lock}
            placeholder="Minimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            autoComplete="new-password"
            required
          />

          <Input
            label="Confirmar senha"
            type="password"
            icon={Lock}
            placeholder="Repita a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={fieldErrors.confirmPassword}
            autoComplete="new-password"
            required
          />

          {/* Terms */}
          <div className={styles.termsRow}>
            <input
              type="checkbox"
              id="accept-terms"
              className={styles.checkbox}
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label htmlFor="accept-terms" className={styles.termsLabel}>
              Li e aceito os{' '}
              <Link to="/termos">termos de uso e politica de privacidade</Link>
            </label>
          </div>
          {fieldErrors.terms && (
            <p className={styles.termsError}>{fieldErrors.terms}</p>
          )}

          <div className={styles.submitRow}>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              iconRight={ArrowRight}
            >
              Criar conta
            </Button>
          </div>
        </form>

        {/* Footer link */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Ja tem conta? <Link to="/login">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
