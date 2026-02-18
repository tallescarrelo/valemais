import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Helper: gera codigo de validacao
function genValCode(): string {
  return 'VAL-' + crypto.randomBytes(3).toString('hex').toUpperCase();
}

// Helper: data passada (dias atras)
function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

// Helper: data futura (dias a frente)
function daysFromNow(days: number): Date {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

async function main() {
  console.log('============================================');
  console.log('  VALE+ SEED - Populando banco de dados');
  console.log('============================================\n');

  // ============ LIMPAR DADOS ANTERIORES ============
  console.log('Limpando dados anteriores...');
  await prisma.validation.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.partnerUser.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.user.deleteMany();
  await prisma.plan.deleteMany();
  console.log('  Dados limpos.\n');

  // ============ 1. ADMIN ============
  console.log('1. Criando Admin...');
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Administrador Vale+',
      email: 'admin@valemaisvantagens.com.br',
      cpf: '00000000000',
      phone: '11999999999',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
      cardCode: 'VM-ADMIN-00001',
    },
  });
  console.log(`  ✓ ${admin.email}\n`);

  // ============ 2. PLANO ============
  console.log('2. Criando Plano...');
  const plan = await prisma.plan.create({
    data: {
      id: 'plan-vale-plus-mvp',
      name: 'Plano Vale+',
      description: 'Acesso completo a todos os descontos da rede de parceiros Vale+.',
      price: 1990,
      intervalMonths: 1,
      benefits: [
        'Cartao virtual exclusivo',
        'Descontos em toda rede de parceiros',
        'Validacao instantanea via QR Code',
        'Sem limite de validacoes',
        'Acesso ao app/plataforma',
        'Suporte por e-mail e WhatsApp',
      ],
      isActive: true,
    },
  });
  console.log(`  ✓ ${plan.name} - R$ ${(plan.price / 100).toFixed(2)}/mes\n`);

  // ============ 3. PARCEIROS (12 parceiros em 6 categorias) ============
  console.log('3. Criando Parceiros...');
  const partnerPassword = await bcrypt.hash('Parceiro@123', 12);

  const partnersData = [
    // ---- FOOD (3) ----
    {
      companyName: 'Restaurante Sabor Caseiro LTDA',
      tradeName: 'Sabor Caseiro',
      cnpj: '12345678000101',
      email: 'contato@saborcaseiro.com.br',
      phone: '11988887777',
      zipCode: '01310100',
      street: 'Av Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'FOOD' as const,
      discountValue: 10,
      discountDescription: '10% de desconto em todos os pratos do cardapio',
      partnerCode: 'PSABORCASEIRO2026',
      userEmail: 'parceiro@saborcaseiro.com.br',
      userName: 'Roberto Almeida',
      instagram: '@saborcaseiro',
      openingHours: 'Seg-Sex 11h-15h, 18h-22h | Sab-Dom 11h-16h',
    },
    {
      companyName: 'Pizzaria Don Mario LTDA',
      tradeName: 'Don Mario Pizzas',
      cnpj: '12345678000404',
      email: 'contato@donmario.com.br',
      phone: '11988881111',
      zipCode: '01310400',
      street: 'Rua Oscar Freire',
      number: '350',
      neighborhood: 'Jardins',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'FOOD' as const,
      discountValue: 15,
      discountDescription: '15% de desconto em pizzas e massas',
      partnerCode: 'PDONMARIO2026',
      userEmail: 'parceiro@donmario.com.br',
      userName: 'Mario Bianchi',
      instagram: '@donmariopizzas',
      openingHours: 'Ter-Dom 18h-00h',
    },
    {
      companyName: 'Padaria Pao Quente ME',
      tradeName: 'Padaria Pao Quente',
      cnpj: '12345678000505',
      email: 'contato@paoquente.com.br',
      phone: '11988882222',
      zipCode: '01310500',
      street: 'Rua Haddock Lobo',
      number: '120',
      neighborhood: 'Cerqueira Cesar',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'FOOD' as const,
      discountValue: 10,
      discountDescription: '10% de desconto em paes e confeitaria',
      partnerCode: 'PPAOQUENTE2026',
      userEmail: 'parceiro@paoquente.com.br',
      userName: 'Jose Ferreira',
      instagram: '@padariapqsp',
      openingHours: 'Todos os dias 6h-21h',
    },

    // ---- HEALTH (2) ----
    {
      companyName: 'Farmacia Saude Total LTDA',
      tradeName: 'Saude Total',
      cnpj: '12345678000303',
      email: 'contato@saudetotal.com.br',
      phone: '11966665555',
      zipCode: '01310300',
      street: 'Rua da Consolacao',
      number: '200',
      neighborhood: 'Republica',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'HEALTH' as const,
      discountValue: 8,
      discountDescription: '8% de desconto em medicamentos e perfumaria',
      partnerCode: 'PSAUDETOTAL2026',
      userEmail: 'parceiro@saudetotal.com.br',
      userName: 'Dra. Camila Rocha',
      openingHours: 'Seg-Sab 7h-22h | Dom 8h-20h',
    },
    {
      companyName: 'Clinica Bem Estar LTDA',
      tradeName: 'Clinica Bem Estar',
      cnpj: '12345678000606',
      email: 'contato@bemestar.com.br',
      phone: '11966661111',
      zipCode: '01310600',
      street: 'Alameda Santos',
      number: '800',
      neighborhood: 'Jardim Paulista',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'HEALTH' as const,
      discountValue: 20,
      discountDescription: '20% de desconto em consultas e exames',
      partnerCode: 'PBEMESTAR2026',
      userEmail: 'parceiro@bemestar.com.br',
      userName: 'Dr. Ricardo Mendes',
      openingHours: 'Seg-Sex 8h-18h | Sab 8h-12h',
    },

    // ---- BEAUTY (2) ----
    {
      companyName: 'Studio Bella Hair ME',
      tradeName: 'Bella Hair Studio',
      cnpj: '12345678000202',
      email: 'contato@bellahair.com.br',
      phone: '11977776666',
      zipCode: '01310200',
      street: 'Rua Augusta',
      number: '500',
      neighborhood: 'Consolacao',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'BEAUTY' as const,
      discountValue: 15,
      discountDescription: '15% de desconto em cortes, coloracao e tratamentos',
      partnerCode: 'PBELLAHAIR2026',
      userEmail: 'parceiro@bellahair.com.br',
      userName: 'Isabella Santos',
      instagram: '@bellahairstudio',
      openingHours: 'Seg-Sab 9h-20h',
    },
    {
      companyName: 'Barbearia Classic ME',
      tradeName: 'Barbearia Classic',
      cnpj: '12345678000707',
      email: 'contato@barbeariaclassic.com.br',
      phone: '11977771111',
      zipCode: '01310700',
      street: 'Rua Bela Cintra',
      number: '280',
      neighborhood: 'Consolacao',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'BEAUTY' as const,
      discountValue: 12,
      discountDescription: '12% de desconto em cortes e barba',
      partnerCode: 'PCLASSIC2026',
      userEmail: 'parceiro@barbeariaclassic.com.br',
      userName: 'Diego Martins',
      instagram: '@barbeariaclassic',
      openingHours: 'Seg-Sab 9h-20h',
    },

    // ---- FITNESS (2) ----
    {
      companyName: 'Academia Iron Fit LTDA',
      tradeName: 'Iron Fit Academia',
      cnpj: '12345678000808',
      email: 'contato@ironfit.com.br',
      phone: '11955551111',
      zipCode: '01310800',
      street: 'Av Brigadeiro Faria Lima',
      number: '1500',
      neighborhood: 'Pinheiros',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'ENTERTAINMENT' as const,
      discountValue: 30,
      discountDescription: '30% de desconto na mensalidade',
      partnerCode: 'PIRONFIT2026',
      userEmail: 'parceiro@ironfit.com.br',
      userName: 'Thiago Costa',
      instagram: '@ironfitacademia',
      openingHours: 'Seg-Sex 6h-23h | Sab 8h-18h | Dom 8h-14h',
    },
    {
      companyName: 'Studio Pilates Vida ME',
      tradeName: 'Pilates Vida',
      cnpj: '12345678000909',
      email: 'contato@pilatesvida.com.br',
      phone: '11955552222',
      zipCode: '01310900',
      street: 'Rua Joaquim Floriano',
      number: '400',
      neighborhood: 'Itaim Bibi',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'ENTERTAINMENT' as const,
      discountValue: 25,
      discountDescription: '25% de desconto em pacotes de aulas',
      partnerCode: 'PPILATESVIDA2026',
      userEmail: 'parceiro@pilatesvida.com.br',
      userName: 'Juliana Prado',
      instagram: '@pilatesvida',
      openingHours: 'Seg-Sex 7h-21h | Sab 8h-14h',
    },

    // ---- EDUCATION (1) ----
    {
      companyName: 'Centro de Idiomas Global LTDA',
      tradeName: 'Global Idiomas',
      cnpj: '12345678001010',
      email: 'contato@globalidiomas.com.br',
      phone: '11944441111',
      zipCode: '01311000',
      street: 'Rua Pamplona',
      number: '600',
      neighborhood: 'Jardim Paulista',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'EDUCATION' as const,
      discountValue: 35,
      discountDescription: '35% de desconto em cursos de ingles e espanhol',
      partnerCode: 'PGLOBALIDIOMAS2026',
      userEmail: 'parceiro@globalidiomas.com.br',
      userName: 'Prof. Marcos Vieira',
      website: 'www.globalidiomas.com.br',
      openingHours: 'Seg-Sex 8h-21h | Sab 8h-13h',
    },

    // ---- SERVICES (2) ----
    {
      companyName: 'Pet Shop Amigo Fiel ME',
      tradeName: 'Pet Shop Amigo Fiel',
      cnpj: '12345678001111',
      email: 'contato@amigofiel.com.br',
      phone: '11933331111',
      zipCode: '01311100',
      street: 'Rua Joao Cachoeira',
      number: '150',
      neighborhood: 'Vila Olimpia',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'SERVICES' as const,
      discountValue: 12,
      discountDescription: '12% de desconto em banho, tosa e produtos',
      partnerCode: 'PAMIGOFIEL2026',
      userEmail: 'parceiro@amigofiel.com.br',
      userName: 'Larissa Gomes',
      instagram: '@petshopamigofiel',
      openingHours: 'Seg-Sab 8h-19h | Dom 9h-14h',
    },
    {
      companyName: 'Auto Center Express LTDA',
      tradeName: 'Auto Center Express',
      cnpj: '12345678001212',
      email: 'contato@autocenter.com.br',
      phone: '11933332222',
      zipCode: '01311200',
      street: 'Av Reboucas',
      number: '2200',
      neighborhood: 'Pinheiros',
      city: 'Sao Paulo',
      state: 'SP',
      category: 'AUTOMOTIVE' as const,
      discountValue: 10,
      discountDescription: '10% de desconto em revisoes e troca de oleo',
      partnerCode: 'PAUTOCENTER2026',
      userEmail: 'parceiro@autocenter.com.br',
      userName: 'Carlos Alberto',
      openingHours: 'Seg-Sex 8h-18h | Sab 8h-13h',
    },
  ];

  const partners: Record<string, any> = {};
  for (const p of partnersData) {
    const { userEmail, userName, ...partnerFields } = p;
    const partner = await prisma.partner.create({
      data: {
        ...partnerFields,
        discountType: 'PERCENTAGE',
        status: 'ACTIVE',
        users: {
          create: {
            name: userName,
            email: userEmail,
            password: partnerPassword,
          },
        },
      },
    });
    partners[p.partnerCode] = partner;
    console.log(`  ✓ ${partner.tradeName} (${partner.category}) - ${partner.discountValue}% OFF`);
  }
  console.log(`  Total: ${Object.keys(partners).length} parceiros\n`);

  // ============ 4. CLIENTES ============
  console.log('4. Criando Clientes...');
  const clientPassword = await bcrypt.hash('Cliente@123', 12);

  // --- Cliente 1: Maria Santos (ativo, 3 meses de historico) ---
  const maria = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'cliente@teste.com.br',
      cpf: '11122233344',
      phone: '11955554444',
      password: clientPassword,
      role: 'CLIENT',
      status: 'ACTIVE',
      cardCode: 'VM-2026-MR7K9',
      zipCode: '01311000',
      street: 'Rua Augusta',
      number: '1200',
      neighborhood: 'Consolacao',
      city: 'Sao Paulo',
      state: 'SP',
      birthDate: new Date('1992-05-15'),
    },
  });

  // Subscription ativa com historico de 3 meses
  const mariaSub = await prisma.subscription.create({
    data: {
      userId: maria.id,
      planId: plan.id,
      type: 'RECURRING',
      status: 'ACTIVE',
      startDate: daysAgo(90),
      endDate: daysFromNow(20),
      nextBillingDate: daysFromNow(20),
    },
  });

  // 3 pagamentos (meses anteriores + atual)
  await prisma.payment.createMany({
    data: [
      { userId: maria.id, subscriptionId: mariaSub.id, amount: 990, status: 'CONFIRMED', method: 'PIX', paidAt: daysAgo(90) },
      { userId: maria.id, subscriptionId: mariaSub.id, amount: 1990, status: 'CONFIRMED', method: 'PIX', paidAt: daysAgo(60) },
      { userId: maria.id, subscriptionId: mariaSub.id, amount: 1990, status: 'CONFIRMED', method: 'CREDIT_CARD', paidAt: daysAgo(30) },
    ],
  });

  console.log(`  ✓ ${maria.name} (${maria.email}) - Plano ATIVO, 3 pagamentos`);

  // --- Cliente 2: Joao Oliveira (ativo, 2 meses) ---
  const joao = await prisma.user.create({
    data: {
      name: 'Joao Oliveira',
      email: 'joao@teste.com.br',
      cpf: '22233344455',
      phone: '11944443333',
      password: clientPassword,
      role: 'CLIENT',
      status: 'ACTIVE',
      cardCode: 'VM-2026-JO4P2',
      zipCode: '01311100',
      street: 'Av Paulista',
      number: '800',
      neighborhood: 'Bela Vista',
      city: 'Sao Paulo',
      state: 'SP',
      birthDate: new Date('1988-11-23'),
    },
  });

  const joaoSub = await prisma.subscription.create({
    data: {
      userId: joao.id,
      planId: plan.id,
      type: 'RECURRING',
      status: 'ACTIVE',
      startDate: daysAgo(60),
      endDate: daysFromNow(10),
      nextBillingDate: daysFromNow(10),
    },
  });

  await prisma.payment.createMany({
    data: [
      { userId: joao.id, subscriptionId: joaoSub.id, amount: 990, status: 'CONFIRMED', method: 'CREDIT_CARD', paidAt: daysAgo(60) },
      { userId: joao.id, subscriptionId: joaoSub.id, amount: 1990, status: 'CONFIRMED', method: 'CREDIT_CARD', paidAt: daysAgo(30) },
    ],
  });

  console.log(`  ✓ ${joao.name} (${joao.email}) - Plano ATIVO, 2 pagamentos`);

  // --- Cliente 3: Ana Paula (plano EXPIRADO - precisa renovar) ---
  const ana = await prisma.user.create({
    data: {
      name: 'Ana Paula Costa',
      email: 'ana@teste.com.br',
      cpf: '33344455566',
      phone: '11933332222',
      password: clientPassword,
      role: 'CLIENT',
      status: 'ACTIVE',
      cardCode: 'VM-2026-AN8L5',
      zipCode: '01311200',
      street: 'Rua Oscar Freire',
      number: '600',
      neighborhood: 'Jardins',
      city: 'Sao Paulo',
      state: 'SP',
      birthDate: new Date('1995-03-08'),
    },
  });

  const anaSub = await prisma.subscription.create({
    data: {
      userId: ana.id,
      planId: plan.id,
      type: 'RECURRING',
      status: 'EXPIRED',
      startDate: daysAgo(60),
      endDate: daysAgo(5), // expirou ha 5 dias
    },
  });

  await prisma.payment.createMany({
    data: [
      { userId: ana.id, subscriptionId: anaSub.id, amount: 990, status: 'CONFIRMED', method: 'PIX', paidAt: daysAgo(60) },
      { userId: ana.id, subscriptionId: anaSub.id, amount: 1990, status: 'CONFIRMED', method: 'PIX', paidAt: daysAgo(30) },
    ],
  });

  console.log(`  ✓ ${ana.name} (${ana.email}) - Plano EXPIRADO (precisa renovar)`);

  // --- Cliente 4: Pedro Lima (ativo, recente) ---
  const pedro = await prisma.user.create({
    data: {
      name: 'Pedro Lima',
      email: 'pedro@teste.com.br',
      cpf: '44455566677',
      phone: '11922221111',
      password: clientPassword,
      role: 'CLIENT',
      status: 'ACTIVE',
      cardCode: 'VM-2026-PD3X7',
      city: 'Sao Paulo',
      state: 'SP',
      birthDate: new Date('2000-07-20'),
    },
  });

  const pedroSub = await prisma.subscription.create({
    data: {
      userId: pedro.id,
      planId: plan.id,
      type: 'ONE_TIME',
      status: 'ACTIVE',
      startDate: daysAgo(10),
      endDate: daysFromNow(20),
    },
  });

  await prisma.payment.create({
    data: {
      userId: pedro.id,
      subscriptionId: pedroSub.id,
      amount: 1990,
      status: 'CONFIRMED',
      method: 'BOLETO',
      paidAt: daysAgo(10),
    },
  });

  console.log(`  ✓ ${pedro.name} (${pedro.email}) - Plano ATIVO, pagamento recente`);

  // --- Cliente 5: Fernanda Silva (ativo, 1 mes) ---
  const fernanda = await prisma.user.create({
    data: {
      name: 'Fernanda Silva',
      email: 'fernanda@teste.com.br',
      cpf: '55566677788',
      phone: '11911110000',
      password: clientPassword,
      role: 'CLIENT',
      status: 'ACTIVE',
      cardCode: 'VM-2026-FN9W2',
      zipCode: '01311300',
      street: 'Rua Haddock Lobo',
      number: '400',
      neighborhood: 'Cerqueira Cesar',
      city: 'Sao Paulo',
      state: 'SP',
      birthDate: new Date('1990-12-01'),
    },
  });

  const fernandaSub = await prisma.subscription.create({
    data: {
      userId: fernanda.id,
      planId: plan.id,
      type: 'RECURRING',
      status: 'ACTIVE',
      startDate: daysAgo(25),
      endDate: daysFromNow(5),
      nextBillingDate: daysFromNow(5),
    },
  });

  await prisma.payment.create({
    data: {
      userId: fernanda.id,
      subscriptionId: fernandaSub.id,
      amount: 990,
      status: 'CONFIRMED',
      method: 'PIX',
      paidAt: daysAgo(25),
    },
  });

  console.log(`  ✓ ${fernanda.name} (${fernanda.email}) - Plano ATIVO, 1 pagamento`);
  console.log(`  Total: 5 clientes\n`);

  // ============ 5. VALIDACOES (historico realista) ============
  console.log('5. Criando Historico de Validacoes...');

  const validations = [
    // Maria - 8 validacoes em diferentes parceiros
    { userId: maria.id, partnerId: partners['PSABORCASEIRO2026'].id, status: 'VALID' as const, validatedAt: daysAgo(85) },
    { userId: maria.id, partnerId: partners['PSAUDETOTAL2026'].id, status: 'VALID' as const, validatedAt: daysAgo(75) },
    { userId: maria.id, partnerId: partners['PBELLAHAIR2026'].id, status: 'VALID' as const, validatedAt: daysAgo(60) },
    { userId: maria.id, partnerId: partners['PDONMARIO2026'].id, status: 'VALID' as const, validatedAt: daysAgo(45) },
    { userId: maria.id, partnerId: partners['PSABORCASEIRO2026'].id, status: 'VALID' as const, validatedAt: daysAgo(30) },
    { userId: maria.id, partnerId: partners['PIRONFIT2026'].id, status: 'VALID' as const, validatedAt: daysAgo(15) },
    { userId: maria.id, partnerId: partners['PAMIGOFIEL2026'].id, status: 'VALID' as const, validatedAt: daysAgo(7) },
    { userId: maria.id, partnerId: partners['PPAOQUENTE2026'].id, status: 'VALID' as const, validatedAt: daysAgo(2) },

    // Joao - 5 validacoes
    { userId: joao.id, partnerId: partners['PIRONFIT2026'].id, status: 'VALID' as const, validatedAt: daysAgo(55) },
    { userId: joao.id, partnerId: partners['PSABORCASEIRO2026'].id, status: 'VALID' as const, validatedAt: daysAgo(40) },
    { userId: joao.id, partnerId: partners['PAUTOCENTER2026'].id, status: 'VALID' as const, validatedAt: daysAgo(25) },
    { userId: joao.id, partnerId: partners['PDONMARIO2026'].id, status: 'VALID' as const, validatedAt: daysAgo(12) },
    { userId: joao.id, partnerId: partners['PCLASSIC2026'].id, status: 'VALID' as const, validatedAt: daysAgo(3) },

    // Ana Paula - 4 validacoes (antes de expirar) + 1 tentativa invalida
    { userId: ana.id, partnerId: partners['PBELLAHAIR2026'].id, status: 'VALID' as const, validatedAt: daysAgo(50) },
    { userId: ana.id, partnerId: partners['PSAUDETOTAL2026'].id, status: 'VALID' as const, validatedAt: daysAgo(35) },
    { userId: ana.id, partnerId: partners['PPILATESVIDA2026'].id, status: 'VALID' as const, validatedAt: daysAgo(20) },
    { userId: ana.id, partnerId: partners['PGLOBALIDIOMAS2026'].id, status: 'VALID' as const, validatedAt: daysAgo(8) },
    { userId: ana.id, partnerId: partners['PSABORCASEIRO2026'].id, status: 'INVALID' as const, validatedAt: daysAgo(3), reason: 'SUBSCRIPTION_EXPIRED' },

    // Pedro - 2 validacoes (recente)
    { userId: pedro.id, partnerId: partners['PSABORCASEIRO2026'].id, status: 'VALID' as const, validatedAt: daysAgo(8) },
    { userId: pedro.id, partnerId: partners['PBEMESTAR2026'].id, status: 'VALID' as const, validatedAt: daysAgo(4) },

    // Fernanda - 3 validacoes
    { userId: fernanda.id, partnerId: partners['PBELLAHAIR2026'].id, status: 'VALID' as const, validatedAt: daysAgo(20) },
    { userId: fernanda.id, partnerId: partners['PAMIGOFIEL2026'].id, status: 'VALID' as const, validatedAt: daysAgo(10) },
    { userId: fernanda.id, partnerId: partners['PDONMARIO2026'].id, status: 'VALID' as const, validatedAt: daysAgo(1) },
  ];

  const usedCodes = new Set<string>();
  for (const v of validations) {
    let code = genValCode();
    while (usedCodes.has(code)) code = genValCode();
    usedCodes.add(code);

    await prisma.validation.create({
      data: {
        userId: v.userId,
        partnerId: v.partnerId,
        status: v.status,
        code,
        reason: (v as any).reason || null,
        validatedAt: v.validatedAt,
        ipAddress: '127.0.0.1',
        userAgent: 'Seed/1.0',
      },
    });
  }
  console.log(`  ✓ ${validations.length} validacoes criadas`);
  console.log(`    - ${validations.filter(v => v.status === 'VALID').length} validas`);
  console.log(`    - ${validations.filter(v => v.status === 'INVALID').length} invalidas\n`);

  // ============ RESUMO FINAL ============
  console.log('============================================');
  console.log('  SEED CONCLUIDO COM SUCESSO!');
  console.log('============================================\n');
  console.log('Credenciais de teste (senha padrao):');
  console.log('─────────────────────────────────────────');
  console.log('  ADMIN:');
  console.log('    admin@valemaisvantagens.com.br / Admin@123\n');
  console.log('  CLIENTES (senha: Cliente@123):');
  console.log('    cliente@teste.com.br   - Maria Santos  (ATIVO, 3 meses)');
  console.log('    joao@teste.com.br      - Joao Oliveira (ATIVO, 2 meses)');
  console.log('    ana@teste.com.br       - Ana Paula     (EXPIRADO)');
  console.log('    pedro@teste.com.br     - Pedro Lima    (ATIVO, recente)');
  console.log('    fernanda@teste.com.br  - Fernanda      (ATIVO, 1 mes)\n');
  console.log('  PARCEIROS (senha: Parceiro@123):');
  console.log('    parceiro@saborcaseiro.com.br     - Sabor Caseiro');
  console.log('    parceiro@donmario.com.br         - Don Mario');
  console.log('    parceiro@paoquente.com.br        - Pao Quente');
  console.log('    parceiro@saudetotal.com.br       - Saude Total');
  console.log('    parceiro@bemestar.com.br         - Clinica Bem Estar');
  console.log('    parceiro@bellahair.com.br        - Bella Hair');
  console.log('    parceiro@barbeariaclassic.com.br - Barbearia Classic');
  console.log('    parceiro@ironfit.com.br          - Iron Fit Academia');
  console.log('    parceiro@pilatesvida.com.br      - Pilates Vida');
  console.log('    parceiro@globalidiomas.com.br    - Global Idiomas');
  console.log('    parceiro@amigofiel.com.br        - Pet Shop Amigo Fiel');
  console.log('    parceiro@autocenter.com.br       - Auto Center Express\n');
  console.log('  QR CODE URLs para teste:');
  console.log('    /validar/PSABORCASEIRO2026');
  console.log('    /validar/PDONMARIO2026');
  console.log('    /validar/PBELLAHAIR2026');
  console.log('    /validar/PSAUDETOTAL2026');
  console.log('    /validar/PIRONFIT2026');
  console.log('    /validar/PGLOBALIDIOMAS2026');
  console.log('    /validar/PAMIGOFIEL2026');
  console.log('    /validar/PAUTOCENTER2026');
  console.log('─────────────────────────────────────────\n');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
