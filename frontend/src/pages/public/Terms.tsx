import styles from './Terms.module.scss';

export default function Terms() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Termos de Uso</h1>
        <p className={styles.updated}>Ultima atualizacao: Fevereiro de 2026</p>

        <section className={styles.section}>
          <h2>1. Aceitacao dos Termos</h2>
          <p>
            Ao acessar e utilizar a plataforma VALE+ Vantagens, voce concorda com estes Termos de Uso.
            Caso nao concorde com algum dos termos, nao utilize nossos servicos.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Descricao do Servico</h2>
          <p>
            A VALE+ Vantagens e uma plataforma de beneficios que conecta clientes assinantes a
            estabelecimentos parceiros, oferecendo descontos exclusivos mediante apresentacao do
            cartao virtual ou QR Code.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Cadastro e Conta</h2>
          <p>
            Para utilizar os servicos, voce devera criar uma conta fornecendo informacoes verdadeiras
            e completas. Voce e responsavel por manter a confidencialidade de sua senha e por todas
            as atividades realizadas em sua conta.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Planos e Pagamentos</h2>
          <p>
            Os planos de assinatura possuem cobranca recorrente mensal. O cancelamento pode ser
            solicitado a qualquer momento, sendo efetivado ao final do periodo vigente. Nao ha
            reembolso proporcional por cancelamento antecipado.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Uso dos Descontos</h2>
          <p>
            Os descontos sao pessoais e intransferiveis, validos apenas para o titular do cartao VALE+.
            O uso indevido, compartilhamento ou tentativa de fraude resultara no cancelamento imediato
            da assinatura sem direito a reembolso.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Parceiros</h2>
          <p>
            Os estabelecimentos parceiros sao responsaveis pela qualidade de seus produtos e servicos.
            A VALE+ atua como intermediadora e nao se responsabiliza por eventuais divergencias entre
            o parceiro e o cliente.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Limitacao de Responsabilidade</h2>
          <p>
            A VALE+ nao garante disponibilidade ininterrupta da plataforma e nao se responsabiliza
            por danos indiretos decorrentes do uso ou impossibilidade de uso dos servicos.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Alteracoes nos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes termos a qualquer momento. As alteracoes serao
            comunicadas por e-mail ou notificacao na plataforma com antecedencia minima de 30 dias.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Contato</h2>
          <p>
            Duvidas sobre estes termos podem ser enviadas para
            contato@valemaisvantagens.com.br.
          </p>
        </section>
      </div>
    </div>
  );
}
