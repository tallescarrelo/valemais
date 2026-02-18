# Vale+ - Design System

## Cores da Marca

Extraidas diretamente dos logos SVG oficiais.

### Paleta Principal
```scss
// Cores da marca (do logo)
$color-primary:       #3c3c3b;  // Cinza escuro/carvao - texto principal, headers, fundos escuros
$color-accent:        #3aaa35;  // Verde - CTAs, destaques, sucesso, icones
$color-white:         #ffffff;  // Branco - fundos claros, texto em fundo escuro

// Variacoes do primary (cinza escuro)
$color-primary-light: #5a5a59;  // Textos secundarios
$color-primary-dark:  #2a2a29;  // Fundos mais escuros, hover states

// Variacoes do accent (verde)
$color-accent-light:  #4cc247;  // Hover em botoes verdes
$color-accent-dark:   #2e8a2a;  // Pressed state
$color-accent-bg:     #e8f5e7;  // Background verde suave (cards, alerts)
```

### Paleta de Suporte
```scss
// Neutros
$color-gray-50:       #fafafa;  // Background pagina
$color-gray-100:      #f5f5f5;  // Background cards, secoes alternadas
$color-gray-200:      #e5e5e5;  // Bordas sutis
$color-gray-300:      #d4d4d4;  // Bordas inputs
$color-gray-400:      #a3a3a3;  // Placeholders
$color-gray-500:      #737373;  // Texto terciario
$color-gray-600:      #525252;  // Texto secundario
$color-gray-700:      #404040;  // Texto principal alternativo
$color-gray-800:      #262626;  // Headings
$color-gray-900:      #171717;  // Texto maximo contraste

// Feedback
$color-success:       #3aaa35;  // Verde da marca (reuso)
$color-error:         #dc2626;  // Vermelho para erros
$color-warning:       #f59e0b;  // Amarelo para alertas
$color-info:          #3b82f6;  // Azul para informacoes

// Vermelho (accent secundario - uso pontual como o cliente pediu)
$color-red:           #dc2626;  // Para badges, alertas, status inativo
$color-red-light:     #fef2f2;  // Background de alertas
```

### Estrategia de Uso das Cores

O cliente pediu **preto com vermelho**, mas concordamos que sao cores pesadas.
A direcao e:

1. **Cinza escuro (#3c3c3b)** como cor dominante: headers, sidebar, fundos, textos
2. **Verde (#3aaa35)** como accent principal: botoes CTA, icones de sucesso, destaques
3. **Vermelho** apenas pontual: badges de status inativo, alertas de erro, indicadores
4. **Muito branco e espaco** para respirar (referencia Ohio demo26)

---

## Tipografia

```scss
// Font family
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-display: 'Plus Jakarta Sans', $font-primary;  // Para headings impactantes

// Font sizes
$font-xs:     0.75rem;   // 12px
$font-sm:     0.875rem;  // 14px
$font-base:   1rem;      // 16px
$font-lg:     1.125rem;  // 18px
$font-xl:     1.25rem;   // 20px
$font-2xl:    1.5rem;    // 24px
$font-3xl:    1.875rem;  // 30px
$font-4xl:    2.25rem;   // 36px
$font-5xl:    3rem;      // 48px
$font-6xl:    3.75rem;   // 60px - Hero titles

// Font weights
$font-regular:   400;
$font-medium:    500;
$font-semibold:  600;
$font-bold:      700;
$font-extrabold: 800;

// Line heights
$leading-tight:  1.25;
$leading-normal: 1.5;
$leading-relaxed: 1.75;
```

---

## Espacamento

```scss
// Spacing scale (baseado em 4px)
$space-0:   0;
$space-1:   0.25rem;  // 4px
$space-2:   0.5rem;   // 8px
$space-3:   0.75rem;  // 12px
$space-4:   1rem;     // 16px
$space-5:   1.25rem;  // 20px
$space-6:   1.5rem;   // 24px
$space-8:   2rem;     // 32px
$space-10:  2.5rem;   // 40px
$space-12:  3rem;     // 48px
$space-16:  4rem;     // 64px
$space-20:  5rem;     // 80px
$space-24:  6rem;     // 96px
$space-32:  8rem;     // 128px - Padding de secoes
```

---

## Breakpoints

```scss
$breakpoint-sm:   640px;   // Mobile landscape
$breakpoint-md:   768px;   // Tablet
$breakpoint-lg:   1024px;  // Desktop pequeno
$breakpoint-xl:   1280px;  // Desktop
$breakpoint-2xl:  1536px;  // Desktop grande

// Mixins de media query
@mixin mobile {
  @media (max-width: #{$breakpoint-md - 1px}) { @content; }
}
@mixin tablet {
  @media (min-width: $breakpoint-md) and (max-width: #{$breakpoint-lg - 1px}) { @content; }
}
@mixin desktop {
  @media (min-width: $breakpoint-lg) { @content; }
}
@mixin desktop-xl {
  @media (min-width: $breakpoint-xl) { @content; }
}
```

---

## Sombras

```scss
$shadow-sm:   0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md:   0 4px 6px rgba(0, 0, 0, 0.07);
$shadow-lg:   0 10px 15px rgba(0, 0, 0, 0.1);
$shadow-xl:   0 20px 25px rgba(0, 0, 0, 0.1);
$shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
```

---

## Border Radius

```scss
$radius-sm:   0.25rem;  // 4px
$radius-md:   0.5rem;   // 8px
$radius-lg:   0.75rem;  // 12px
$radius-xl:   1rem;     // 16px
$radius-2xl:  1.5rem;   // 24px
$radius-full: 9999px;   // Pill/circular
```

---

## Componentes - Direcao Visual

### Botoes
- **Primary**: Fundo verde (#3aaa35), texto branco, border-radius pill (9999px)
- **Secondary**: Fundo cinza escuro (#3c3c3b), texto branco
- **Outline**: Borda verde, texto verde, fundo transparente
- **Ghost**: Sem borda, texto verde, hover com background sutil
- **Danger**: Fundo vermelho (uso pontual)

### Cards
- Background branco
- Sombra sutil ($shadow-card)
- Border-radius $radius-lg
- Padding generoso ($space-6)
- Hover: eleva sombra para $shadow-lg

### Inputs
- Borda $color-gray-300
- Border-radius $radius-md
- Padding $space-3 $space-4
- Focus: borda verde (#3aaa35) + sombra verde sutil
- Placeholder: $color-gray-400

### Sidebar (Dashboards)
- Background $color-primary (#3c3c3b)
- Texto branco
- Item ativo: background com opacidade + indicador verde lateral
- Icones: Lucide React, cor branca/verde

### Cartao Virtual
- Gradiente: $color-primary -> $color-primary-dark
- Detalhes em verde (#3aaa35)
- Logo Vale+ branco
- Bordas arredondadas grandes
- Efeito 3D sutil com sombra

---

## Animacoes

Usando Framer Motion:
- **Fade up**: Elementos aparecem de baixo para cima ao entrar na viewport
- **Stagger**: Cards aparecem em sequencia com delay
- **Hover scale**: Cards e botoes crescem sutilmente no hover (1.02-1.05)
- **Page transitions**: Fade suave entre paginas
- Duracao padrao: 0.3s para micro-interacoes, 0.6s para entrada de secoes
