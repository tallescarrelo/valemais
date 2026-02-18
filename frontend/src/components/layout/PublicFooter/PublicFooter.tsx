import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone } from 'lucide-react';
import styles from './PublicFooter.module.scss';

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img src="/logo-white.svg" alt="Vale+ Vantagens" className={styles.logoImg} />
            </div>
            <p className={styles.tagline}>
              Seu cartao de vantagens. Descontos reais em estabelecimentos parceiros.
            </p>
            <div className={styles.social}>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Para Voce</h4>
            <Link to="/cadastro" className={styles.link}>Quero ser cliente</Link>
            <Link to="/#beneficios" className={styles.link}>Beneficios</Link>
            <Link to="/#planos" className={styles.link}>Planos</Link>
            <Link to="/#como-funciona" className={styles.link}>Como funciona</Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Para Parceiros</h4>
            <Link to="/parceiro/cadastro" className={styles.link}>Quero ser parceiro</Link>
            <Link to="/#parceiros" className={styles.link}>Parceiros</Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contato</h4>
            <a href="mailto:contato@valemaisvantagens.com.br" className={styles.contactLink}>
              <Mail size={16} />
              contato@valemaisvantagens.com.br
            </a>
            <a href="tel:+5500000000000" className={styles.contactLink}>
              <Phone size={16} />
              (00) 00000-0000
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Vale+ Vantagens. Todos os direitos reservados.</p>
          <div className={styles.legal}>
            <Link to="/termos">Termos de Uso</Link>
            <Link to="/privacidade">Politica de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
