import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Utensils, Heart, Scissors, ShoppingBag, GraduationCap, Gamepad2,
  Shirt, Car, Monitor, MoreHorizontal, MapPin, Store, ArrowRight,
  Percent, Tag,
} from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { api } from '@/services/api';
import styles from './Segments.module.scss';

const CATEGORIES = [
  { key: 'ALL', label: 'Todos', icon: Store },
  { key: 'FOOD', label: 'Alimentacao', icon: Utensils },
  { key: 'HEALTH', label: 'Saude', icon: Heart },
  { key: 'BEAUTY', label: 'Beleza', icon: Scissors },
  { key: 'SERVICES', label: 'Servicos', icon: ShoppingBag },
  { key: 'EDUCATION', label: 'Educacao', icon: GraduationCap },
  { key: 'ENTERTAINMENT', label: 'Entretenimento', icon: Gamepad2 },
  { key: 'FASHION', label: 'Moda', icon: Shirt },
  { key: 'AUTOMOTIVE', label: 'Automotivo', icon: Car },
  { key: 'TECHNOLOGY', label: 'Tecnologia', icon: Monitor },
  { key: 'OTHER', label: 'Outros', icon: MoreHorizontal },
];

interface Partner {
  id: string;
  tradeName: string;
  category: string;
  discountType: string;
  discountValue: number;
  discountDescription: string | null;
  logoUrl: string | null;
  city: string;
  state: string;
}

function formatDiscount(type: string, value: number) {
  if (type === 'PERCENTAGE') return `${value}% OFF`;
  return `R$ ${(value / 100).toFixed(2).replace('.', ',')} OFF`;
}

function getCategoryLabel(key: string) {
  return CATEGORIES.find((c) => c.key === key)?.label || key;
}

export default function Segments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('categoria') || 'ALL';
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = activeCategory !== 'ALL' ? `?category=${activeCategory}` : '';
    api.get<{ data: Partner[] }>(`/public/partners${query}`)
      .then((res) => setPartners(res.data))
      .catch(() => setPartners([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const handleCategoryClick = (key: string) => {
    if (key === 'ALL') {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: key });
    }
  };

  return (
    <div className={styles.segments}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.container}>
          <Badge variant="accent">Parceiros</Badge>
          <h1 className={styles.title}>
            Nossos <span className={styles.highlight}>parceiros</span>
          </h1>
          <p className={styles.subtitle}>
            Encontre estabelecimentos com descontos exclusivos para clientes Vale+.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className={styles.content}>
        <div className={styles.container}>
          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  className={`${styles.categoryTab} ${isActive ? styles.categoryTabActive : ''}`}
                  onClick={() => handleCategoryClick(cat.key)}
                >
                  <Icon size={18} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results */}
          {loading ? (
            <div className={styles.loading}>Carregando parceiros...</div>
          ) : partners.length === 0 ? (
            <div className={styles.empty}>
              <Store size={48} />
              <h3>Nenhum parceiro encontrado</h3>
              <p>Nao encontramos parceiros nesta categoria. Tente outra categoria ou volte mais tarde.</p>
            </div>
          ) : (
            <>
              <p className={styles.resultsCount}>
                {partners.length} parceiro{partners.length !== 1 ? 's' : ''} encontrado{partners.length !== 1 ? 's' : ''}
                {activeCategory !== 'ALL' && ` em ${getCategoryLabel(activeCategory)}`}
              </p>
              <div className={styles.partnersGrid}>
                {partners.map((partner) => (
                  <div key={partner.id} className={styles.partnerCard}>
                    <div className={styles.partnerLogo}>
                      {partner.logoUrl ? (
                        <img src={partner.logoUrl} alt={partner.tradeName} />
                      ) : (
                        <Store size={32} />
                      )}
                    </div>
                    <div className={styles.partnerInfo}>
                      <h3 className={styles.partnerName}>{partner.tradeName}</h3>
                      <span className={styles.partnerCategory}>
                        <Tag size={12} />
                        {getCategoryLabel(partner.category)}
                      </span>
                      <div className={styles.partnerDiscount}>
                        <Percent size={14} />
                        <span>{formatDiscount(partner.discountType, partner.discountValue)}</span>
                      </div>
                      {partner.discountDescription && (
                        <p className={styles.partnerDesc}>{partner.discountDescription}</p>
                      )}
                      <div className={styles.partnerLocation}>
                        <MapPin size={14} />
                        <span>{partner.city}, {partner.state}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CTA */}
          <div className={styles.cta}>
            <p>Quer economizar em todos esses parceiros?</p>
            <Link to="/cadastro">
              <Button iconRight={ArrowRight}>Quero meu cartao Vale+</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
