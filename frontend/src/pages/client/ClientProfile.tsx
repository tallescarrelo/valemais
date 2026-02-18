import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  User,
  Mail,
  Phone,
  FileText,
  Lock,
  Save,
  Check,
  X,
} from 'lucide-react';
import { Card, CardBody, Button, Input, Spinner } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { clientService } from '@/services/client.service';
import { formatCPF } from '@/utils/format';
import styles from './ClientProfile.module.scss';

export default function ClientProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Profile form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await clientService.getProfile();
      const data = res.data?.profile || res.data;
      setProfile(data);
      setName(data?.name || '');
      setPhone(data?.phone || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileError('');
    setProfileSuccess(false);

    try {
      await clientService.updateProfile({ name: name.trim(), phone: phone.trim() });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err: any) {
      setProfileError(err.message || 'Erro ao atualizar perfil.');
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError('As senhas nao coincidem.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setPasswordSaving(true);

    try {
      await clientService.changePassword({
        currentPassword,
        newPassword,
      });
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err: any) {
      setPasswordError(err.message || 'Erro ao alterar senha.');
    } finally {
      setPasswordSaving(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Meu Perfil</h1>
        <p className={styles.subtitle}>
          Gerencie seus dados pessoais e senha
        </p>
      </header>

      {/* Profile Form */}
      <Card>
        <CardBody>
          <h2 className={styles.sectionTitle}>Dados Pessoais</h2>

          {profileSuccess && (
            <div className={styles.successAlert}>
              <Check size={18} />
              <span>Perfil atualizado com sucesso!</span>
              <button
                className={styles.dismissBtn}
                onClick={() => setProfileSuccess(false)}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {profileError && (
            <div className={styles.errorAlert}>
              <span>{profileError}</span>
              <button
                className={styles.dismissBtn}
                onClick={() => setProfileError('')}
              >
                <X size={16} />
              </button>
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <Input
                label="Nome completo"
                icon={User}
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Telefone"
                icon={Phone}
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Input
                label="E-mail"
                icon={Mail}
                value={profile?.email || user?.email || ''}
                disabled
                hint="O e-mail nao pode ser alterado"
              />

              <Input
                label="CPF"
                icon={FileText}
                value={profile?.cpf ? formatCPF(profile.cpf) : '--'}
                disabled
                hint="O CPF nao pode ser alterado"
              />
            </div>

            <div className={styles.formActions}>
              <Button
                type="submit"
                variant="primary"
                loading={profileSaving}
                icon={Save}
              >
                Salvar Alteracoes
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Password Form */}
      <Card>
        <CardBody>
          <h2 className={styles.sectionTitle}>Alterar Senha</h2>

          {passwordSuccess && (
            <div className={styles.successAlert}>
              <Check size={18} />
              <span>Senha alterada com sucesso!</span>
              <button
                className={styles.dismissBtn}
                onClick={() => setPasswordSuccess(false)}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {passwordError && (
            <div className={styles.errorAlert}>
              <span>{passwordError}</span>
              <button
                className={styles.dismissBtn}
                onClick={() => setPasswordError('')}
              >
                <X size={16} />
              </button>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <Input
                label="Senha atual"
                type="password"
                icon={Lock}
                placeholder="Digite sua senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />

              <div /> {/* Spacer for grid alignment */}

              <Input
                label="Nova senha"
                type="password"
                icon={Lock}
                placeholder="Minimo 6 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <Input
                label="Confirmar nova senha"
                type="password"
                icon={Lock}
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={
                  confirmPassword && newPassword !== confirmPassword
                    ? 'As senhas nao coincidem'
                    : undefined
                }
                required
              />
            </div>

            <div className={styles.formActions}>
              <Button
                type="submit"
                variant="primary"
                loading={passwordSaving}
                icon={Lock}
                disabled={!currentPassword || !newPassword || !confirmPassword}
              >
                Alterar Senha
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
