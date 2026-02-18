import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  Store,
  Mail,
  Phone,
  FileText,
  MapPin,
  Tag,
  Save,
  Check,
  X,
} from 'lucide-react';
import { Card, CardBody, Button, Input, Spinner } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { partnerService } from '@/services/partner.service';
import { formatPhone } from '@/utils/format';
import styles from './PartnerProfile.module.scss';

export default function PartnerProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Establishment form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Address form state
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Discount form state
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [discountDescription, setDiscountDescription] = useState('');

  // Save state
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await partnerService.getProfile();
      const data = res.data?.partner || res.data?.profile || res.data;
      setProfile(data);

      // Establishment
      setName(data?.name || '');
      setCategory(data?.category || '');
      setPhone(data?.phone || '');
      setEmail(data?.email || '');

      // Address
      const addr = data?.address || data;
      setStreet(addr?.street || '');
      setNumber(addr?.number || '');
      setComplement(addr?.complement || '');
      setNeighborhood(addr?.neighborhood || '');
      setCity(addr?.city || '');
      setState(addr?.state || '');
      setZipCode(addr?.zipCode || '');

      // Discount
      setDiscountPercentage(
        data?.discountPercentage?.toString() || data?.discount?.toString() || ''
      );
      setDiscountDescription(data?.discountDescription || data?.description || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await partnerService.updateProfile({
        name: name.trim(),
        category: category.trim(),
        phone: phone.trim(),
        address: {
          street: street.trim(),
          number: number.trim(),
          complement: complement.trim(),
          neighborhood: neighborhood.trim(),
          city: city.trim(),
          state: state.trim(),
          zipCode: zipCode.trim(),
        },
        discountPercentage: discountPercentage ? Number(discountPercentage) : undefined,
        discountDescription: discountDescription.trim(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil do estabelecimento.');
    } finally {
      setSaving(false);
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
        <h1 className={styles.title}>Perfil do Estabelecimento</h1>
        <p className={styles.subtitle}>
          Gerencie os dados do seu estabelecimento parceiro
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        {/* Alerts */}
        {success && (
          <div className={styles.successAlert}>
            <Check size={18} />
            <span>Perfil atualizado com sucesso!</span>
            <button
              type="button"
              className={styles.dismissBtn}
              onClick={() => setSuccess(false)}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {error && (
          <div className={styles.errorAlert}>
            <span>{error}</span>
            <button
              type="button"
              className={styles.dismissBtn}
              onClick={() => setError('')}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Establishment Info */}
        <Card className={styles.section}>
          <CardBody>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionIcon}>
                <Store size={20} />
              </div>
              <h2 className={styles.sectionTitle}>Dados do Estabelecimento</h2>
            </div>

            <div className={styles.formGrid}>
              <Input
                label="Nome do estabelecimento"
                icon={Store}
                placeholder="Nome fantasia"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Categoria"
                icon={Tag}
                placeholder="Ex: Restaurante, Farmacia..."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <Input
                label="CNPJ"
                icon={FileText}
                value={profile?.cnpj || '--'}
                disabled
                hint="O CNPJ nao pode ser alterado"
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
                value={email || profile?.email || user?.email || ''}
                disabled
                hint="O e-mail nao pode ser alterado"
              />
            </div>
          </CardBody>
        </Card>

        {/* Address */}
        <Card className={styles.section}>
          <CardBody>
            <div className={styles.sectionHeaderRow}>
              <div className={styles.sectionIcon}>
                <MapPin size={20} />
              </div>
              <h2 className={styles.sectionTitle}>Endereco</h2>
            </div>

            <div className={styles.formGrid}>
              <Input
                label="CEP"
                icon={MapPin}
                placeholder="00000-000"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />

              <div className={styles.formRow}>
                <Input
                  label="Rua"
                  placeholder="Nome da rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={styles.streetInput}
                />

                <Input
                  label="Numero"
                  placeholder="N"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className={styles.numberInput}
                />
              </div>

              <Input
                label="Complemento"
                placeholder="Sala, andar, bloco..."
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />

              <Input
                label="Bairro"
                placeholder="Nome do bairro"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />

              <Input
                label="Cidade"
                placeholder="Nome da cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <Input
                label="Estado"
                placeholder="UF"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </CardBody>
        </Card>

        {/* Discount Info */}
        <Card className={styles.section}>
          <CardBody>
            <div className={styles.sectionHeaderRow}>
              <div className={`${styles.sectionIcon} ${styles.sectionIconAccent}`}>
                <Tag size={20} />
              </div>
              <h2 className={styles.sectionTitle}>Informacoes de Desconto</h2>
            </div>

            <div className={styles.formGrid}>
              <Input
                label="Percentual de desconto (%)"
                icon={Tag}
                type="number"
                placeholder="Ex: 10"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                min={0}
                max={100}
              />

              <Input
                label="Descricao do desconto"
                placeholder="Ex: 10% em todos os produtos"
                value={discountDescription}
                onChange={(e) => setDiscountDescription(e.target.value)}
              />
            </div>
          </CardBody>
        </Card>

        {/* Submit */}
        <div className={styles.formActions}>
          <Button
            type="submit"
            variant="primary"
            loading={saving}
            icon={Save}
          >
            Salvar Alteracoes
          </Button>
        </div>
      </form>
    </div>
  );
}
