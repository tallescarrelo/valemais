import { useState } from 'react';
import {
  User, Mail, Lock, Search, Plus, Trash2, Download,
  ArrowRight, CreditCard, QrCode, CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Button, Input, Select, Card, CardHeader, CardBody, CardFooter,
  Modal, Badge, Avatar, Spinner, EmptyState
} from '@/components/ui';
import styles from './ComponentShowcase.module.scss';

export default function ComponentShowcase() {
  const [modalDefault, setModalDefault] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={styles.showcase}>
      <header className={styles.header}>
        <h1>Vale+ Design System</h1>
        <p>Componentes UI reutilizaveis da plataforma</p>
      </header>

      {/* BUTTONS */}
      <section className={styles.section}>
        <h2>Buttons</h2>

        <div className={styles.group}>
          <h3>Variantes</h3>
          <div className={styles.row}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div className={styles.group}>
          <h3>Tamanhos</h3>
          <div className={styles.row}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className={styles.group}>
          <h3>Com icone</h3>
          <div className={styles.row}>
            <Button icon={Plus}>Novo Parceiro</Button>
            <Button variant="secondary" icon={Download}>Exportar</Button>
            <Button variant="outline" icon={QrCode}>Meu QR Code</Button>
            <Button variant="danger" icon={Trash2} size="sm">Excluir</Button>
            <Button variant="primary" iconRight={ArrowRight}>Continuar</Button>
          </div>
        </div>

        <div className={styles.group}>
          <h3>Estados</h3>
          <div className={styles.row}>
            <Button loading>Processando...</Button>
            <Button disabled>Desabilitado</Button>
            <Button variant="primary" fullWidth icon={CreditCard}>
              Pagar R$ 19,90
            </Button>
          </div>
        </div>
      </section>

      {/* INPUTS */}
      <section className={styles.section}>
        <h2>Inputs</h2>

        <div className={styles.grid2}>
          <Input
            label="Nome completo"
            placeholder="Digite seu nome"
            icon={User}
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            icon={Mail}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha"
            icon={Lock}
          />
          <Input
            label="CPF"
            placeholder="000.000.000-00"
            hint="Apenas numeros"
          />
          <Input
            label="Campo com erro"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            error="Este campo e obrigatorio"
          />
          <Input
            label="Campo desabilitado"
            value="Valor fixo"
            disabled
          />
        </div>
      </section>

      {/* SELECT */}
      <section className={styles.section}>
        <h2>Select</h2>
        <div className={styles.grid2}>
          <Select
            label="Categoria"
            options={[
              { value: 'food', label: 'Alimentacao' },
              { value: 'health', label: 'Saude' },
              { value: 'beauty', label: 'Beleza' },
              { value: 'services', label: 'Servicos' },
              { value: 'education', label: 'Educacao' },
            ]}
          />
          <Select
            label="Com erro"
            options={[{ value: '1', label: 'Opcao 1' }]}
            error="Selecione uma opcao"
          />
        </div>
      </section>

      {/* BADGES */}
      <section className={styles.section}>
        <h2>Badges</h2>
        <div className={styles.row}>
          <Badge variant="success" dot>Ativo</Badge>
          <Badge variant="error" dot>Inativo</Badge>
          <Badge variant="warning" dot>Pendente</Badge>
          <Badge variant="info">Novo</Badge>
          <Badge variant="neutral">Rascunho</Badge>
          <Badge variant="accent">Vale+</Badge>
        </div>
      </section>

      {/* AVATARS */}
      <section className={styles.section}>
        <h2>Avatar</h2>
        <div className={styles.row}>
          <Avatar name="Talles Carrelo" size="sm" />
          <Avatar name="Talles Carrelo" size="md" />
          <Avatar name="Joao Silva" size="lg" />
          <Avatar name="Maria Santos" size="xl" />
        </div>
      </section>

      {/* SPINNER */}
      <section className={styles.section}>
        <h2>Spinner</h2>
        <div className={styles.row}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>

      {/* CARDS */}
      <section className={styles.section}>
        <h2>Cards</h2>
        <div className={styles.grid3}>
          <Card hoverable>
            <CardBody>
              <h4>Card Default</h4>
              <p>Com sombra e hover elevado.</p>
            </CardBody>
          </Card>

          <Card variant="outlined" hoverable>
            <CardBody>
              <h4>Card Outlined</h4>
              <p>Com borda e sem sombra.</p>
            </CardBody>
          </Card>

          <Card variant="flat">
            <CardBody>
              <h4>Card Flat</h4>
              <p>Background cinza, sem sombra.</p>
            </CardBody>
          </Card>

          <Card padding="none">
            <CardHeader>
              <h4>Com Header</h4>
              <Badge variant="success" dot>Ativo</Badge>
            </CardHeader>
            <CardBody>
              <p>Card completo com header, body e footer.</p>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" size="sm">Cancelar</Button>
              <Button size="sm">Salvar</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* TOASTS */}
      <section className={styles.section}>
        <h2>Toasts (Notificacoes)</h2>
        <div className={styles.row}>
          <Button
            variant="primary"
            icon={CheckCircle}
            onClick={() => toast.success('Operacao realizada com sucesso!')}
          >
            Toast Sucesso
          </Button>
          <Button
            variant="danger"
            onClick={() => toast.error('Ocorreu um erro. Tente novamente.')}
          >
            Toast Erro
          </Button>
          <Button
            variant="ghost"
            onClick={() => toast('Informacao neutra para o usuario.')}
          >
            Toast Neutro
          </Button>
        </div>
      </section>

      {/* MODALS */}
      <section className={styles.section}>
        <h2>Modais</h2>
        <div className={styles.row}>
          <Button variant="ghost" onClick={() => setModalDefault(true)}>
            Modal Default
          </Button>
          <Button
            variant="primary"
            onClick={() => setModalSuccess(true)}
          >
            Modal Sucesso
          </Button>
          <Button
            variant="danger"
            onClick={() => setModalError(true)}
          >
            Modal Erro
          </Button>
          <Button
            variant="outline"
            onClick={() => setModalConfirm(true)}
          >
            Modal Confirmar
          </Button>
        </div>

        <Modal
          isOpen={modalDefault}
          onClose={() => setModalDefault(false)}
          title="Modal Padrao"
          size="md"
        >
          <p>Este e um modal padrao com conteudo customizado. Pode conter formularios, textos, e qualquer componente.</p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setModalDefault(false)}>Fechar</Button>
            <Button onClick={() => setModalDefault(false)}>Confirmar</Button>
          </div>
        </Modal>

        <Modal
          isOpen={modalSuccess}
          onClose={() => setModalSuccess(false)}
          type="success"
          title="Pagamento confirmado!"
          message="Seu plano Vale+ esta ativo. Aproveite seus descontos em todos os parceiros."
        />

        <Modal
          isOpen={modalError}
          onClose={() => setModalError(false)}
          type="error"
          title="Falha no pagamento"
          message="Nao foi possivel processar seu pagamento. Verifique os dados e tente novamente."
        />

        <Modal
          isOpen={modalConfirm}
          onClose={() => setModalConfirm(false)}
          type="confirm"
          title="Cancelar assinatura?"
          message="Voce perdera acesso aos descontos ao final do periodo atual. Tem certeza?"
          confirmLabel="Sim, cancelar"
          cancelLabel="Manter assinatura"
          onConfirm={() => {
            setModalConfirm(false);
            toast.success('Assinatura cancelada.');
          }}
        />
      </section>

      {/* EMPTY STATE */}
      <section className={styles.section}>
        <h2>Empty State</h2>
        <Card>
          <EmptyState
            icon={Search}
            title="Nenhum parceiro encontrado"
            description="Tente buscar com outros termos ou cadastre um novo parceiro."
            actionLabel="Cadastrar Parceiro"
            onAction={() => toast.success('Acao do botao!')}
          />
        </Card>
      </section>

      {/* CARTAO VIRTUAL PREVIEW */}
      <section className={styles.section}>
        <h2>Preview: Cartao Virtual</h2>
        <div className={styles.cardPreview}>
          <div className={styles.virtualCard}>
            <div className={styles.vcTop}>
              <span className={styles.vcLogo}>VALE+</span>
              <Badge variant="success" dot>Ativo</Badge>
            </div>
            <div className={styles.vcCode}>VM-2026-X7K9P</div>
            <div className={styles.vcBottom}>
              <div>
                <span className={styles.vcLabel}>Titular</span>
                <span className={styles.vcValue}>Talles Carrelo</span>
              </div>
              <div>
                <span className={styles.vcLabel}>Valido ate</span>
                <span className={styles.vcValue}>03/2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
