import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';
import styles from './PublicHeader.module.scss';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Beneficios', path: '/#beneficios' },
  { label: 'Parceiros', path: '/#parceiros' },
  { label: 'Como Funciona', path: '/#como-funciona' },
  { label: 'Planos', path: '/#planos' },
];

export default function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/logo.svg" alt="Vale+ Vantagens" className={styles.logoImg} />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className={styles.navActions}>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/cadastro" onClick={() => setMenuOpen(false)}>
              <Button variant="primary" size="sm">Cadastre-se</Button>
            </Link>
          </div>
        </nav>

        <div className={styles.headerActions}>
          <Link to="/login">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link to="/cadastro">
            <Button variant="primary" size="sm">Cadastre-se</Button>
          </Link>
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
