import styles from './Avatar.module.scss';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: AvatarSize;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({
  src,
  name,
  size = 'md',
  className = '',
}: AvatarProps) {
  const classes = [styles.avatar, styles[size], className]
    .filter(Boolean)
    .join(' ');

  if (src) {
    return (
      <div className={classes}>
        <img src={src} alt={name} className={styles.image} />
      </div>
    );
  }

  return (
    <div className={classes} aria-label={name}>
      <span className={styles.initials}>{getInitials(name)}</span>
    </div>
  );
}
