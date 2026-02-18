import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Login.module.scss';

function getDashboardPath(role: string): string {
  switch (role) {
    case 'PARTNER':
      return '/parceiro';
    case 'ADMIN':
      return '/admin';
    default:
      return '/cliente';
  }
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pega o redirect de onde o usuario veio (ex: /validar/PSABORCASEIRO2026)
  const redirectTo = (location.state as any)?.from?.pathname || null;

  // Se ja estiver autenticado, redireciona
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(redirectTo || getDashboardPath(user.role), { replace: true });
    }
  }, [isAuthenticated, user, navigate, redirectTo]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
      // Apos login, o useEffect acima cuida do redirect
    } catch (err: unknown) {
      const apiError = err as { error?: { message?: string } };
      setError(
        apiError?.error?.message || 'Erro ao fazer login. Tente novamente.'
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
          <h1 className={styles.title}>Entrar na sua conta</h1>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {error && (
            <div className={styles.errorAlert} role="alert">
              {error}
            </div>
          )}

          <Input
            label="E-mail"
            type="email"
            icon={Mail}
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <Input
            label="Senha"
            type="password"
            icon={Lock}
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <div className={styles.forgotRow}>
            <Link to="/esqueci-senha" className={styles.forgotLink}>
              Esqueci minha senha
            </Link>
          </div>

          <div className={styles.submitRow}>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              iconRight={ArrowRight}
            >
              Entrar
            </Button>
          </div>
        </form>

        {/* Footer links */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Nao tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
          <p className={styles.footerText}>
            Quer ser parceiro?{' '}
            <Link to="/parceiro/cadastro">Cadastre seu estabelecimento</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
