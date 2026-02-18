import { useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button';
import styles from './Modal.module.scss';

type ModalSize = 'sm' | 'md' | 'lg';
type ModalType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'confirm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  size?: ModalSize;
  type?: ModalType;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  loading?: boolean;
  closeOnOverlay?: boolean;
  showCloseButton?: boolean;
  footer?: ReactNode;
}

const typeConfig = {
  default: { icon: null, color: '' },
  success: { icon: CheckCircle, color: 'success' },
  error: { icon: AlertCircle, color: 'error' },
  warning: { icon: AlertTriangle, color: 'warning' },
  info: { icon: Info, color: 'info' },
  confirm: { icon: AlertTriangle, color: 'warning' },
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  type = 'default',
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  loading = false,
  closeOnOverlay = true,
  showCloseButton = true,
  footer,
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const config = typeConfig[type];
  const IconComponent = config.icon;

  const renderFooter = () => {
    if (footer) return footer;

    if (type === 'confirm') {
      return (
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      );
    }

    if (type === 'success' || type === 'error' || type === 'warning' || type === 'info') {
      return (
        <div className={styles.actions}>
          <Button variant="primary" onClick={onClose}>
            Entendi
          </Button>
        </div>
      );
    }

    return null;
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className={styles.portal}>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnOverlay ? onClose : undefined}
          />
          <div className={styles.container}>
            <motion.div
              className={`${styles.modal} ${styles[size]}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              {showCloseButton && (
                <button
                  className={styles.close}
                  onClick={onClose}
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              )}

              {IconComponent && (
                <div className={`${styles.iconWrapper} ${styles[config.color]}`}>
                  <IconComponent size={32} />
                </div>
              )}

              {title && (
                <h3 id="modal-title" className={styles.title}>
                  {title}
                </h3>
              )}

              {message && <p className={styles.message}>{message}</p>}

              {children && <div className={styles.content}>{children}</div>}

              {renderFooter()}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
