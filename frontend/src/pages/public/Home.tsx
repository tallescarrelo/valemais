import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, QrCode, CreditCard, Users, Store, Star,
  Utensils, Scissors, Heart, Dumbbell, GraduationCap, ShoppingBag,
  ChevronDown, ChevronUp, Check, Zap, Clock,
  Phone, Sparkles
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import styles from './Home.module.scss';

const CATEGORIES = [
  {
    icon: Utensils,
    name: 'Alimentacao',
    key: 'FOOD',
    desc: 'Restaurantes, lanchonetes, pizzarias e padarias',
    img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    discount: 'Ate 20% OFF',
  },
  {
    icon: Heart,
    name: 'Saude',
    key: 'HEALTH',
    desc: 'Farmacias, clinicas, laboratorios e oticas',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    discount: 'Ate 30% OFF',
  },
  {
    icon: Scissors,
    name: 'Beleza',
    key: 'BEAUTY',
    desc: 'Saloes, barbearias, estetica e spas',
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
    discount: 'Ate 25% OFF',
  },
  {
    icon: Dumbbell,
    name: 'Fitness',
    key: 'ENTERTAINMENT',
    desc: 'Academias, studios de pilates e crossfit',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    discount: 'Ate 35% OFF',
  },
  {
    icon: GraduationCap,
    name: 'Educacao',
    key: 'EDUCATION',
    desc: 'Cursos, escolas de idiomas e treinamentos',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    discount: 'Ate 40% OFF',
  },
  {
    icon: ShoppingBag,
    name: 'Servicos',
    key: 'SERVICES',
    desc: 'Oficinas, lavanderias, pet shops e mais',
    img: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&q=80',
    discount: 'Ate 15% OFF',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Cadastre-se',
    desc: 'Crie sua conta em menos de 2 minutos. Sem burocracia, sem complicacao.',
    icon: Zap,
  },
  {
    number: '02',
    title: 'Ative seu cartao',
    desc: 'Escolha seu plano e receba seu cartao virtual na hora. Pronto para usar.',
    icon: CreditCard,
  },
  {
    number: '03',
    title: 'Economize',
    desc: 'Va ao parceiro, escaneie o QR Code e aproveite o desconto. Simples assim.',
    icon: QrCode,
  },
];

const BENEFITS = [
  { icon: CreditCard, title: 'Cartao 100% Digital', desc: 'Seu cartao de vantagens sempre no bolso, direto no celular. Sem plastico, sem espera.' },
  { icon: QrCode, title: 'Validacao por QR Code', desc: 'Escaneie o QR Code no parceiro e valide seu desconto em segundos. Rapido e seguro.' },
  { icon: Store, title: '+200 Parceiros', desc: 'Rede crescente de estabelecimentos em diversas categorias e cidades.' },
  { icon: ShieldCheck, title: 'Descontos Garantidos', desc: 'Todos os descontos sao verificados e garantidos. Nada de pegadinha.' },
  { icon: Users, title: 'Para Toda a Familia', desc: 'Um plano acessivel que cabe no bolso de qualquer familia brasileira.' },
  { icon: Clock, title: 'Ativo na Hora', desc: 'Fez o cadastro e pagou? Cartao ativo instantaneamente. Use hoje mesmo.' },
];

const TESTIMONIALS = [
  {
    name: 'Maria Silva',
    role: 'Cliente desde 2025',
    text: 'Ja economizei mais de R$ 500 em 3 meses! Uso principalmente nos restaurantes e na farmacia perto de casa. Melhor investimento que fiz.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
  },
  {
    name: 'Carlos Eduardo',
    role: 'Cliente desde 2025',
    text: 'O cartao se paga no primeiro uso. Economizo todo mes no almoco e ainda consegui desconto na academia. Recomendo demais!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
  },
  {
    name: 'Ana Paula',
    role: 'Cliente desde 2026',
    text: 'Adorei a praticidade! O QR Code funciona super rapido e os parceiros sao otimos. Minha familia inteira ja usa.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    q: 'O que e o Vale+ Vantagens?',
    a: 'O Vale+ e um cartao de vantagens que oferece descontos exclusivos em uma rede de estabelecimentos parceiros. Com uma assinatura acessivel, voce tem acesso a descontos reais em alimentacao, saude, beleza, fitness e muito mais.',
  },
  {
    q: 'Como funciona o desconto?',
    a: 'E simples: va ate um parceiro Vale+, apresente seu cartao virtual ou escaneie o QR Code do estabelecimento. O desconto e aplicado automaticamente na hora. Sem cupom, sem codigo, sem complicacao.',
  },
  {
    q: 'Quanto custa a assinatura?',
    a: 'Oferecemos dois planos: Mensal por R$ 19,90/mes (sem fidelidade, cancele quando quiser) e Anual por R$ 199,00 a vista (economia de ~17%). Considerando que voce economiza em media R$ 150 a R$ 300 por mes com os descontos, o cartao se paga logo no primeiro uso.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim! Nao ha fidelidade ou multa. Voce pode cancelar sua assinatura a qualquer momento diretamente pelo painel do cliente. O acesso continua ate o fim do periodo pago.',
  },
  {
    q: 'Como me tornar um parceiro Vale+?',
    a: 'Basta preencher o cadastro de parceiro em nosso site. Nossa equipe analisa a solicitacao e, uma vez aprovado, seu estabelecimento ja aparece na rede com QR Code proprio. Nao ha custo para o parceiro.',
  },
  {
    q: 'O cartao funciona em qualquer cidade?',
    a: 'O Vale+ esta em constante expansao. Atualmente estamos presentes em mais de 15 cidades e crescendo. Consulte a lista de parceiros para verificar a disponibilidade na sua regiao.',
  },
];

const STATS = [
  { value: '5.000+', label: 'Clientes ativos' },
  { value: '200+', label: 'Parceiros credenciados' },
  { value: '15+', label: 'Cidades atendidas' },
  { value: 'R$ 2M+', label: 'Em descontos gerados' },
];

const PLAN_FEATURES = [
  'Cartao virtual ativo na hora',
  'Descontos em +200 parceiros',
  'Validacao por QR Code',
  'Acesso a todas as categorias',
  'Sem fidelidade - cancele quando quiser',
  'Suporte por e-mail e WhatsApp',
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={styles.home}>
      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgOverlay} />
          <div className={styles.heroBgPattern} />
        </div>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <Badge variant="accent" size="md">
              <Sparkles size={14} /> Novo: +50 parceiros este mes
            </Badge>
            <h1 className={styles.heroTitle}>
              Economize de verdade{' '}
              <span className={styles.highlight}>todos os dias</span>
            </h1>
            <p className={styles.heroSubtitle}>
              O Vale+ e o cartao de vantagens que te da descontos reais em restaurantes,
              farmacias, saloes, academias e centenas de parceiros. Tudo por menos de
              69 centavos por dia.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/cadastro">
                <Button size="lg" iconRight={ArrowRight}>Quero meu cartao</Button>
              </Link>
              <a href="#como-funciona">
                <Button variant="outline" size="lg">Como funciona</Button>
              </a>
            </div>
            <div className={styles.heroProof}>
              <div className={styles.heroAvatars}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80" alt="" />
              </div>
              <p><strong>+5.000 pessoas</strong> ja economizam com o Vale+</p>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.cardStack}>
              <img
                src="/card-model.svg"
                alt="Cartao Vale+ Vantagens"
                className={styles.cardImage}
              />
              <div className={styles.floatingDiscount}>
                <Check size={16} />
                <span>-20% no almoco</span>
              </div>
              <div className={styles.floatingValidation}>
                <Check size={16} />
                <span>Desconto validado!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOGO TICKER ============ */}
      <section className={styles.logoTicker}>
        <div className={styles.logoTickerTrack}>
          <div className={styles.logoTickerSlide}>
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            {/* Duplicado para loop contínuo */}
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
            <img src="/sempreodonto.png" alt="Sempre Odonto" />
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className={styles.statsBar}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIAS ============ */}
      <section className={styles.categoriesSection} id="parceiros">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Badge variant="accent">Categorias</Badge>
            <h2 className={styles.sectionTitle}>
              Descontos em tudo que voce <span className={styles.highlight}>precisa</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Alimentacao, saude, beleza, fitness, educacao e muito mais.
              Economize no que realmente importa.
            </p>
          </div>
          <div className={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.name} to={`/parceiros?categoria=${cat.key}`} className={styles.categoryCard}>
                  <div className={styles.categoryImage}>
                    <img src={cat.img} alt={cat.name} loading="lazy" />
                    <div className={styles.categoryOverlay} />
                    <span className={styles.categoryDiscount}>{cat.discount}</span>
                  </div>
                  <div className={styles.categoryContent}>
                    <div className={styles.categoryIcon}><Icon size={20} /></div>
                    <h3>{cat.name}</h3>
                    <p>{cat.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section className={styles.sectionAlt} id="como-funciona">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Badge variant="accent">Simples e rapido</Badge>
            <h2 className={styles.sectionTitle}>
              Comece a economizar em <span className={styles.highlight}>3 passos</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Sem burocracia, sem espera. Em menos de 2 minutos voce ja esta usando seus descontos.
            </p>
          </div>
          <div className={styles.stepsGrid}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className={styles.stepCard}>
                  <div className={styles.stepIconWrap}>
                    <div className={styles.stepIcon}><Icon size={28} /></div>
                    {i < STEPS.length - 1 && <div className={styles.stepLine} />}
                  </div>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ BENEFICIOS ============ */}
      <section className={styles.benefitsSection} id="vantagens">
        <div className={styles.container}>
          <div className={styles.benefitsLayout}>
            <div className={styles.benefitsLeft}>
              <Badge variant="accent">Vantagens</Badge>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>
                Por que escolher o <span className={styles.highlight}>Vale+</span>?
              </h2>
              <p className={styles.benefitsDesc}>
                Mais do que um cartao de descontos — e uma nova forma de economizar
                no dia a dia da sua familia.
              </p>
              <div className={styles.benefitsImage}>
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80"
                  alt="Pessoas felizes economizando"
                  loading="lazy"
                />
              </div>
            </div>
            <div className={styles.benefitsRight}>
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className={styles.benefitItem}>
                    <div className={styles.benefitIcon}><Icon size={22} /></div>
                    <div>
                      <h3>{b.title}</h3>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PLANO ============ */}
      <section className={styles.planSection} id="planos">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Badge variant="accent">Plano</Badge>
            <h2 className={styles.sectionTitleLight}>
              Invista menos de <span className={styles.highlightLight}>69 centavos por dia</span>
            </h2>
            <p className={styles.sectionSubtitleLight}>
              E economize centenas de reais por mes com descontos reais.
            </p>
          </div>
          <div className={styles.plansGrid}>
            {/* Plano Mensal */}
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <span className={styles.planName}>Mensal</span>
                <div className={styles.planPrice}>
                  <span className={styles.planCurrency}>R$</span>
                  <span className={styles.planValue}>19</span>
                  <div className={styles.planCents}>
                    <span>,90</span>
                    <span>/mes</span>
                  </div>
                </div>
                <p className={styles.planSave}>
                  Clientes economizam em media <strong>R$ 250/mes</strong> — retorno de 12x
                </p>
              </div>
              <div className={styles.planDivider} />
              <div className={styles.planFeatures}>
                {PLAN_FEATURES.map((f) => (
                  <div key={f} className={styles.planFeature}>
                    <Check size={18} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/cadastro" className={styles.planCta}>
                <Button size="lg" iconRight={ArrowRight} style={{ width: '100%' }}>
                  Quero meu cartao Vale+
                </Button>
              </Link>
              <p className={styles.planNote}>Sem fidelidade. Cancele quando quiser.</p>
            </div>

            {/* Plano Anual */}
            <div className={`${styles.planCard} ${styles.planCardHighlight}`}>
              <div className={styles.planPopular}>MELHOR CUSTO</div>
              <div className={styles.planHeader}>
                <span className={styles.planName}>Anual</span>
                <div className={styles.planPrice}>
                  <span className={styles.planCurrency}>R$</span>
                  <span className={styles.planValue}>199</span>
                  <div className={styles.planCents}>
                    <span>,00</span>
                    <span>/ano</span>
                  </div>
                </div>
                <p className={styles.planSave}>
                  Equivale a <strong>R$ 16,58/mes</strong> — <Badge variant="accent" size="sm">~17% OFF</Badge>
                </p>
              </div>
              <div className={styles.planDivider} />
              <div className={styles.planFeatures}>
                {PLAN_FEATURES.map((f) => (
                  <div key={f} className={styles.planFeature}>
                    <Check size={18} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/cadastro" className={styles.planCta}>
                <Button size="lg" iconRight={ArrowRight} style={{ width: '100%' }}>
                  Quero meu cartao Vale+
                </Button>
              </Link>
              <p className={styles.planNote}>Pagamento unico. 12 meses de vantagens.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEPOIMENTOS ============ */}
      <section className={styles.testimonialSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Badge variant="accent">Depoimentos</Badge>
            <h2 className={styles.sectionTitle}>
              Quem usa, <span className={styles.highlight}>recomenda</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Veja o que nossos clientes dizem sobre o Vale+.
            </p>
          </div>
          <div className={styles.testimonialsGrid}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <img src={t.avatar} alt={t.name} loading="lazy" />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className={styles.faqSection} id="faq">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Badge variant="accent">FAQ</Badge>
            <h2 className={styles.sectionTitle}>
              Perguntas <span className={styles.highlight}>frequentes</span>
            </h2>
          </div>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{item.q}</span>
                  {openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA PARCEIROS ============ */}
      <section className={styles.partnerCta}>
        <div className={styles.container}>
          <div className={styles.partnerCtaGrid}>
            <div className={styles.partnerCtaContent}>
              <Badge variant="neutral">Para Empresas</Badge>
              <h2 className={styles.partnerCtaTitle}>
                Traga mais clientes para o seu negocio
              </h2>
              <p className={styles.partnerCtaDesc}>
                Cadastre seu estabelecimento na rede Vale+ e atraia milhares de clientes
                que buscam descontos. Sem custo para o parceiro, sem mensalidade.
              </p>
              <ul className={styles.partnerCtaList}>
                <li><Check size={18} /> Sem custo para o parceiro</li>
                <li><Check size={18} /> QR Code proprio do estabelecimento</li>
                <li><Check size={18} /> Painel de validacoes e estatisticas</li>
                <li><Check size={18} /> Mais visibilidade para seu negocio</li>
              </ul>
              <Link to="/parceiro/cadastro">
                <Button size="lg" iconRight={ArrowRight}>Quero ser parceiro</Button>
              </Link>
            </div>
            <div className={styles.partnerCtaImage}>
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=80"
                alt="Comerciante parceiro"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <div className={styles.finalCtaContent}>
            <h2>Pronto para economizar<br />de verdade?</h2>
            <p>
              Junte-se a mais de 5.000 pessoas que ja estao economizando com o Vale+.
              Cadastro rapido, cartao ativo na hora.
            </p>
            <div className={styles.finalCtaActions}>
              <Link to="/cadastro">
                <Button size="lg" iconRight={ArrowRight}>Criar minha conta gratis</Button>
              </Link>
              <a href="tel:+5500000000000" className={styles.finalCtaPhone}>
                <Phone size={18} />
                Ou ligue: (00) 0000-0000
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
