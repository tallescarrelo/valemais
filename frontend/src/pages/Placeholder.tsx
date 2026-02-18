import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { EmptyState } from '@/components/ui';

export default function Placeholder() {
  const location = useLocation();

  return (
    <EmptyState
      icon={Construction}
      title="Pagina em construcao"
      description={`Rota: ${location.pathname}`}
    />
  );
}
