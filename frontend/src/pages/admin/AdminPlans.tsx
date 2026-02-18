import { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Package,
  X,
} from 'lucide-react';
import {
  Card,
  CardBody,
  Button,
  Input,
  Badge,
  Spinner,
  EmptyState,
  Modal,
} from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { formatCurrency } from '@/utils/format';
import styles from './AdminPlans.module.scss';

interface PlanForm {
  name: string;
  description: string;
  priceReais: string;
  features: string;
}

const emptyForm: PlanForm = {
  name: '',
  description: '',
  priceReais: '',
  features: '',
};

export default function AdminPlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [form, setForm] = useState<PlanForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  async function loadPlans() {
    try {
      const res = await adminService.listPlans();
      setPlans(res.data?.plans || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function openCreateModal() {
    setEditingPlan(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditModal(plan: any) {
    setEditingPlan(plan);
    const features = Array.isArray(plan.features)
      ? plan.features.join('\n')
      : plan.features || '';
    setForm({
      name: plan.name || '',
      description: plan.description || '',
      priceReais: plan.price ? (plan.price / 100).toFixed(2).replace('.', ',') : '',
      features,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingPlan(null);
    setForm(emptyForm);
  }

  function handleChange(field: keyof PlanForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const priceStr = form.priceReais.replace(',', '.');
      const priceCents = Math.round(parseFloat(priceStr) * 100);

      const featuresArr = form.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        name: form.name,
        description: form.description,
        price: priceCents,
        features: featuresArr,
      };

      if (editingPlan) {
        await adminService.updatePlan(editingPlan.id, payload);
      } else {
        await adminService.createPlan(payload);
      }

      closeModal();
      await loadPlans();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggle(plan: any) {
    setToggling(plan.id);
    try {
      await adminService.togglePlan(plan.id);
      await loadPlans();
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(null);
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
        <div>
          <h1 className={styles.title}>Planos</h1>
          <p className={styles.subtitle}>Gerencie os planos de assinatura</p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus size={18} />
          Novo Plano
        </Button>
      </header>

      {plans.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum plano cadastrado"
          description="Crie o primeiro plano para que os clientes possam assinar."
        />
      ) : (
        <div className={styles.plansGrid}>
          {plans.map((plan) => (
            <Card key={plan.id} className={styles.planCard}>
              <CardBody>
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <Badge
                    variant={plan.active !== false ? 'success' : 'neutral'}
                    size="sm"
                  >
                    {plan.active !== false ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                {plan.description && (
                  <p className={styles.planDescription}>{plan.description}</p>
                )}

                <div className={styles.planPrice}>
                  {formatCurrency(plan.price ?? 0)}
                  <span className={styles.planPeriod}>/mes</span>
                </div>

                {Array.isArray(plan.features) && plan.features.length > 0 && (
                  <div className={styles.planFeatures}>
                    <span className={styles.featuresLabel}>
                      {plan.features.length} recurso{plan.features.length !== 1 ? 's' : ''}
                    </span>
                    <ul className={styles.featuresList}>
                      {plan.features.map((f: string, idx: number) => (
                        <li key={idx} className={styles.featureItem}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.planActions}>
                  <button
                    className={styles.actionBtn}
                    onClick={() => openEditModal(plan)}
                    title="Editar"
                  >
                    <Pencil size={16} />
                    Editar
                  </button>
                  <button
                    className={`${styles.actionBtn} ${
                      plan.active !== false ? styles.actionBtnWarning : styles.actionBtnSuccess
                    }`}
                    onClick={() => handleToggle(plan)}
                    disabled={toggling === plan.id}
                    title={plan.active !== false ? 'Desativar' : 'Ativar'}
                  >
                    {plan.active !== false ? (
                      <ToggleRight size={16} />
                    ) : (
                      <ToggleLeft size={16} />
                    )}
                    {toggling === plan.id
                      ? 'Aguarde...'
                      : plan.active !== false
                        ? 'Desativar'
                        : 'Ativar'}
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingPlan ? 'Editar Plano' : 'Novo Plano'}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Nome do plano"
            placeholder="Ex: Plano Basico"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />

          <Input
            label="Descricao"
            placeholder="Descricao breve do plano"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />

          <Input
            label="Preco (R$)"
            placeholder="Ex: 29,90"
            value={form.priceReais}
            onChange={(e) => handleChange('priceReais', e.target.value)}
            required
          />

          <div className={styles.formField}>
            <label className={styles.formLabel}>Recursos (um por linha)</label>
            <textarea
              className={styles.textarea}
              rows={5}
              placeholder={"Desconto em restaurantes\nDesconto em farmacias\nAcesso ao app"}
              value={form.features}
              onChange={(e) => handleChange('features', e.target.value)}
            />
          </div>

          <div className={styles.formActions}>
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting
                ? 'Salvando...'
                : editingPlan
                  ? 'Salvar Alteracoes'
                  : 'Criar Plano'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
