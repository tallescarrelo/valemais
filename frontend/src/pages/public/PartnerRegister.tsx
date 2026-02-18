import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Mail,
  Phone,
  FileText,
  Lock,
  MapPin,
  Store,
  ArrowLeft,
  CheckCircle,
  User,
} from 'lucide-react';
import { Button, Input, Select } from '@/components/ui';
import { api } from '@/services/api';
import styles from './PartnerRegister.module.scss';

const CATEGORY_OPTIONS = [
  { value: 'FOOD', label: 'Alimentacao' },
  { value: 'HEALTH', label: 'Saude' },
  { value: 'BEAUTY', label: 'Beleza' },
  { value: 'SERVICES', label: 'Servicos' },
  { value: 'EDUCATION', label: 'Educacao' },
  { value: 'ENTERTAINMENT', label: 'Entretenimento' },
  { value: 'FASHION', label: 'Moda' },
  { value: 'AUTOMOTIVE', label: 'Automotivo' },
  { value: 'TECHNOLOGY', label: 'Tecnologia' },
  { value: 'OTHER', label: 'Outros' },
];

const DISCOUNT_TYPE_OPTIONS = [
  { value: 'PERCENTAGE', label: 'Desconto em %' },
  { value: 'FIXED', label: 'Desconto em valor fixo (R$)' },
];

const STEP_TITLES = [
  'Dados da empresa',
  'Endereco',
  'Informacoes do desconto',
  'Criar conta',
];

function formatCnpj(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  if (digits.length <= 12)
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export default function PartnerRegister() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Step 1 - Company data
  const [companyName, setCompanyName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2 - Address
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cepLoading, setCepLoading] = useState(false);

  // Step 3 - Discount info
  const [category, setCategory] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountDescription, setDiscountDescription] = useState('');

  // Step 4 - Account
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Field errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validateStep(currentStep: number): boolean {
    const errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!companyName.trim()) errors.companyName = 'Razao Social e obrigatoria';
      if (!tradeName.trim()) errors.tradeName = 'Nome Fantasia e obrigatorio';
      if (onlyDigits(cnpj).length !== 14) errors.cnpj = 'CNPJ deve ter 14 digitos';
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email))
        errors.email = 'Email invalido';
      if (onlyDigits(phone).length < 10) errors.phone = 'Telefone invalido';
    }

    if (currentStep === 2) {
      if (onlyDigits(zipCode).length !== 8) errors.zipCode = 'CEP deve ter 8 digitos';
      if (!street.trim()) errors.street = 'Rua e obrigatoria';
      if (!number.trim()) errors.number = 'Numero e obrigatorio';
      if (!neighborhood.trim()) errors.neighborhood = 'Bairro e obrigatorio';
      if (!city.trim()) errors.city = 'Cidade e obrigatoria';
      if (!state.trim()) errors.state = 'Estado e obrigatorio';
    }

    if (currentStep === 3) {
      if (!category) errors.category = 'Selecione uma categoria';
      if (!discountType) errors.discountType = 'Selecione o tipo de desconto';
      if (!discountValue || Number(discountValue) <= 0)
        errors.discountValue = 'Informe um valor valido';
      if (!discountDescription.trim())
        errors.discountDescription = 'Descreva o desconto oferecido';
    }

    if (currentStep === 4) {
      if (!userName.trim()) errors.userName = 'Nome e obrigatorio';
      if (password.length < 6) errors.password = 'Senha deve ter no minimo 6 caracteres';
      if (password !== confirmPassword)
        errors.confirmPassword = 'As senhas nao conferem';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) {
      setError('');
      setStep(step + 1);
    }
  }

  function handleBack() {
    setError('');
    setFieldErrors({});
    setStep(step - 1);
  }

  async function fetchAddress(cep: string) {
    const digits = onlyDigits(cep);
    if (digits.length !== 8) return;

    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setStreet(data.logradouro || '');
        setNeighborhood(data.bairro || '');
        setCity(data.localidade || '');
        setState(data.uf || '');
        setComplement(data.complemento || '');
      }
    } catch {
      // Silently fail - user can fill manually
    } finally {
      setCepLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep(4)) return;

    setLoading(true);
    setError('');

    try {
      await api.post('/partner/register', {
        companyName: companyName.trim(),
        tradeName: tradeName.trim(),
        cnpj: onlyDigits(cnpj),
        email: email.trim(),
        phone: onlyDigits(phone),
        address: {
          zipCode: onlyDigits(zipCode),
          street: street.trim(),
          number: number.trim(),
          complement: complement.trim(),
          neighborhood: neighborhood.trim(),
          city: city.trim(),
          state: state.trim(),
        },
        category,
        discountType,
        discountValue: Number(discountValue),
        discountDescription: discountDescription.trim(),
        userName: userName.trim(),
        password,
      });
      setSuccess(true);
    } catch (err: unknown) {
      const apiError = err as { message?: string };
      setError(apiError?.message || 'Erro ao enviar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successScreen}>
            <CheckCircle size={64} className={styles.successIcon} />
            <h2 className={styles.successTitle}>Cadastro recebido!</h2>
            <p className={styles.successMessage}>
              Aguarde aprovacao da equipe Vale+. Voce recebera um e-mail quando
              seu cadastro for aprovado.
            </p>
            <Link to="/">
              <Button variant="primary" icon={ArrowLeft}>
                Voltar para o inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Vale+ Vantagens" className={styles.logoImg} />
        </div>

        {/* Step Indicator */}
        <div className={styles.stepper}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={styles.stepItem}>
              <div
                className={[
                  styles.stepCircle,
                  s === step ? styles.stepActive : '',
                  s < step ? styles.stepCompleted : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {s < step ? <CheckCircle size={16} /> : s}
              </div>
              {s < 4 && (
                <div
                  className={[
                    styles.stepLine,
                    s < step ? styles.stepLineCompleted : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Title */}
        <div className={styles.header}>
          <h1 className={styles.title}>{STEP_TITLES[step - 1]}</h1>
          <p className={styles.subtitle}>Passo {step} de 4</p>
        </div>

        {/* Error */}
        {error && (
          <div className={styles.errorAlert} role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          className={styles.form}
          onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
          noValidate
        >
          {/* Step 1: Company Data */}
          {step === 1 && (
            <>
              <Input
                label="Razao Social"
                icon={Building2}
                placeholder="Razao social da empresa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={fieldErrors.companyName}
                required
              />
              <Input
                label="Nome Fantasia"
                icon={Store}
                placeholder="Nome fantasia do estabelecimento"
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                error={fieldErrors.tradeName}
                required
              />
              <Input
                label="CNPJ"
                icon={FileText}
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                error={fieldErrors.cnpj}
                required
              />
              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="contato@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
                autoComplete="email"
                required
              />
              <Input
                label="Telefone"
                icon={Phone}
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                error={fieldErrors.phone}
                required
              />
            </>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <>
              <Input
                label="CEP"
                icon={MapPin}
                placeholder="00000-000"
                value={zipCode}
                onChange={(e) =>
                  setZipCode(onlyDigits(e.target.value).slice(0, 8))
                }
                onBlur={() => fetchAddress(zipCode)}
                error={fieldErrors.zipCode}
                disabled={cepLoading}
                required
              />
              <div className={styles.gridTwo}>
                <Input
                  label="Rua"
                  placeholder="Nome da rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  error={fieldErrors.street}
                  required
                />
                <Input
                  label="Numero"
                  placeholder="N."
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  error={fieldErrors.number}
                  required
                />
              </div>
              <div className={styles.gridTwo}>
                <Input
                  label="Complemento"
                  placeholder="Sala, andar, etc."
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
                <Input
                  label="Bairro"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  error={fieldErrors.neighborhood}
                  required
                />
              </div>
              <div className={styles.gridTwo}>
                <Input
                  label="Cidade"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  error={fieldErrors.city}
                  required
                />
                <Input
                  label="Estado"
                  placeholder="UF"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  error={fieldErrors.state}
                  required
                />
              </div>
            </>
          )}

          {/* Step 3: Discount Info */}
          {step === 3 && (
            <>
              <Select
                label="Categoria"
                options={CATEGORY_OPTIONS}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                error={fieldErrors.category}
                fullWidth
              />
              <Select
                label="Tipo de desconto"
                options={DISCOUNT_TYPE_OPTIONS}
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                error={fieldErrors.discountType}
                fullWidth
              />
              <Input
                label={
                  discountType === 'FIXED'
                    ? 'Valor (R$)'
                    : 'Percentual (%)'
                }
                type="number"
                placeholder={
                  discountType === 'FIXED' ? 'Ex: 15.00' : 'Ex: 10'
                }
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                error={fieldErrors.discountValue}
                min="0"
                step="0.01"
                required
              />
              <Input
                label="Descricao do desconto"
                placeholder="Ex: 10% em todos os produtos"
                value={discountDescription}
                onChange={(e) => setDiscountDescription(e.target.value)}
                error={fieldErrors.discountDescription}
                required
              />
            </>
          )}

          {/* Step 4: Account */}
          {step === 4 && (
            <>
              <Input
                label="Seu nome"
                icon={User}
                placeholder="Nome do responsavel"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                error={fieldErrors.userName}
                autoComplete="name"
                required
              />
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
            </>
          )}

          {/* Navigation Buttons */}
          <div className={styles.actions}>
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                icon={ArrowLeft}
                onClick={handleBack}
              >
                Voltar
              </Button>
            )}
            {step < 4 && (
              <Button type="submit" variant="primary" fullWidth={step === 1}>
                Proximo
              </Button>
            )}
            {step === 4 && (
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                fullWidth
              >
                Cadastrar
              </Button>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Ja tem cadastro? <Link to="/login">Faca login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
