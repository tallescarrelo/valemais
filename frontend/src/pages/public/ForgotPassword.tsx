import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { authService } from '@/services/auth.service';
import styles from './ForgotPassword.module.scss';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar email. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Esqueceu sua senha?</h1>
          <p className={styles.description}>
            Digite seu email e enviaremos um link para redefinir sua senha.
          </p>
        </div>

        {success ? (
          <div className={styles.success}>
            <CheckCircle size={20} />
            <span>Email enviado! Verifique sua caixa de entrada.</span>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}

            <Input
              label="Email"
              type="email"
              icon={Mail}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" fullWidth loading={loading}>
              Enviar link
            </Button>
          </form>
        )}

        <div className={styles.footer}>
          <Link to="/login" className={styles.backLink}>
            <ArrowLeft size={16} />
            Voltar para login
          </Link>
        </div>
      </div>
    </div>
  );
}
