import { useState } from 'react';
import { Settings, Save, Shield, Bell, Globe, Palette } from 'lucide-react';
import { Card, CardBody, Input, Button } from '@/components/ui';
import styles from './AdminSettings.module.scss';

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [settings, setSettings] = useState({
    siteName: 'VALE+ Vantagens',
    siteEmail: 'contato@valemaisvantagens.com.br',
    supportPhone: '(11) 99999-9999',
    maxValidationsPerDay: '5',
    autoApprovePartners: false,
    emailNotifications: true,
    maintenanceMode: false,
  });

  function handleChange(field: string, value: string | boolean) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    // Simulated save - would call adminService.updateSettings()
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Configuracoes</h1>
        <p className={styles.subtitle}>Configuracoes gerais da plataforma</p>
      </header>

      {success && (
        <div className={styles.alert}>Configuracoes salvas com sucesso!</div>
      )}

      <Card>
        <CardBody>
          <div className={styles.sectionHeader}>
            <Globe size={20} />
            <h2>Informacoes Gerais</h2>
          </div>
          <div className={styles.formGrid}>
            <Input
              label="Nome da Plataforma"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
            />
            <Input
              label="E-mail de Contato"
              type="email"
              value={settings.siteEmail}
              onChange={(e) => handleChange('siteEmail', e.target.value)}
            />
            <Input
              label="Telefone de Suporte"
              value={settings.supportPhone}
              onChange={(e) => handleChange('supportPhone', e.target.value)}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className={styles.sectionHeader}>
            <Shield size={20} />
            <h2>Regras de Negocio</h2>
          </div>
          <div className={styles.formGrid}>
            <Input
              label="Max. Validacoes por Dia (por cliente)"
              type="number"
              value={settings.maxValidationsPerDay}
              onChange={(e) => handleChange('maxValidationsPerDay', e.target.value)}
            />
          </div>
          <div className={styles.toggleList}>
            <label className={styles.toggleItem}>
              <input
                type="checkbox"
                checked={settings.autoApprovePartners}
                onChange={(e) => handleChange('autoApprovePartners', e.target.checked)}
              />
              <div>
                <strong>Aprovar parceiros automaticamente</strong>
                <p>Novos parceiros serao aprovados sem revisao manual</p>
              </div>
            </label>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className={styles.sectionHeader}>
            <Bell size={20} />
            <h2>Notificacoes</h2>
          </div>
          <div className={styles.toggleList}>
            <label className={styles.toggleItem}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              />
              <div>
                <strong>Notificacoes por e-mail</strong>
                <p>Receber alertas sobre novos cadastros e solicitacoes</p>
              </div>
            </label>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className={styles.sectionHeader}>
            <Palette size={20} />
            <h2>Manutencao</h2>
          </div>
          <div className={styles.toggleList}>
            <label className={styles.toggleItem}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
              />
              <div>
                <strong>Modo de Manutencao</strong>
                <p>Desativa o acesso publico a plataforma temporariamente</p>
              </div>
            </label>
          </div>
        </CardBody>
      </Card>

      <div className={styles.saveBar}>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Salvando...' : <><Save size={18} /> Salvar Configuracoes</>}
        </Button>
      </div>
    </div>
  );
}
