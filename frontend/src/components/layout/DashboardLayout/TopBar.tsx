import { Menu, Bell } from 'lucide-react';
import { Avatar } from '@/components/ui';
import styles from './TopBar.module.scss';

interface TopBarProps {
  title: string;
  userName: string;
  onMenuClick: () => void;
  notificationCount?: number;
}

export default function TopBar({ title, userName, onMenuClick, notificationCount = 0 }: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Menu">
          <Menu size={22} />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Notificacoes">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className={styles.notifBadge}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        <div className={styles.user}>
          <Avatar name={userName} size="sm" />
          <span className={styles.userName}>{userName}</span>
        </div>
      </div>
    </header>
  );
}
