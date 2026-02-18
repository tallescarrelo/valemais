import styles from './Privacy.module.scss';

export default function Privacy() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Politica de Privacidade</h1>
        <p className={styles.updated}>Ultima atualizacao: Fevereiro de 2026</p>

        <section className={styles.section}>
          <h2>1. Dados Coletados</h2>
          <p>
            Coletamos as seguintes informacoes: nome completo, e-mail, CPF, telefone, data de
            nascimento e dados de endereco. Para parceiros, tambem coletamos CNPJ, razao social
            e informacoes do estabelecimento.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Finalidade do Uso</h2>
          <p>Seus dados sao utilizados para:</p>
          <ul>
            <li>Criar e gerenciar sua conta na plataforma</li>
            <li>Processar assinaturas e pagamentos</li>
            <li>Validar descontos nos estabelecimentos parceiros</li>
            <li>Enviar comunicacoes sobre o servico</li>
            <li>Melhorar a experiencia do usuario</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Compartilhamento de Dados</h2>
          <p>
            Nao vendemos ou compartilhamos seus dados pessoais com terceiros, exceto quando
            necessario para a prestacao do servico (processadores de pagamento) ou por
            determinacao legal.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Armazenamento e Seguranca</h2>
          <p>
            Seus dados sao armazenados em servidores seguros com criptografia. Senhas sao
            armazenadas de forma irreversivel (hash). Utilizamos tokens JWT para autenticacao
            e HTTPS para todas as comunicacoes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Seus Direitos (LGPD)</h2>
          <p>De acordo com a Lei Geral de Protecao de Dados (LGPD), voce tem direito a:</p>
          <ul>
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusao de seus dados</li>
            <li>Revogar o consentimento para uso dos dados</li>
            <li>Solicitar a portabilidade dos dados</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. Cookies</h2>
          <p>
            Utilizamos cookies essenciais para o funcionamento da plataforma (autenticacao e
            preferencias). Nao utilizamos cookies de rastreamento de terceiros.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Retencao de Dados</h2>
          <p>
            Seus dados sao mantidos enquanto sua conta estiver ativa. Apos o cancelamento,
            os dados sao retidos por 5 anos para cumprimento de obrigacoes legais e fiscais,
            sendo anonimizados apos esse periodo.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. Contato do DPO</h2>
          <p>
            Para exercer seus direitos ou esclarecer duvidas sobre privacidade, entre em contato
            com nosso Encarregado de Protecao de Dados: privacidade@valemaisvantagens.com.br.
          </p>
        </section>
      </div>
    </div>
  );
}
