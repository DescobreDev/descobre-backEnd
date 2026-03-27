import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

const BENEFITS = [
  "Vale Refeição",
  "Vale Alimentação",
  "Plano de Saúde",
  "Plano Odontológico",
  "Vale Transporte",
  "Gympass",
  "Day off no aniversário",
  "Home Office",
  "PLR",
  "Seguro de Vida",
  "Auxílio Creche",
  "Previdência Privada",
  "Auxílio Educação",
  "Participação nos Lucros",
  "Bônus por Performance",
  "Flexibilidade de Horário",
  "Licença Maternidade/Paternidade Estendida",
  "Auxílio Psicológico",
  "Stock Options",
  "Vale Cultura",
];

async function main() {
  // Planos
  await prisma.plan.createMany({
    data: [
      {
        name: 'Starter',
        description: 'Ideal para pequenas empresas que estão começando.',
        price: 9.00,
        maxJobs: 5,
        maxAiResume: 10,
        maxAiSalary: 10,
        maxInterviews: 5,
        recommended: false,
      },
      {
        name: 'Basic',
        description: 'Ideal para empresas de porte médio.',
        price: 299.00,
        maxJobs: 70,
        maxAiResume: 45,
        maxAiSalary: 45,
        maxInterviews: 70,
        recommended: true,
      },
      {
        name: 'Ouro',
        description: 'Plano ideal para quem possui grandes corporações.',
        price: 499.00,
        maxJobs: 300,
        maxAiResume: 100,
        maxAiSalary: 100,
        maxInterviews: 300,
        recommended: false,
      },
    ],
    skipDuplicates: true,
  });


  console.log('✅ Planos criados!');


  const sector_0 = await prisma.sector.upsert({
    where: { name: 'Academias' },
    update: {},
    create: { name: 'Academias' },
  })

  await prisma.position.upsert({
    where: { name: 'Recepcionista de Academia' },
    update: {},
    create: { name: 'Recepcionista de Academia', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Instrutor de Musculação' },
    update: {},
    create: { name: 'Instrutor de Musculação', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Professor de Educação Física' },
    update: {},
    create: { name: 'Professor de Educação Física', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Personal Trainer' },
    update: {},
    create: { name: 'Personal Trainer', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador Técnico' },
    update: {},
    create: { name: 'Coordenador Técnico', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Academia' },
    update: {},
    create: { name: 'Gerente de Academia', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar de Limpeza' },
    update: {},
    create: { name: 'Auxiliar de Limpeza', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Consultor de Vendas' },
    update: {},
    create: { name: 'Consultor de Vendas', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Supervisor de Atendimento' },
    update: {},
    create: { name: 'Supervisor de Atendimento', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Nutricionista Esportivo' },
    update: {},
    create: { name: 'Nutricionista Esportivo', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Fisioterapeuta Esportivo' },
    update: {},
    create: { name: 'Fisioterapeuta Esportivo', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Estagiário de Educação Física' },
    update: {},
    create: { name: 'Estagiário de Educação Física', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Instrutor de Alongamento' },
    update: {},
    create: { name: 'Instrutor de Alongamento', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Instrutor de Ginástica' },
    update: {},
    create: { name: 'Instrutor de Ginástica', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Instrutor de Spinning' },
    update: {},
    create: { name: 'Instrutor de Spinning', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Instrutor de Pilates' },
    update: {},
    create: { name: 'Instrutor de Pilates', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Instrutor de Natação' },
    update: {},
    create: { name: 'Instrutor de Natação', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Instrutor de Crossfit' },
    update: {},
    create: { name: 'Instrutor de Crossfit', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Consultor de Emagrecimento' },
    update: {},
    create: { name: 'Consultor de Emagrecimento', sectorId: sector_0.id },
  })
  await prisma.position.upsert({
    where: { name: 'Marketing de Academia' },
    update: {},
    create: { name: 'Marketing de Academia', sectorId: sector_0.id },
  })

  const sector_1 = await prisma.sector.upsert({
    where: { name: 'Administrativo' },
    update: {},
    create: { name: 'Administrativo' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário Administrativo' },
    update: {},
    create: { name: 'Estagiário Administrativo', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar Administrativo' },
    update: {},
    create: { name: 'Auxiliar Administrativo', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente Administrativo' },
    update: {},
    create: { name: 'Assistente Administrativo', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista Administrativo Júnior' },
    update: {},
    create: { name: 'Analista Administrativo Júnior', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista Administrativo Pleno' },
    update: {},
    create: { name: 'Analista Administrativo Pleno', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista Administrativo Sênior' },
    update: {},
    create: { name: 'Analista Administrativo Sênior', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Secretária' },
    update: {},
    create: { name: 'Secretária', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Secretária Executiva' },
    update: {},
    create: { name: 'Secretária Executiva', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Recepcionista' },
    update: {},
    create: { name: 'Recepcionista', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar de Escritório' },
    update: {},
    create: { name: 'Auxiliar de Escritório', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Supervisor Administrativo' },
    update: {},
    create: { name: 'Supervisor Administrativo', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador Administrativo' },
    update: {},
    create: { name: 'Coordenador Administrativo', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente Administrativo' },
    update: {},
    create: { name: 'Gerente Administrativo', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Diretor Administrativo' },
    update: {},
    create: { name: 'Diretor Administrativo', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Diretoria' },
    update: {},
    create: { name: 'Assistente de Diretoria', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar de Arquivo' },
    update: {},
    create: { name: 'Auxiliar de Arquivo', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Controlador de Documentos' },
    update: {},
    create: { name: 'Controlador de Documentos', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Digitador' },
    update: {},
    create: { name: 'Digitador', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Protocolista' },
    update: {},
    create: { name: 'Protocolista', sectorId: sector_1.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar de Apoio Administrativo' },
    update: {},
    create: { name: 'Auxiliar de Apoio Administrativo', sectorId: sector_1.id },
  })

  const sector_2 = await prisma.sector.upsert({
    where: { name: 'Administração de Contratos' },
    update: {},
    create: { name: 'Administração de Contratos' },
  })

  await prisma.position.upsert({
    where: { name: 'Auxiliar de Contratos' },
    update: {},
    create: { name: 'Auxiliar de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Contratos' },
    update: {},
    create: { name: 'Assistente de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Contratos' },
    update: {},
    create: { name: 'Analista de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista Jurídico de Contratos' },
    update: {},
    create: { name: 'Analista Jurídico de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Especialista em Contratos' },
    update: {},
    create: { name: 'Especialista em Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Contratos' },
    update: {},
    create: { name: 'Coordenador de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Supervisor de Contratos' },
    update: {},
    create: { name: 'Supervisor de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Contratos' },
    update: {},
    create: { name: 'Gerente de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gestor de Contratos' },
    update: {},
    create: { name: 'Gestor de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Consultor de Contratos' },
    update: {},
    create: { name: 'Consultor de Contratos', sectorId: sector_2.id },
  })
  await prisma.position.upsert({
    where: { name: 'Técnico de Contratos' },
    update: {},
    create: { name: 'Técnico de Contratos', sectorId: sector_2.id },
  })

  const sector_3 = await prisma.sector.upsert({
    where: { name: 'Advocacia Cível' },
    update: {},
    create: { name: 'Advocacia Cível' },
  })

  await prisma.position.upsert({
    where: { name: 'Advogado Cível' },
    update: {},
    create: { name: 'Advogado Cível', sectorId: sector_3.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente Jurídico Cível' },
    update: {},
    create: { name: 'Assistente Jurídico Cível', sectorId: sector_3.id },
  })
  await prisma.position.upsert({
    where: { name: 'Estagiário Jurídico Cível' },
    update: {},
    create: { name: 'Estagiário Jurídico Cível', sectorId: sector_3.id },
  })
  await prisma.position.upsert({
    where: { name: 'Paralegal Cível' },
    update: {},
    create: { name: 'Paralegal Cível', sectorId: sector_3.id },
  })
  await prisma.position.upsert({
    where: { name: 'Técnico Jurídico' },
    update: {},
    create: { name: 'Técnico Jurídico', sectorId: sector_3.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Processos Cíveis' },
    update: {},
    create: { name: 'Analista de Processos Cíveis', sectorId: sector_3.id },
  })
  await prisma.position.upsert({
    where: { name: 'Consultor Jurídico Cível' },
    update: {},
    create: { name: 'Consultor Jurídico Cível', sectorId: sector_3.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador Jurídico Cível' },
    update: {},
    create: { name: 'Coordenador Jurídico Cível', sectorId: sector_3.id },
  })

  const sector_4 = await prisma.sector.upsert({
    where: { name: 'Advocacia Trabalhista' },
    update: {},
    create: { name: 'Advocacia Trabalhista' },
  })

  await prisma.position.upsert({
    where: { name: 'Advogado Trabalhista' },
    update: {},
    create: { name: 'Advogado Trabalhista', sectorId: sector_4.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente Jurídico Trabalhista' },
    update: {},
    create: { name: 'Assistente Jurídico Trabalhista', sectorId: sector_4.id },
  })
  await prisma.position.upsert({
    where: { name: 'Estagiário Jurídico Trabalhista' },
    update: {},
    create: { name: 'Estagiário Jurídico Trabalhista', sectorId: sector_4.id },
  })
  await prisma.position.upsert({
    where: { name: 'Paralegal Trabalhista' },
    update: {},
    create: { name: 'Paralegal Trabalhista', sectorId: sector_4.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Processos Trabalhistas' },
    update: {},
    create: { name: 'Analista de Processos Trabalhistas', sectorId: sector_4.id },
  })
  await prisma.position.upsert({
    where: { name: 'Consultor Jurídico Trabalhista' },
    update: {},
    create: { name: 'Consultor Jurídico Trabalhista', sectorId: sector_4.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador Jurídico Trabalhista' },
    update: {},
    create: { name: 'Coordenador Jurídico Trabalhista', sectorId: sector_4.id },
  })

  const sector_5 = await prisma.sector.upsert({
    where: { name: 'Advocacia Tributária' },
    update: {},
    create: { name: 'Advocacia Tributária' },
  })

  await prisma.position.upsert({
    where: { name: 'Advogado Tributário' },
    update: {},
    create: { name: 'Advogado Tributário', sectorId: sector_5.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista Fiscal Tributário' },
    update: {},
    create: { name: 'Analista Fiscal Tributário', sectorId: sector_5.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente Jurídico Tributário' },
    update: {},
    create: { name: 'Assistente Jurídico Tributário', sectorId: sector_5.id },
  })
  await prisma.position.upsert({
    where: { name: 'Consultor Tributário' },
    update: {},
    create: { name: 'Consultor Tributário', sectorId: sector_5.id },
  })
  await prisma.position.upsert({
    where: { name: 'Especialista Tributário' },
    update: {},
    create: { name: 'Especialista Tributário', sectorId: sector_5.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador Jurídico Tributário' },
    update: {},
    create: { name: 'Coordenador Jurídico Tributário', sectorId: sector_5.id },
  })

  const sector_6 = await prisma.sector.upsert({
    where: { name: 'Agroindústria' },
    update: {},
    create: { name: 'Agroindústria' },
  })

  await prisma.position.upsert({
    where: { name: 'Operador de Agroindústria' },
    update: {},
    create: { name: 'Operador de Agroindústria', sectorId: sector_6.id },
  })
  await prisma.position.upsert({
    where: { name: 'Técnico em Agroindústria' },
    update: {},
    create: { name: 'Técnico em Agroindústria', sectorId: sector_6.id },
  })
  await prisma.position.upsert({
    where: { name: 'Supervisor de Produção Agroindustrial' },
    update: {},
    create: { name: 'Supervisor de Produção Agroindustrial', sectorId: sector_6.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Qualidade Agroindustrial' },
    update: {},
    create: { name: 'Analista de Qualidade Agroindustrial', sectorId: sector_6.id },
  })
  await prisma.position.upsert({
    where: { name: 'Engenheiro de Alimentos' },
    update: {},
    create: { name: 'Engenheiro de Alimentos', sectorId: sector_6.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar de Produção Agroindustrial' },
    update: {},
    create: { name: 'Auxiliar de Produção Agroindustrial', sectorId: sector_6.id },
  })

  const sector_7 = await prisma.sector.upsert({
    where: { name: 'Agronegócio' },
    update: {},
    create: { name: 'Agronegócio' },
  })

  await prisma.position.upsert({
    where: { name: 'Gestor de Agronegócio' },
    update: {},
    create: { name: 'Gestor de Agronegócio', sectorId: sector_7.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Agronegócio' },
    update: {},
    create: { name: 'Analista de Agronegócio', sectorId: sector_7.id },
  })
  await prisma.position.upsert({
    where: { name: 'Consultor de Agronegócio' },
    update: {},
    create: { name: 'Consultor de Agronegócio', sectorId: sector_7.id },
  })
  await prisma.position.upsert({
    where: { name: 'Engenheiro Agrônomo' },
    update: {},
    create: { name: 'Engenheiro Agrônomo', sectorId: sector_7.id },
  })
  await prisma.position.upsert({
    where: { name: 'Técnico Agrícola' },
    update: {},
    create: { name: 'Técnico Agrícola', sectorId: sector_7.id },
  })
  await prisma.position.upsert({
    where: { name: 'Representante Técnico Comercial' },
    update: {},
    create: { name: 'Representante Técnico Comercial', sectorId: sector_7.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Fazenda' },
    update: {},
    create: { name: 'Gerente de Fazenda', sectorId: sector_7.id },
  })
  await prisma.position.upsert({
    where: { name: 'Supervisor Agrícola' },
    update: {},
    create: { name: 'Supervisor Agrícola', sectorId: sector_7.id },
  })

  const sector_8 = await prisma.sector.upsert({
    where: { name: 'Ajudante de Carga' },
    update: {},
    create: { name: 'Ajudante de Carga' },
  })

  await prisma.position.upsert({
    where: { name: 'Ajudante de Carga e Descarga' },
    update: {},
    create: { name: 'Ajudante de Carga e Descarga', sectorId: sector_8.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar de Logística' },
    update: {},
    create: { name: 'Auxiliar de Logística', sectorId: sector_8.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Armazém' },
    update: {},
    create: { name: 'Assistente de Armazém', sectorId: sector_8.id },
  })
  await prisma.position.upsert({
    where: { name: 'Operador de Paleteira' },
    update: {},
    create: { name: 'Operador de Paleteira', sectorId: sector_8.id },
  })
  await prisma.position.upsert({
    where: { name: 'Conferente de Carga' },
    update: {},
    create: { name: 'Conferente de Carga', sectorId: sector_8.id },
  })
  await prisma.position.upsert({
    where: { name: 'Líder de Carga' },
    update: {},
    create: { name: 'Líder de Carga', sectorId: sector_8.id },
  })

  const sector_9 = await prisma.sector.upsert({
    where: { name: 'Ajudante de Cozinha' },
    update: {},
    create: { name: 'Ajudante de Cozinha' },
  })

  await prisma.position.upsert({
    where: { name: 'Ajudante de Cozinha' },
    update: {},
    create: { name: 'Ajudante de Cozinha', sectorId: sector_9.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar de Cozinha' },
    update: {},
    create: { name: 'Auxiliar de Cozinha', sectorId: sector_9.id },
  })
  await prisma.position.upsert({
    where: { name: 'Auxiliar de Limpeza de Cozinha' },
    update: {},
    create: { name: 'Auxiliar de Limpeza de Cozinha', sectorId: sector_9.id },
  })
  await prisma.position.upsert({
    where: { name: 'Preparador de Alimentos' },
    update: {},
    create: { name: 'Preparador de Alimentos', sectorId: sector_9.id },
  })
  await prisma.position.upsert({
    where: { name: 'Higienizador de Utensílios' },
    update: {},
    create: { name: 'Higienizador de Utensílios', sectorId: sector_9.id },
  })
  await prisma.position.upsert({
    where: { name: 'Ajudante Geral de Cozinha' },
    update: {},
    create: { name: 'Ajudante Geral de Cozinha', sectorId: sector_9.id },
  })

  const sector_10 = await prisma.sector.upsert({
    where: { name: 'Alimentos e Bebidas' },
    update: {},
    create: { name: 'Alimentos e Bebidas' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Alimentos e Bebidas' },
    update: {},
    create: { name: 'Estagiário de Alimentos e Bebidas', sectorId: sector_10.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Alimentos e Bebidas' },
    update: {},
    create: { name: 'Assistente de Alimentos e Bebidas', sectorId: sector_10.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Alimentos e Bebidas' },
    update: {},
    create: { name: 'Analista de Alimentos e Bebidas', sectorId: sector_10.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Alimentos e Bebidas' },
    update: {},
    create: { name: 'Coordenador de Alimentos e Bebidas', sectorId: sector_10.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Alimentos e Bebidas' },
    update: {},
    create: { name: 'Gerente de Alimentos e Bebidas', sectorId: sector_10.id },
  })

  const sector_11 = await prisma.sector.upsert({
    where: { name: 'Analytics' },
    update: {},
    create: { name: 'Analytics' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Analytics' },
    update: {},
    create: { name: 'Estagiário de Analytics', sectorId: sector_11.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Analytics' },
    update: {},
    create: { name: 'Assistente de Analytics', sectorId: sector_11.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Analytics' },
    update: {},
    create: { name: 'Analista de Analytics', sectorId: sector_11.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Analytics' },
    update: {},
    create: { name: 'Coordenador de Analytics', sectorId: sector_11.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Analytics' },
    update: {},
    create: { name: 'Gerente de Analytics', sectorId: sector_11.id },
  })

  const sector_12 = await prisma.sector.upsert({
    where: { name: 'Arquitetura' },
    update: {},
    create: { name: 'Arquitetura' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Arquitetura' },
    update: {},
    create: { name: 'Estagiário de Arquitetura', sectorId: sector_12.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Arquitetura' },
    update: {},
    create: { name: 'Assistente de Arquitetura', sectorId: sector_12.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Arquitetura' },
    update: {},
    create: { name: 'Analista de Arquitetura', sectorId: sector_12.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Arquitetura' },
    update: {},
    create: { name: 'Coordenador de Arquitetura', sectorId: sector_12.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Arquitetura' },
    update: {},
    create: { name: 'Gerente de Arquitetura', sectorId: sector_12.id },
  })

  const sector_13 = await prisma.sector.upsert({
    where: { name: 'Arquitetura de Interiores' },
    update: {},
    create: { name: 'Arquitetura de Interiores' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Arquitetura de Interiores' },
    update: {},
    create: { name: 'Estagiário de Arquitetura de Interiores', sectorId: sector_13.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Arquitetura de Interiores' },
    update: {},
    create: { name: 'Assistente de Arquitetura de Interiores', sectorId: sector_13.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Arquitetura de Interiores' },
    update: {},
    create: { name: 'Analista de Arquitetura de Interiores', sectorId: sector_13.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Arquitetura de Interiores' },
    update: {},
    create: { name: 'Coordenador de Arquitetura de Interiores', sectorId: sector_13.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Arquitetura de Interiores' },
    update: {},
    create: { name: 'Gerente de Arquitetura de Interiores', sectorId: sector_13.id },
  })

  const sector_14 = await prisma.sector.upsert({
    where: { name: 'Assessoria de Imprensa' },
    update: {},
    create: { name: 'Assessoria de Imprensa' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Assessoria de Imprensa' },
    update: {},
    create: { name: 'Estagiário de Assessoria de Imprensa', sectorId: sector_14.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Assessoria de Imprensa' },
    update: {},
    create: { name: 'Assistente de Assessoria de Imprensa', sectorId: sector_14.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Assessoria de Imprensa' },
    update: {},
    create: { name: 'Analista de Assessoria de Imprensa', sectorId: sector_14.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Assessoria de Imprensa' },
    update: {},
    create: { name: 'Coordenador de Assessoria de Imprensa', sectorId: sector_14.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Assessoria de Imprensa' },
    update: {},
    create: { name: 'Gerente de Assessoria de Imprensa', sectorId: sector_14.id },
  })

  const sector_15 = await prisma.sector.upsert({
    where: { name: 'Assistência Social' },
    update: {},
    create: { name: 'Assistência Social' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Assistência Social' },
    update: {},
    create: { name: 'Estagiário de Assistência Social', sectorId: sector_15.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Assistência Social' },
    update: {},
    create: { name: 'Assistente de Assistência Social', sectorId: sector_15.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Assistência Social' },
    update: {},
    create: { name: 'Analista de Assistência Social', sectorId: sector_15.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Assistência Social' },
    update: {},
    create: { name: 'Coordenador de Assistência Social', sectorId: sector_15.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Assistência Social' },
    update: {},
    create: { name: 'Gerente de Assistência Social', sectorId: sector_15.id },
  })

  const sector_16 = await prisma.sector.upsert({
    where: { name: 'Atacado' },
    update: {},
    create: { name: 'Atacado' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Atacado' },
    update: {},
    create: { name: 'Estagiário de Atacado', sectorId: sector_16.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Atacado' },
    update: {},
    create: { name: 'Assistente de Atacado', sectorId: sector_16.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Atacado' },
    update: {},
    create: { name: 'Analista de Atacado', sectorId: sector_16.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Atacado' },
    update: {},
    create: { name: 'Coordenador de Atacado', sectorId: sector_16.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Atacado' },
    update: {},
    create: { name: 'Gerente de Atacado', sectorId: sector_16.id },
  })

  const sector_17 = await prisma.sector.upsert({
    where: { name: 'Atendimento' },
    update: {},
    create: { name: 'Atendimento' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Atendimento' },
    update: {},
    create: { name: 'Estagiário de Atendimento', sectorId: sector_17.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Atendimento' },
    update: {},
    create: { name: 'Assistente de Atendimento', sectorId: sector_17.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Atendimento' },
    update: {},
    create: { name: 'Analista de Atendimento', sectorId: sector_17.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Atendimento' },
    update: {},
    create: { name: 'Coordenador de Atendimento', sectorId: sector_17.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Atendimento' },
    update: {},
    create: { name: 'Gerente de Atendimento', sectorId: sector_17.id },
  })

  const sector_18 = await prisma.sector.upsert({
    where: { name: 'Atendimento Hospitalar' },
    update: {},
    create: { name: 'Atendimento Hospitalar' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Atendimento Hospitalar' },
    update: {},
    create: { name: 'Estagiário de Atendimento Hospitalar', sectorId: sector_18.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Atendimento Hospitalar' },
    update: {},
    create: { name: 'Assistente de Atendimento Hospitalar', sectorId: sector_18.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Atendimento Hospitalar' },
    update: {},
    create: { name: 'Analista de Atendimento Hospitalar', sectorId: sector_18.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Atendimento Hospitalar' },
    update: {},
    create: { name: 'Coordenador de Atendimento Hospitalar', sectorId: sector_18.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Atendimento Hospitalar' },
    update: {},
    create: { name: 'Gerente de Atendimento Hospitalar', sectorId: sector_18.id },
  })

  const sector_19 = await prisma.sector.upsert({
    where: { name: 'Atendimento em Restaurante' },
    update: {},
    create: { name: 'Atendimento em Restaurante' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Atendimento em Restaurante' },
    update: {},
    create: { name: 'Estagiário de Atendimento em Restaurante', sectorId: sector_19.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Atendimento em Restaurante' },
    update: {},
    create: { name: 'Assistente de Atendimento em Restaurante', sectorId: sector_19.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Atendimento em Restaurante' },
    update: {},
    create: { name: 'Analista de Atendimento em Restaurante', sectorId: sector_19.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Atendimento em Restaurante' },
    update: {},
    create: { name: 'Coordenador de Atendimento em Restaurante', sectorId: sector_19.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Atendimento em Restaurante' },
    update: {},
    create: { name: 'Gerente de Atendimento em Restaurante', sectorId: sector_19.id },
  })

  const sector_20 = await prisma.sector.upsert({
    where: { name: 'Auditoria' },
    update: {},
    create: { name: 'Auditoria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Auditoria' },
    update: {},
    create: { name: 'Estagiário de Auditoria', sectorId: sector_20.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Auditoria' },
    update: {},
    create: { name: 'Assistente de Auditoria', sectorId: sector_20.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Auditoria' },
    update: {},
    create: { name: 'Analista de Auditoria', sectorId: sector_20.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Auditoria' },
    update: {},
    create: { name: 'Coordenador de Auditoria', sectorId: sector_20.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Auditoria' },
    update: {},
    create: { name: 'Gerente de Auditoria', sectorId: sector_20.id },
  })

  const sector_21 = await prisma.sector.upsert({
    where: { name: 'Auxiliar de Limpeza de Cozinha' },
    update: {},
    create: { name: 'Auxiliar de Limpeza de Cozinha' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Auxiliar de Limpeza de Cozinha' },
    update: {},
    create: { name: 'Estagiário de Auxiliar de Limpeza de Cozinha', sectorId: sector_21.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Auxiliar de Limpeza de Cozinha' },
    update: {},
    create: { name: 'Assistente de Auxiliar de Limpeza de Cozinha', sectorId: sector_21.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Auxiliar de Limpeza de Cozinha' },
    update: {},
    create: { name: 'Analista de Auxiliar de Limpeza de Cozinha', sectorId: sector_21.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Auxiliar de Limpeza de Cozinha' },
    update: {},
    create: { name: 'Coordenador de Auxiliar de Limpeza de Cozinha', sectorId: sector_21.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Auxiliar de Limpeza de Cozinha' },
    update: {},
    create: { name: 'Gerente de Auxiliar de Limpeza de Cozinha', sectorId: sector_21.id },
  })

  const sector_22 = await prisma.sector.upsert({
    where: { name: 'BI (Business Intelligence)' },
    update: {},
    create: { name: 'BI (Business Intelligence)' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de BI (Business Intelligence)' },
    update: {},
    create: { name: 'Estagiário de BI (Business Intelligence)', sectorId: sector_22.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de BI (Business Intelligence)' },
    update: {},
    create: { name: 'Assistente de BI (Business Intelligence)', sectorId: sector_22.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de BI (Business Intelligence)' },
    update: {},
    create: { name: 'Analista de BI (Business Intelligence)', sectorId: sector_22.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de BI (Business Intelligence)' },
    update: {},
    create: { name: 'Coordenador de BI (Business Intelligence)', sectorId: sector_22.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de BI (Business Intelligence)' },
    update: {},
    create: { name: 'Gerente de BI (Business Intelligence)', sectorId: sector_22.id },
  })

  const sector_23 = await prisma.sector.upsert({
    where: { name: 'Barbearia' },
    update: {},
    create: { name: 'Barbearia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Barbearia' },
    update: {},
    create: { name: 'Estagiário de Barbearia', sectorId: sector_23.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Barbearia' },
    update: {},
    create: { name: 'Assistente de Barbearia', sectorId: sector_23.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Barbearia' },
    update: {},
    create: { name: 'Analista de Barbearia', sectorId: sector_23.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Barbearia' },
    update: {},
    create: { name: 'Coordenador de Barbearia', sectorId: sector_23.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Barbearia' },
    update: {},
    create: { name: 'Gerente de Barbearia', sectorId: sector_23.id },
  })

  const sector_24 = await prisma.sector.upsert({
    where: { name: 'Barista' },
    update: {},
    create: { name: 'Barista' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Barista' },
    update: {},
    create: { name: 'Estagiário de Barista', sectorId: sector_24.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Barista' },
    update: {},
    create: { name: 'Assistente de Barista', sectorId: sector_24.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Barista' },
    update: {},
    create: { name: 'Analista de Barista', sectorId: sector_24.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Barista' },
    update: {},
    create: { name: 'Coordenador de Barista', sectorId: sector_24.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Barista' },
    update: {},
    create: { name: 'Gerente de Barista', sectorId: sector_24.id },
  })

  const sector_25 = await prisma.sector.upsert({
    where: { name: 'Barman' },
    update: {},
    create: { name: 'Barman' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Barman' },
    update: {},
    create: { name: 'Estagiário de Barman', sectorId: sector_25.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Barman' },
    update: {},
    create: { name: 'Assistente de Barman', sectorId: sector_25.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Barman' },
    update: {},
    create: { name: 'Analista de Barman', sectorId: sector_25.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Barman' },
    update: {},
    create: { name: 'Coordenador de Barman', sectorId: sector_25.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Barman' },
    update: {},
    create: { name: 'Gerente de Barman', sectorId: sector_25.id },
  })

  const sector_26 = await prisma.sector.upsert({
    where: { name: 'Beleza e Estética' },
    update: {},
    create: { name: 'Beleza e Estética' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Beleza e Estética' },
    update: {},
    create: { name: 'Estagiário de Beleza e Estética', sectorId: sector_26.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Beleza e Estética' },
    update: {},
    create: { name: 'Assistente de Beleza e Estética', sectorId: sector_26.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Beleza e Estética' },
    update: {},
    create: { name: 'Analista de Beleza e Estética', sectorId: sector_26.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Beleza e Estética' },
    update: {},
    create: { name: 'Coordenador de Beleza e Estética', sectorId: sector_26.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Beleza e Estética' },
    update: {},
    create: { name: 'Gerente de Beleza e Estética', sectorId: sector_26.id },
  })

  const sector_27 = await prisma.sector.upsert({
    where: { name: 'Biologia' },
    update: {},
    create: { name: 'Biologia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Biologia' },
    update: {},
    create: { name: 'Estagiário de Biologia', sectorId: sector_27.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Biologia' },
    update: {},
    create: { name: 'Assistente de Biologia', sectorId: sector_27.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Biologia' },
    update: {},
    create: { name: 'Analista de Biologia', sectorId: sector_27.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Biologia' },
    update: {},
    create: { name: 'Coordenador de Biologia', sectorId: sector_27.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Biologia' },
    update: {},
    create: { name: 'Gerente de Biologia', sectorId: sector_27.id },
  })

  const sector_28 = await prisma.sector.upsert({
    where: { name: 'Biotecnologia' },
    update: {},
    create: { name: 'Biotecnologia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Biotecnologia' },
    update: {},
    create: { name: 'Estagiário de Biotecnologia', sectorId: sector_28.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Biotecnologia' },
    update: {},
    create: { name: 'Assistente de Biotecnologia', sectorId: sector_28.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Biotecnologia' },
    update: {},
    create: { name: 'Analista de Biotecnologia', sectorId: sector_28.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Biotecnologia' },
    update: {},
    create: { name: 'Coordenador de Biotecnologia', sectorId: sector_28.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Biotecnologia' },
    update: {},
    create: { name: 'Gerente de Biotecnologia', sectorId: sector_28.id },
  })

  const sector_29 = await prisma.sector.upsert({
    where: { name: 'Business Partner' },
    update: {},
    create: { name: 'Business Partner' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Business Partner' },
    update: {},
    create: { name: 'Estagiário de Business Partner', sectorId: sector_29.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Business Partner' },
    update: {},
    create: { name: 'Assistente de Business Partner', sectorId: sector_29.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Business Partner' },
    update: {},
    create: { name: 'Analista de Business Partner', sectorId: sector_29.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Business Partner' },
    update: {},
    create: { name: 'Coordenador de Business Partner', sectorId: sector_29.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Business Partner' },
    update: {},
    create: { name: 'Gerente de Business Partner', sectorId: sector_29.id },
  })

  const sector_30 = await prisma.sector.upsert({
    where: { name: 'CRM' },
    update: {},
    create: { name: 'CRM' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de CRM' },
    update: {},
    create: { name: 'Estagiário de CRM', sectorId: sector_30.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de CRM' },
    update: {},
    create: { name: 'Assistente de CRM', sectorId: sector_30.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de CRM' },
    update: {},
    create: { name: 'Analista de CRM', sectorId: sector_30.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de CRM' },
    update: {},
    create: { name: 'Coordenador de CRM', sectorId: sector_30.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de CRM' },
    update: {},
    create: { name: 'Gerente de CRM', sectorId: sector_30.id },
  })

  const sector_31 = await prisma.sector.upsert({
    where: { name: 'Caixa de Restaurante' },
    update: {},
    create: { name: 'Caixa de Restaurante' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Caixa de Restaurante' },
    update: {},
    create: { name: 'Estagiário de Caixa de Restaurante', sectorId: sector_31.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Caixa de Restaurante' },
    update: {},
    create: { name: 'Assistente de Caixa de Restaurante', sectorId: sector_31.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Caixa de Restaurante' },
    update: {},
    create: { name: 'Analista de Caixa de Restaurante', sectorId: sector_31.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Caixa de Restaurante' },
    update: {},
    create: { name: 'Coordenador de Caixa de Restaurante', sectorId: sector_31.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Caixa de Restaurante' },
    update: {},
    create: { name: 'Gerente de Caixa de Restaurante', sectorId: sector_31.id },
  })

  const sector_32 = await prisma.sector.upsert({
    where: { name: 'Caldeiraria' },
    update: {},
    create: { name: 'Caldeiraria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Caldeiraria' },
    update: {},
    create: { name: 'Estagiário de Caldeiraria', sectorId: sector_32.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Caldeiraria' },
    update: {},
    create: { name: 'Assistente de Caldeiraria', sectorId: sector_32.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Caldeiraria' },
    update: {},
    create: { name: 'Analista de Caldeiraria', sectorId: sector_32.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Caldeiraria' },
    update: {},
    create: { name: 'Coordenador de Caldeiraria', sectorId: sector_32.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Caldeiraria' },
    update: {},
    create: { name: 'Gerente de Caldeiraria', sectorId: sector_32.id },
  })

  const sector_33 = await prisma.sector.upsert({
    where: { name: 'Call Center' },
    update: {},
    create: { name: 'Call Center' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Call Center' },
    update: {},
    create: { name: 'Estagiário de Call Center', sectorId: sector_33.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Call Center' },
    update: {},
    create: { name: 'Assistente de Call Center', sectorId: sector_33.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Call Center' },
    update: {},
    create: { name: 'Analista de Call Center', sectorId: sector_33.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Call Center' },
    update: {},
    create: { name: 'Coordenador de Call Center', sectorId: sector_33.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Call Center' },
    update: {},
    create: { name: 'Gerente de Call Center', sectorId: sector_33.id },
  })

  const sector_34 = await prisma.sector.upsert({
    where: { name: 'Captação de Recursos' },
    update: {},
    create: { name: 'Captação de Recursos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Captação de Recursos' },
    update: {},
    create: { name: 'Estagiário de Captação de Recursos', sectorId: sector_34.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Captação de Recursos' },
    update: {},
    create: { name: 'Assistente de Captação de Recursos', sectorId: sector_34.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Captação de Recursos' },
    update: {},
    create: { name: 'Analista de Captação de Recursos', sectorId: sector_34.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Captação de Recursos' },
    update: {},
    create: { name: 'Coordenador de Captação de Recursos', sectorId: sector_34.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Captação de Recursos' },
    update: {},
    create: { name: 'Gerente de Captação de Recursos', sectorId: sector_34.id },
  })

  const sector_35 = await prisma.sector.upsert({
    where: { name: 'Cartório' },
    update: {},
    create: { name: 'Cartório' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Cartório' },
    update: {},
    create: { name: 'Estagiário de Cartório', sectorId: sector_35.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Cartório' },
    update: {},
    create: { name: 'Assistente de Cartório', sectorId: sector_35.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Cartório' },
    update: {},
    create: { name: 'Analista de Cartório', sectorId: sector_35.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Cartório' },
    update: {},
    create: { name: 'Coordenador de Cartório', sectorId: sector_35.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Cartório' },
    update: {},
    create: { name: 'Gerente de Cartório', sectorId: sector_35.id },
  })

  const sector_36 = await prisma.sector.upsert({
    where: { name: 'Central de Materiais' },
    update: {},
    create: { name: 'Central de Materiais' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Central de Materiais' },
    update: {},
    create: { name: 'Estagiário de Central de Materiais', sectorId: sector_36.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Central de Materiais' },
    update: {},
    create: { name: 'Assistente de Central de Materiais', sectorId: sector_36.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Central de Materiais' },
    update: {},
    create: { name: 'Analista de Central de Materiais', sectorId: sector_36.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Central de Materiais' },
    update: {},
    create: { name: 'Coordenador de Central de Materiais', sectorId: sector_36.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Central de Materiais' },
    update: {},
    create: { name: 'Gerente de Central de Materiais', sectorId: sector_36.id },
  })

  const sector_37 = await prisma.sector.upsert({
    where: { name: 'Centro de Distribuição' },
    update: {},
    create: { name: 'Centro de Distribuição' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Centro de Distribuição' },
    update: {},
    create: { name: 'Estagiário de Centro de Distribuição', sectorId: sector_37.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Centro de Distribuição' },
    update: {},
    create: { name: 'Assistente de Centro de Distribuição', sectorId: sector_37.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Centro de Distribuição' },
    update: {},
    create: { name: 'Analista de Centro de Distribuição', sectorId: sector_37.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Centro de Distribuição' },
    update: {},
    create: { name: 'Coordenador de Centro de Distribuição', sectorId: sector_37.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Centro de Distribuição' },
    update: {},
    create: { name: 'Gerente de Centro de Distribuição', sectorId: sector_37.id },
  })

  const sector_38 = await prisma.sector.upsert({
    where: { name: 'Chapeiro' },
    update: {},
    create: { name: 'Chapeiro' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Chapeiro' },
    update: {},
    create: { name: 'Estagiário de Chapeiro', sectorId: sector_38.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Chapeiro' },
    update: {},
    create: { name: 'Assistente de Chapeiro', sectorId: sector_38.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Chapeiro' },
    update: {},
    create: { name: 'Analista de Chapeiro', sectorId: sector_38.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Chapeiro' },
    update: {},
    create: { name: 'Coordenador de Chapeiro', sectorId: sector_38.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Chapeiro' },
    update: {},
    create: { name: 'Gerente de Chapeiro', sectorId: sector_38.id },
  })

  const sector_39 = await prisma.sector.upsert({
    where: { name: 'Chef de Cozinha' },
    update: {},
    create: { name: 'Chef de Cozinha' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Chef de Cozinha' },
    update: {},
    create: { name: 'Estagiário de Chef de Cozinha', sectorId: sector_39.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Chef de Cozinha' },
    update: {},
    create: { name: 'Assistente de Chef de Cozinha', sectorId: sector_39.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Chef de Cozinha' },
    update: {},
    create: { name: 'Analista de Chef de Cozinha', sectorId: sector_39.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Chef de Cozinha' },
    update: {},
    create: { name: 'Coordenador de Chef de Cozinha', sectorId: sector_39.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Chef de Cozinha' },
    update: {},
    create: { name: 'Gerente de Chef de Cozinha', sectorId: sector_39.id },
  })

  const sector_40 = await prisma.sector.upsert({
    where: { name: 'Chão de Fábrica' },
    update: {},
    create: { name: 'Chão de Fábrica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Chão de Fábrica' },
    update: {},
    create: { name: 'Estagiário de Chão de Fábrica', sectorId: sector_40.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Chão de Fábrica' },
    update: {},
    create: { name: 'Assistente de Chão de Fábrica', sectorId: sector_40.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Chão de Fábrica' },
    update: {},
    create: { name: 'Analista de Chão de Fábrica', sectorId: sector_40.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Chão de Fábrica' },
    update: {},
    create: { name: 'Coordenador de Chão de Fábrica', sectorId: sector_40.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Chão de Fábrica' },
    update: {},
    create: { name: 'Gerente de Chão de Fábrica', sectorId: sector_40.id },
  })

  const sector_41 = await prisma.sector.upsert({
    where: { name: 'Chão de Fábrica - Metalúrgica' },
    update: {},
    create: { name: 'Chão de Fábrica - Metalúrgica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Chão de Fábrica - Metalúrgica' },
    update: {},
    create: { name: 'Estagiário de Chão de Fábrica - Metalúrgica', sectorId: sector_41.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Chão de Fábrica - Metalúrgica' },
    update: {},
    create: { name: 'Assistente de Chão de Fábrica - Metalúrgica', sectorId: sector_41.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Chão de Fábrica - Metalúrgica' },
    update: {},
    create: { name: 'Analista de Chão de Fábrica - Metalúrgica', sectorId: sector_41.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Chão de Fábrica - Metalúrgica' },
    update: {},
    create: { name: 'Coordenador de Chão de Fábrica - Metalúrgica', sectorId: sector_41.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Chão de Fábrica - Metalúrgica' },
    update: {},
    create: { name: 'Gerente de Chão de Fábrica - Metalúrgica', sectorId: sector_41.id },
  })

  const sector_42 = await prisma.sector.upsert({
    where: { name: 'Cobrança' },
    update: {},
    create: { name: 'Cobrança' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Cobrança' },
    update: {},
    create: { name: 'Estagiário de Cobrança', sectorId: sector_42.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Cobrança' },
    update: {},
    create: { name: 'Assistente de Cobrança', sectorId: sector_42.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Cobrança' },
    update: {},
    create: { name: 'Analista de Cobrança', sectorId: sector_42.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Cobrança' },
    update: {},
    create: { name: 'Coordenador de Cobrança', sectorId: sector_42.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Cobrança' },
    update: {},
    create: { name: 'Gerente de Cobrança', sectorId: sector_42.id },
  })

  const sector_43 = await prisma.sector.upsert({
    where: { name: 'Cobrança Ativa' },
    update: {},
    create: { name: 'Cobrança Ativa' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Cobrança Ativa' },
    update: {},
    create: { name: 'Estagiário de Cobrança Ativa', sectorId: sector_43.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Cobrança Ativa' },
    update: {},
    create: { name: 'Assistente de Cobrança Ativa', sectorId: sector_43.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Cobrança Ativa' },
    update: {},
    create: { name: 'Analista de Cobrança Ativa', sectorId: sector_43.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Cobrança Ativa' },
    update: {},
    create: { name: 'Coordenador de Cobrança Ativa', sectorId: sector_43.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Cobrança Ativa' },
    update: {},
    create: { name: 'Gerente de Cobrança Ativa', sectorId: sector_43.id },
  })

  const sector_44 = await prisma.sector.upsert({
    where: { name: 'Coleta Laboratorial' },
    update: {},
    create: { name: 'Coleta Laboratorial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Coleta Laboratorial' },
    update: {},
    create: { name: 'Estagiário de Coleta Laboratorial', sectorId: sector_44.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Coleta Laboratorial' },
    update: {},
    create: { name: 'Assistente de Coleta Laboratorial', sectorId: sector_44.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Coleta Laboratorial' },
    update: {},
    create: { name: 'Analista de Coleta Laboratorial', sectorId: sector_44.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Coleta Laboratorial' },
    update: {},
    create: { name: 'Coordenador de Coleta Laboratorial', sectorId: sector_44.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Coleta Laboratorial' },
    update: {},
    create: { name: 'Gerente de Coleta Laboratorial', sectorId: sector_44.id },
  })

  const sector_45 = await prisma.sector.upsert({
    where: { name: 'Comercial' },
    update: {},
    create: { name: 'Comercial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Comercial' },
    update: {},
    create: { name: 'Estagiário de Comercial', sectorId: sector_45.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Comercial' },
    update: {},
    create: { name: 'Assistente de Comercial', sectorId: sector_45.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Comercial' },
    update: {},
    create: { name: 'Analista de Comercial', sectorId: sector_45.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Comercial' },
    update: {},
    create: { name: 'Coordenador de Comercial', sectorId: sector_45.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Comercial' },
    update: {},
    create: { name: 'Gerente de Comercial', sectorId: sector_45.id },
  })

  const sector_46 = await prisma.sector.upsert({
    where: { name: 'Compliance' },
    update: {},
    create: { name: 'Compliance' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Compliance' },
    update: {},
    create: { name: 'Estagiário de Compliance', sectorId: sector_46.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Compliance' },
    update: {},
    create: { name: 'Assistente de Compliance', sectorId: sector_46.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Compliance' },
    update: {},
    create: { name: 'Analista de Compliance', sectorId: sector_46.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Compliance' },
    update: {},
    create: { name: 'Coordenador de Compliance', sectorId: sector_46.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Compliance' },
    update: {},
    create: { name: 'Gerente de Compliance', sectorId: sector_46.id },
  })

  const sector_47 = await prisma.sector.upsert({
    where: { name: 'Compras' },
    update: {},
    create: { name: 'Compras' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Compras' },
    update: {},
    create: { name: 'Estagiário de Compras', sectorId: sector_47.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Compras' },
    update: {},
    create: { name: 'Assistente de Compras', sectorId: sector_47.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Compras' },
    update: {},
    create: { name: 'Analista de Compras', sectorId: sector_47.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Compras' },
    update: {},
    create: { name: 'Coordenador de Compras', sectorId: sector_47.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Compras' },
    update: {},
    create: { name: 'Gerente de Compras', sectorId: sector_47.id },
  })

  const sector_48 = await prisma.sector.upsert({
    where: { name: 'Consultoria' },
    update: {},
    create: { name: 'Consultoria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Consultoria' },
    update: {},
    create: { name: 'Estagiário de Consultoria', sectorId: sector_48.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Consultoria' },
    update: {},
    create: { name: 'Assistente de Consultoria', sectorId: sector_48.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Consultoria' },
    update: {},
    create: { name: 'Analista de Consultoria', sectorId: sector_48.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Consultoria' },
    update: {},
    create: { name: 'Coordenador de Consultoria', sectorId: sector_48.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Consultoria' },
    update: {},
    create: { name: 'Gerente de Consultoria', sectorId: sector_48.id },
  })

  const sector_49 = await prisma.sector.upsert({
    where: { name: 'Consultoria Empresarial' },
    update: {},
    create: { name: 'Consultoria Empresarial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Consultoria Empresarial' },
    update: {},
    create: { name: 'Estagiário de Consultoria Empresarial', sectorId: sector_49.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Consultoria Empresarial' },
    update: {},
    create: { name: 'Assistente de Consultoria Empresarial', sectorId: sector_49.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Consultoria Empresarial' },
    update: {},
    create: { name: 'Analista de Consultoria Empresarial', sectorId: sector_49.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Consultoria Empresarial' },
    update: {},
    create: { name: 'Coordenador de Consultoria Empresarial', sectorId: sector_49.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Consultoria Empresarial' },
    update: {},
    create: { name: 'Gerente de Consultoria Empresarial', sectorId: sector_49.id },
  })

  const sector_50 = await prisma.sector.upsert({
    where: { name: 'Contabilidade Fiscal' },
    update: {},
    create: { name: 'Contabilidade Fiscal' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Contabilidade Fiscal' },
    update: {},
    create: { name: 'Estagiário de Contabilidade Fiscal', sectorId: sector_50.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Contabilidade Fiscal' },
    update: {},
    create: { name: 'Assistente de Contabilidade Fiscal', sectorId: sector_50.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Contabilidade Fiscal' },
    update: {},
    create: { name: 'Analista de Contabilidade Fiscal', sectorId: sector_50.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Contabilidade Fiscal' },
    update: {},
    create: { name: 'Coordenador de Contabilidade Fiscal', sectorId: sector_50.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Contabilidade Fiscal' },
    update: {},
    create: { name: 'Gerente de Contabilidade Fiscal', sectorId: sector_50.id },
  })

  const sector_51 = await prisma.sector.upsert({
    where: { name: 'Contabilidade Geral' },
    update: {},
    create: { name: 'Contabilidade Geral' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Contabilidade Geral' },
    update: {},
    create: { name: 'Estagiário de Contabilidade Geral', sectorId: sector_51.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Contabilidade Geral' },
    update: {},
    create: { name: 'Assistente de Contabilidade Geral', sectorId: sector_51.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Contabilidade Geral' },
    update: {},
    create: { name: 'Analista de Contabilidade Geral', sectorId: sector_51.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Contabilidade Geral' },
    update: {},
    create: { name: 'Coordenador de Contabilidade Geral', sectorId: sector_51.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Contabilidade Geral' },
    update: {},
    create: { name: 'Gerente de Contabilidade Geral', sectorId: sector_51.id },
  })

  const sector_52 = await prisma.sector.upsert({
    where: { name: 'Controladoria' },
    update: {},
    create: { name: 'Controladoria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Controladoria' },
    update: {},
    create: { name: 'Estagiário de Controladoria', sectorId: sector_52.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Controladoria' },
    update: {},
    create: { name: 'Assistente de Controladoria', sectorId: sector_52.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Controladoria' },
    update: {},
    create: { name: 'Analista de Controladoria', sectorId: sector_52.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Controladoria' },
    update: {},
    create: { name: 'Coordenador de Controladoria', sectorId: sector_52.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Controladoria' },
    update: {},
    create: { name: 'Gerente de Controladoria', sectorId: sector_52.id },
  })

  const sector_53 = await prisma.sector.upsert({
    where: { name: 'Controle de Produção' },
    update: {},
    create: { name: 'Controle de Produção' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Controle de Produção' },
    update: {},
    create: { name: 'Estagiário de Controle de Produção', sectorId: sector_53.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Controle de Produção' },
    update: {},
    create: { name: 'Assistente de Controle de Produção', sectorId: sector_53.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Controle de Produção' },
    update: {},
    create: { name: 'Analista de Controle de Produção', sectorId: sector_53.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Controle de Produção' },
    update: {},
    create: { name: 'Coordenador de Controle de Produção', sectorId: sector_53.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Controle de Produção' },
    update: {},
    create: { name: 'Gerente de Controle de Produção', sectorId: sector_53.id },
  })

  const sector_54 = await prisma.sector.upsert({
    where: { name: 'Controle de Qualidade Industrial' },
    update: {},
    create: { name: 'Controle de Qualidade Industrial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Controle de Qualidade Industrial' },
    update: {},
    create: { name: 'Estagiário de Controle de Qualidade Industrial', sectorId: sector_54.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Controle de Qualidade Industrial' },
    update: {},
    create: { name: 'Assistente de Controle de Qualidade Industrial', sectorId: sector_54.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Controle de Qualidade Industrial' },
    update: {},
    create: { name: 'Analista de Controle de Qualidade Industrial', sectorId: sector_54.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Controle de Qualidade Industrial' },
    update: {},
    create: { name: 'Coordenador de Controle de Qualidade Industrial', sectorId: sector_54.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Controle de Qualidade Industrial' },
    update: {},
    create: { name: 'Gerente de Controle de Qualidade Industrial', sectorId: sector_54.id },
  })

  const sector_55 = await prisma.sector.upsert({
    where: { name: 'Contábil' },
    update: {},
    create: { name: 'Contábil' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Contábil' },
    update: {},
    create: { name: 'Estagiário de Contábil', sectorId: sector_55.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Contábil' },
    update: {},
    create: { name: 'Assistente de Contábil', sectorId: sector_55.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Contábil' },
    update: {},
    create: { name: 'Analista de Contábil', sectorId: sector_55.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Contábil' },
    update: {},
    create: { name: 'Coordenador de Contábil', sectorId: sector_55.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Contábil' },
    update: {},
    create: { name: 'Gerente de Contábil', sectorId: sector_55.id },
  })

  const sector_56 = await prisma.sector.upsert({
    where: { name: 'Costura' },
    update: {},
    create: { name: 'Costura' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Costura' },
    update: {},
    create: { name: 'Estagiário de Costura', sectorId: sector_56.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Costura' },
    update: {},
    create: { name: 'Assistente de Costura', sectorId: sector_56.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Costura' },
    update: {},
    create: { name: 'Analista de Costura', sectorId: sector_56.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Costura' },
    update: {},
    create: { name: 'Coordenador de Costura', sectorId: sector_56.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Costura' },
    update: {},
    create: { name: 'Gerente de Costura', sectorId: sector_56.id },
  })

  const sector_57 = await prisma.sector.upsert({
    where: { name: 'Coworking' },
    update: {},
    create: { name: 'Coworking' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Coworking' },
    update: {},
    create: { name: 'Estagiário de Coworking', sectorId: sector_57.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Coworking' },
    update: {},
    create: { name: 'Assistente de Coworking', sectorId: sector_57.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Coworking' },
    update: {},
    create: { name: 'Analista de Coworking', sectorId: sector_57.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Coworking' },
    update: {},
    create: { name: 'Coordenador de Coworking', sectorId: sector_57.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Coworking' },
    update: {},
    create: { name: 'Gerente de Coworking', sectorId: sector_57.id },
  })

  const sector_58 = await prisma.sector.upsert({
    where: { name: 'Cozinha' },
    update: {},
    create: { name: 'Cozinha' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Cozinha' },
    update: {},
    create: { name: 'Estagiário de Cozinha', sectorId: sector_58.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Cozinha' },
    update: {},
    create: { name: 'Assistente de Cozinha', sectorId: sector_58.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Cozinha' },
    update: {},
    create: { name: 'Analista de Cozinha', sectorId: sector_58.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Cozinha' },
    update: {},
    create: { name: 'Coordenador de Cozinha', sectorId: sector_58.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Cozinha' },
    update: {},
    create: { name: 'Gerente de Cozinha', sectorId: sector_58.id },
  })

  const sector_59 = await prisma.sector.upsert({
    where: { name: 'Cozinha Industrial' },
    update: {},
    create: { name: 'Cozinha Industrial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Cozinha Industrial' },
    update: {},
    create: { name: 'Estagiário de Cozinha Industrial', sectorId: sector_59.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Cozinha Industrial' },
    update: {},
    create: { name: 'Assistente de Cozinha Industrial', sectorId: sector_59.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Cozinha Industrial' },
    update: {},
    create: { name: 'Analista de Cozinha Industrial', sectorId: sector_59.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Cozinha Industrial' },
    update: {},
    create: { name: 'Coordenador de Cozinha Industrial', sectorId: sector_59.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Cozinha Industrial' },
    update: {},
    create: { name: 'Gerente de Cozinha Industrial', sectorId: sector_59.id },
  })

  const sector_60 = await prisma.sector.upsert({
    where: { name: 'Criação' },
    update: {},
    create: { name: 'Criação' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Criação' },
    update: {},
    create: { name: 'Estagiário de Criação', sectorId: sector_60.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Criação' },
    update: {},
    create: { name: 'Assistente de Criação', sectorId: sector_60.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Criação' },
    update: {},
    create: { name: 'Analista de Criação', sectorId: sector_60.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Criação' },
    update: {},
    create: { name: 'Coordenador de Criação', sectorId: sector_60.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Criação' },
    update: {},
    create: { name: 'Gerente de Criação', sectorId: sector_60.id },
  })

  const sector_61 = await prisma.sector.upsert({
    where: { name: 'Crossfit' },
    update: {},
    create: { name: 'Crossfit' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Crossfit' },
    update: {},
    create: { name: 'Estagiário de Crossfit', sectorId: sector_61.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Crossfit' },
    update: {},
    create: { name: 'Assistente de Crossfit', sectorId: sector_61.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Crossfit' },
    update: {},
    create: { name: 'Analista de Crossfit', sectorId: sector_61.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Crossfit' },
    update: {},
    create: { name: 'Coordenador de Crossfit', sectorId: sector_61.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Crossfit' },
    update: {},
    create: { name: 'Gerente de Crossfit', sectorId: sector_61.id },
  })

  const sector_62 = await prisma.sector.upsert({
    where: { name: 'Cultura Organizacional' },
    update: {},
    create: { name: 'Cultura Organizacional' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Cultura Organizacional' },
    update: {},
    create: { name: 'Estagiário de Cultura Organizacional', sectorId: sector_62.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Cultura Organizacional' },
    update: {},
    create: { name: 'Assistente de Cultura Organizacional', sectorId: sector_62.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Cultura Organizacional' },
    update: {},
    create: { name: 'Analista de Cultura Organizacional', sectorId: sector_62.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Cultura Organizacional' },
    update: {},
    create: { name: 'Coordenador de Cultura Organizacional', sectorId: sector_62.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Cultura Organizacional' },
    update: {},
    create: { name: 'Gerente de Cultura Organizacional', sectorId: sector_62.id },
  })

  const sector_63 = await prisma.sector.upsert({
    where: { name: 'Customer Success' },
    update: {},
    create: { name: 'Customer Success' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Customer Success' },
    update: {},
    create: { name: 'Estagiário de Customer Success', sectorId: sector_63.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Customer Success' },
    update: {},
    create: { name: 'Assistente de Customer Success', sectorId: sector_63.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Customer Success' },
    update: {},
    create: { name: 'Analista de Customer Success', sectorId: sector_63.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Customer Success' },
    update: {},
    create: { name: 'Coordenador de Customer Success', sectorId: sector_63.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Customer Success' },
    update: {},
    create: { name: 'Gerente de Customer Success', sectorId: sector_63.id },
  })

  const sector_64 = await prisma.sector.upsert({
    where: { name: 'Data Science' },
    update: {},
    create: { name: 'Data Science' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Data Science' },
    update: {},
    create: { name: 'Estagiário de Data Science', sectorId: sector_64.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Data Science' },
    update: {},
    create: { name: 'Assistente de Data Science', sectorId: sector_64.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Data Science' },
    update: {},
    create: { name: 'Analista de Data Science', sectorId: sector_64.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Data Science' },
    update: {},
    create: { name: 'Coordenador de Data Science', sectorId: sector_64.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Data Science' },
    update: {},
    create: { name: 'Gerente de Data Science', sectorId: sector_64.id },
  })

  const sector_65 = await prisma.sector.upsert({
    where: { name: 'Departamento Fiscal' },
    update: {},
    create: { name: 'Departamento Fiscal' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Departamento Fiscal' },
    update: {},
    create: { name: 'Estagiário de Departamento Fiscal', sectorId: sector_65.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Departamento Fiscal' },
    update: {},
    create: { name: 'Assistente de Departamento Fiscal', sectorId: sector_65.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Departamento Fiscal' },
    update: {},
    create: { name: 'Analista de Departamento Fiscal', sectorId: sector_65.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Departamento Fiscal' },
    update: {},
    create: { name: 'Coordenador de Departamento Fiscal', sectorId: sector_65.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Departamento Fiscal' },
    update: {},
    create: { name: 'Gerente de Departamento Fiscal', sectorId: sector_65.id },
  })

  const sector_66 = await prisma.sector.upsert({
    where: { name: 'Departamento Pessoal' },
    update: {},
    create: { name: 'Departamento Pessoal' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Departamento Pessoal' },
    update: {},
    create: { name: 'Estagiário de Departamento Pessoal', sectorId: sector_66.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Departamento Pessoal' },
    update: {},
    create: { name: 'Assistente de Departamento Pessoal', sectorId: sector_66.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Departamento Pessoal' },
    update: {},
    create: { name: 'Analista de Departamento Pessoal', sectorId: sector_66.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Departamento Pessoal' },
    update: {},
    create: { name: 'Coordenador de Departamento Pessoal', sectorId: sector_66.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Departamento Pessoal' },
    update: {},
    create: { name: 'Gerente de Departamento Pessoal', sectorId: sector_66.id },
  })

  const sector_67 = await prisma.sector.upsert({
    where: { name: 'Design' },
    update: {},
    create: { name: 'Design' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Design' },
    update: {},
    create: { name: 'Estagiário de Design', sectorId: sector_67.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Design' },
    update: {},
    create: { name: 'Assistente de Design', sectorId: sector_67.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Design' },
    update: {},
    create: { name: 'Analista de Design', sectorId: sector_67.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Design' },
    update: {},
    create: { name: 'Coordenador de Design', sectorId: sector_67.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Design' },
    update: {},
    create: { name: 'Gerente de Design', sectorId: sector_67.id },
  })

  const sector_68 = await prisma.sector.upsert({
    where: { name: 'DevOps' },
    update: {},
    create: { name: 'DevOps' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de DevOps' },
    update: {},
    create: { name: 'Estagiário de DevOps', sectorId: sector_68.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de DevOps' },
    update: {},
    create: { name: 'Assistente de DevOps', sectorId: sector_68.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de DevOps' },
    update: {},
    create: { name: 'Analista de DevOps', sectorId: sector_68.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de DevOps' },
    update: {},
    create: { name: 'Coordenador de DevOps', sectorId: sector_68.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de DevOps' },
    update: {},
    create: { name: 'Gerente de DevOps', sectorId: sector_68.id },
  })

  const sector_69 = await prisma.sector.upsert({
    where: { name: 'Distribuição' },
    update: {},
    create: { name: 'Distribuição' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Distribuição' },
    update: {},
    create: { name: 'Estagiário de Distribuição', sectorId: sector_69.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Distribuição' },
    update: {},
    create: { name: 'Assistente de Distribuição', sectorId: sector_69.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Distribuição' },
    update: {},
    create: { name: 'Analista de Distribuição', sectorId: sector_69.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Distribuição' },
    update: {},
    create: { name: 'Coordenador de Distribuição', sectorId: sector_69.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Distribuição' },
    update: {},
    create: { name: 'Gerente de Distribuição', sectorId: sector_69.id },
  })

  const sector_70 = await prisma.sector.upsert({
    where: { name: 'E-commerce' },
    update: {},
    create: { name: 'E-commerce' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de E-commerce' },
    update: {},
    create: { name: 'Estagiário de E-commerce', sectorId: sector_70.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de E-commerce' },
    update: {},
    create: { name: 'Assistente de E-commerce', sectorId: sector_70.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de E-commerce' },
    update: {},
    create: { name: 'Analista de E-commerce', sectorId: sector_70.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de E-commerce' },
    update: {},
    create: { name: 'Coordenador de E-commerce', sectorId: sector_70.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de E-commerce' },
    update: {},
    create: { name: 'Gerente de E-commerce', sectorId: sector_70.id },
  })

  const sector_71 = await prisma.sector.upsert({
    where: { name: 'Editoras' },
    update: {},
    create: { name: 'Editoras' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Editoras' },
    update: {},
    create: { name: 'Estagiário de Editoras', sectorId: sector_71.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Editoras' },
    update: {},
    create: { name: 'Assistente de Editoras', sectorId: sector_71.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Editoras' },
    update: {},
    create: { name: 'Analista de Editoras', sectorId: sector_71.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Editoras' },
    update: {},
    create: { name: 'Coordenador de Editoras', sectorId: sector_71.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Editoras' },
    update: {},
    create: { name: 'Gerente de Editoras', sectorId: sector_71.id },
  })

  const sector_72 = await prisma.sector.upsert({
    where: { name: 'Educação Corporativa' },
    update: {},
    create: { name: 'Educação Corporativa' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Educação Corporativa' },
    update: {},
    create: { name: 'Estagiário de Educação Corporativa', sectorId: sector_72.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Educação Corporativa' },
    update: {},
    create: { name: 'Assistente de Educação Corporativa', sectorId: sector_72.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Educação Corporativa' },
    update: {},
    create: { name: 'Analista de Educação Corporativa', sectorId: sector_72.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Educação Corporativa' },
    update: {},
    create: { name: 'Coordenador de Educação Corporativa', sectorId: sector_72.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Educação Corporativa' },
    update: {},
    create: { name: 'Gerente de Educação Corporativa', sectorId: sector_72.id },
  })

  const sector_73 = await prisma.sector.upsert({
    where: { name: 'Educação Infantil' },
    update: {},
    create: { name: 'Educação Infantil' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Educação Infantil' },
    update: {},
    create: { name: 'Estagiário de Educação Infantil', sectorId: sector_73.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Educação Infantil' },
    update: {},
    create: { name: 'Assistente de Educação Infantil', sectorId: sector_73.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Educação Infantil' },
    update: {},
    create: { name: 'Analista de Educação Infantil', sectorId: sector_73.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Educação Infantil' },
    update: {},
    create: { name: 'Coordenador de Educação Infantil', sectorId: sector_73.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Educação Infantil' },
    update: {},
    create: { name: 'Gerente de Educação Infantil', sectorId: sector_73.id },
  })

  const sector_74 = await prisma.sector.upsert({
    where: { name: 'Educação a Distância' },
    update: {},
    create: { name: 'Educação a Distância' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Educação a Distância' },
    update: {},
    create: { name: 'Estagiário de Educação a Distância', sectorId: sector_74.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Educação a Distância' },
    update: {},
    create: { name: 'Assistente de Educação a Distância', sectorId: sector_74.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Educação a Distância' },
    update: {},
    create: { name: 'Analista de Educação a Distância', sectorId: sector_74.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Educação a Distância' },
    update: {},
    create: { name: 'Coordenador de Educação a Distância', sectorId: sector_74.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Educação a Distância' },
    update: {},
    create: { name: 'Gerente de Educação a Distância', sectorId: sector_74.id },
  })

  const sector_75 = await prisma.sector.upsert({
    where: { name: 'Empreendedorismo' },
    update: {},
    create: { name: 'Empreendedorismo' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Empreendedorismo' },
    update: {},
    create: { name: 'Estagiário de Empreendedorismo', sectorId: sector_75.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Empreendedorismo' },
    update: {},
    create: { name: 'Assistente de Empreendedorismo', sectorId: sector_75.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Empreendedorismo' },
    update: {},
    create: { name: 'Analista de Empreendedorismo', sectorId: sector_75.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Empreendedorismo' },
    update: {},
    create: { name: 'Coordenador de Empreendedorismo', sectorId: sector_75.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Empreendedorismo' },
    update: {},
    create: { name: 'Gerente de Empreendedorismo', sectorId: sector_75.id },
  })

  const sector_76 = await prisma.sector.upsert({
    where: { name: 'Energia Solar' },
    update: {},
    create: { name: 'Energia Solar' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Energia Solar' },
    update: {},
    create: { name: 'Estagiário de Energia Solar', sectorId: sector_76.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Energia Solar' },
    update: {},
    create: { name: 'Assistente de Energia Solar', sectorId: sector_76.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Energia Solar' },
    update: {},
    create: { name: 'Analista de Energia Solar', sectorId: sector_76.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Energia Solar' },
    update: {},
    create: { name: 'Coordenador de Energia Solar', sectorId: sector_76.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Energia Solar' },
    update: {},
    create: { name: 'Gerente de Energia Solar', sectorId: sector_76.id },
  })

  const sector_77 = await prisma.sector.upsert({
    where: { name: 'Enfermagem' },
    update: {},
    create: { name: 'Enfermagem' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Enfermagem' },
    update: {},
    create: { name: 'Estagiário de Enfermagem', sectorId: sector_77.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Enfermagem' },
    update: {},
    create: { name: 'Assistente de Enfermagem', sectorId: sector_77.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Enfermagem' },
    update: {},
    create: { name: 'Analista de Enfermagem', sectorId: sector_77.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Enfermagem' },
    update: {},
    create: { name: 'Coordenador de Enfermagem', sectorId: sector_77.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Enfermagem' },
    update: {},
    create: { name: 'Gerente de Enfermagem', sectorId: sector_77.id },
  })

  const sector_78 = await prisma.sector.upsert({
    where: { name: 'Enfermeiro' },
    update: {},
    create: { name: 'Enfermeiro' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Enfermeiro' },
    update: {},
    create: { name: 'Estagiário de Enfermeiro', sectorId: sector_78.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Enfermeiro' },
    update: {},
    create: { name: 'Assistente de Enfermeiro', sectorId: sector_78.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Enfermeiro' },
    update: {},
    create: { name: 'Analista de Enfermeiro', sectorId: sector_78.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Enfermeiro' },
    update: {},
    create: { name: 'Coordenador de Enfermeiro', sectorId: sector_78.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Enfermeiro' },
    update: {},
    create: { name: 'Gerente de Enfermeiro', sectorId: sector_78.id },
  })

  const sector_79 = await prisma.sector.upsert({
    where: { name: 'Engenharia Agronômica' },
    update: {},
    create: { name: 'Engenharia Agronômica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia Agronômica' },
    update: {},
    create: { name: 'Estagiário de Engenharia Agronômica', sectorId: sector_79.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia Agronômica' },
    update: {},
    create: { name: 'Assistente de Engenharia Agronômica', sectorId: sector_79.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia Agronômica' },
    update: {},
    create: { name: 'Analista de Engenharia Agronômica', sectorId: sector_79.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia Agronômica' },
    update: {},
    create: { name: 'Coordenador de Engenharia Agronômica', sectorId: sector_79.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia Agronômica' },
    update: {},
    create: { name: 'Gerente de Engenharia Agronômica', sectorId: sector_79.id },
  })

  const sector_80 = await prisma.sector.upsert({
    where: { name: 'Engenharia Civil' },
    update: {},
    create: { name: 'Engenharia Civil' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia Civil' },
    update: {},
    create: { name: 'Estagiário de Engenharia Civil', sectorId: sector_80.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia Civil' },
    update: {},
    create: { name: 'Assistente de Engenharia Civil', sectorId: sector_80.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia Civil' },
    update: {},
    create: { name: 'Analista de Engenharia Civil', sectorId: sector_80.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia Civil' },
    update: {},
    create: { name: 'Coordenador de Engenharia Civil', sectorId: sector_80.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia Civil' },
    update: {},
    create: { name: 'Gerente de Engenharia Civil', sectorId: sector_80.id },
  })

  const sector_81 = await prisma.sector.upsert({
    where: { name: 'Engenharia Elétrica' },
    update: {},
    create: { name: 'Engenharia Elétrica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia Elétrica' },
    update: {},
    create: { name: 'Estagiário de Engenharia Elétrica', sectorId: sector_81.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia Elétrica' },
    update: {},
    create: { name: 'Assistente de Engenharia Elétrica', sectorId: sector_81.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia Elétrica' },
    update: {},
    create: { name: 'Analista de Engenharia Elétrica', sectorId: sector_81.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia Elétrica' },
    update: {},
    create: { name: 'Coordenador de Engenharia Elétrica', sectorId: sector_81.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia Elétrica' },
    update: {},
    create: { name: 'Gerente de Engenharia Elétrica', sectorId: sector_81.id },
  })

  const sector_82 = await prisma.sector.upsert({
    where: { name: 'Engenharia Florestal' },
    update: {},
    create: { name: 'Engenharia Florestal' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia Florestal' },
    update: {},
    create: { name: 'Estagiário de Engenharia Florestal', sectorId: sector_82.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia Florestal' },
    update: {},
    create: { name: 'Assistente de Engenharia Florestal', sectorId: sector_82.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia Florestal' },
    update: {},
    create: { name: 'Analista de Engenharia Florestal', sectorId: sector_82.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia Florestal' },
    update: {},
    create: { name: 'Coordenador de Engenharia Florestal', sectorId: sector_82.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia Florestal' },
    update: {},
    create: { name: 'Gerente de Engenharia Florestal', sectorId: sector_82.id },
  })

  const sector_83 = await prisma.sector.upsert({
    where: { name: 'Engenharia Mecânica' },
    update: {},
    create: { name: 'Engenharia Mecânica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia Mecânica' },
    update: {},
    create: { name: 'Estagiário de Engenharia Mecânica', sectorId: sector_83.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia Mecânica' },
    update: {},
    create: { name: 'Assistente de Engenharia Mecânica', sectorId: sector_83.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia Mecânica' },
    update: {},
    create: { name: 'Analista de Engenharia Mecânica', sectorId: sector_83.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia Mecânica' },
    update: {},
    create: { name: 'Coordenador de Engenharia Mecânica', sectorId: sector_83.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia Mecânica' },
    update: {},
    create: { name: 'Gerente de Engenharia Mecânica', sectorId: sector_83.id },
  })

  const sector_84 = await prisma.sector.upsert({
    where: { name: 'Engenharia de Alimentos' },
    update: {},
    create: { name: 'Engenharia de Alimentos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia de Alimentos' },
    update: {},
    create: { name: 'Estagiário de Engenharia de Alimentos', sectorId: sector_84.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia de Alimentos' },
    update: {},
    create: { name: 'Assistente de Engenharia de Alimentos', sectorId: sector_84.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia de Alimentos' },
    update: {},
    create: { name: 'Analista de Engenharia de Alimentos', sectorId: sector_84.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia de Alimentos' },
    update: {},
    create: { name: 'Coordenador de Engenharia de Alimentos', sectorId: sector_84.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia de Alimentos' },
    update: {},
    create: { name: 'Gerente de Engenharia de Alimentos', sectorId: sector_84.id },
  })

  const sector_85 = await prisma.sector.upsert({
    where: { name: 'Engenharia de Obras' },
    update: {},
    create: { name: 'Engenharia de Obras' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia de Obras' },
    update: {},
    create: { name: 'Estagiário de Engenharia de Obras', sectorId: sector_85.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia de Obras' },
    update: {},
    create: { name: 'Assistente de Engenharia de Obras', sectorId: sector_85.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia de Obras' },
    update: {},
    create: { name: 'Analista de Engenharia de Obras', sectorId: sector_85.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia de Obras' },
    update: {},
    create: { name: 'Coordenador de Engenharia de Obras', sectorId: sector_85.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia de Obras' },
    update: {},
    create: { name: 'Gerente de Engenharia de Obras', sectorId: sector_85.id },
  })

  const sector_86 = await prisma.sector.upsert({
    where: { name: 'Engenharia de Produção' },
    update: {},
    create: { name: 'Engenharia de Produção' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia de Produção' },
    update: {},
    create: { name: 'Estagiário de Engenharia de Produção', sectorId: sector_86.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia de Produção' },
    update: {},
    create: { name: 'Assistente de Engenharia de Produção', sectorId: sector_86.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia de Produção' },
    update: {},
    create: { name: 'Analista de Engenharia de Produção', sectorId: sector_86.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia de Produção' },
    update: {},
    create: { name: 'Coordenador de Engenharia de Produção', sectorId: sector_86.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia de Produção' },
    update: {},
    create: { name: 'Gerente de Engenharia de Produção', sectorId: sector_86.id },
  })

  const sector_87 = await prisma.sector.upsert({
    where: { name: 'Engenharia de Software' },
    update: {},
    create: { name: 'Engenharia de Software' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Engenharia de Software' },
    update: {},
    create: { name: 'Estagiário de Engenharia de Software', sectorId: sector_87.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Engenharia de Software' },
    update: {},
    create: { name: 'Assistente de Engenharia de Software', sectorId: sector_87.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Engenharia de Software' },
    update: {},
    create: { name: 'Analista de Engenharia de Software', sectorId: sector_87.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Engenharia de Software' },
    update: {},
    create: { name: 'Coordenador de Engenharia de Software', sectorId: sector_87.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Engenharia de Software' },
    update: {},
    create: { name: 'Gerente de Engenharia de Software', sectorId: sector_87.id },
  })

  const sector_88 = await prisma.sector.upsert({
    where: { name: 'Ensino' },
    update: {},
    create: { name: 'Ensino' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Ensino' },
    update: {},
    create: { name: 'Estagiário de Ensino', sectorId: sector_88.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Ensino' },
    update: {},
    create: { name: 'Assistente de Ensino', sectorId: sector_88.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Ensino' },
    update: {},
    create: { name: 'Analista de Ensino', sectorId: sector_88.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Ensino' },
    update: {},
    create: { name: 'Coordenador de Ensino', sectorId: sector_88.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Ensino' },
    update: {},
    create: { name: 'Gerente de Ensino', sectorId: sector_88.id },
  })

  const sector_89 = await prisma.sector.upsert({
    where: { name: 'Ensino Médio' },
    update: {},
    create: { name: 'Ensino Médio' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Ensino Médio' },
    update: {},
    create: { name: 'Estagiário de Ensino Médio', sectorId: sector_89.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Ensino Médio' },
    update: {},
    create: { name: 'Assistente de Ensino Médio', sectorId: sector_89.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Ensino Médio' },
    update: {},
    create: { name: 'Analista de Ensino Médio', sectorId: sector_89.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Ensino Médio' },
    update: {},
    create: { name: 'Coordenador de Ensino Médio', sectorId: sector_89.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Ensino Médio' },
    update: {},
    create: { name: 'Gerente de Ensino Médio', sectorId: sector_89.id },
  })

  const sector_90 = await prisma.sector.upsert({
    where: { name: 'Ensino Superior' },
    update: {},
    create: { name: 'Ensino Superior' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Ensino Superior' },
    update: {},
    create: { name: 'Estagiário de Ensino Superior', sectorId: sector_90.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Ensino Superior' },
    update: {},
    create: { name: 'Assistente de Ensino Superior', sectorId: sector_90.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Ensino Superior' },
    update: {},
    create: { name: 'Analista de Ensino Superior', sectorId: sector_90.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Ensino Superior' },
    update: {},
    create: { name: 'Coordenador de Ensino Superior', sectorId: sector_90.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Ensino Superior' },
    update: {},
    create: { name: 'Gerente de Ensino Superior', sectorId: sector_90.id },
  })

  const sector_91 = await prisma.sector.upsert({
    where: { name: 'Ensino Técnico' },
    update: {},
    create: { name: 'Ensino Técnico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Ensino Técnico' },
    update: {},
    create: { name: 'Estagiário de Ensino Técnico', sectorId: sector_91.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Ensino Técnico' },
    update: {},
    create: { name: 'Assistente de Ensino Técnico', sectorId: sector_91.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Ensino Técnico' },
    update: {},
    create: { name: 'Analista de Ensino Técnico', sectorId: sector_91.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Ensino Técnico' },
    update: {},
    create: { name: 'Coordenador de Ensino Técnico', sectorId: sector_91.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Ensino Técnico' },
    update: {},
    create: { name: 'Gerente de Ensino Técnico', sectorId: sector_91.id },
  })

  const sector_92 = await prisma.sector.upsert({
    where: { name: 'Escritório Jurídico' },
    update: {},
    create: { name: 'Escritório Jurídico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Escritório Jurídico' },
    update: {},
    create: { name: 'Estagiário de Escritório Jurídico', sectorId: sector_92.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Escritório Jurídico' },
    update: {},
    create: { name: 'Assistente de Escritório Jurídico', sectorId: sector_92.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Escritório Jurídico' },
    update: {},
    create: { name: 'Analista de Escritório Jurídico', sectorId: sector_92.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Escritório Jurídico' },
    update: {},
    create: { name: 'Coordenador de Escritório Jurídico', sectorId: sector_92.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Escritório Jurídico' },
    update: {},
    create: { name: 'Gerente de Escritório Jurídico', sectorId: sector_92.id },
  })

  const sector_93 = await prisma.sector.upsert({
    where: { name: 'Esportes' },
    update: {},
    create: { name: 'Esportes' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Esportes' },
    update: {},
    create: { name: 'Estagiário de Esportes', sectorId: sector_93.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Esportes' },
    update: {},
    create: { name: 'Assistente de Esportes', sectorId: sector_93.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Esportes' },
    update: {},
    create: { name: 'Analista de Esportes', sectorId: sector_93.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Esportes' },
    update: {},
    create: { name: 'Coordenador de Esportes', sectorId: sector_93.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Esportes' },
    update: {},
    create: { name: 'Gerente de Esportes', sectorId: sector_93.id },
  })

  const sector_94 = await prisma.sector.upsert({
    where: { name: 'Estoque' },
    update: {},
    create: { name: 'Estoque' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Estoque' },
    update: {},
    create: { name: 'Estagiário de Estoque', sectorId: sector_94.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Estoque' },
    update: {},
    create: { name: 'Assistente de Estoque', sectorId: sector_94.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Estoque' },
    update: {},
    create: { name: 'Analista de Estoque', sectorId: sector_94.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Estoque' },
    update: {},
    create: { name: 'Coordenador de Estoque', sectorId: sector_94.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Estoque' },
    update: {},
    create: { name: 'Gerente de Estoque', sectorId: sector_94.id },
  })

  const sector_95 = await prisma.sector.upsert({
    where: { name: 'Eventos' },
    update: {},
    create: { name: 'Eventos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Eventos' },
    update: {},
    create: { name: 'Estagiário de Eventos', sectorId: sector_95.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Eventos' },
    update: {},
    create: { name: 'Assistente de Eventos', sectorId: sector_95.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Eventos' },
    update: {},
    create: { name: 'Analista de Eventos', sectorId: sector_95.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Eventos' },
    update: {},
    create: { name: 'Coordenador de Eventos', sectorId: sector_95.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Eventos' },
    update: {},
    create: { name: 'Gerente de Eventos', sectorId: sector_95.id },
  })

  const sector_96 = await prisma.sector.upsert({
    where: { name: 'Eventos Corporativos' },
    update: {},
    create: { name: 'Eventos Corporativos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Eventos Corporativos' },
    update: {},
    create: { name: 'Estagiário de Eventos Corporativos', sectorId: sector_96.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Eventos Corporativos' },
    update: {},
    create: { name: 'Assistente de Eventos Corporativos', sectorId: sector_96.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Eventos Corporativos' },
    update: {},
    create: { name: 'Analista de Eventos Corporativos', sectorId: sector_96.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Eventos Corporativos' },
    update: {},
    create: { name: 'Coordenador de Eventos Corporativos', sectorId: sector_96.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Eventos Corporativos' },
    update: {},
    create: { name: 'Gerente de Eventos Corporativos', sectorId: sector_96.id },
  })

  const sector_97 = await prisma.sector.upsert({
    where: { name: 'Expedição' },
    update: {},
    create: { name: 'Expedição' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Expedição' },
    update: {},
    create: { name: 'Estagiário de Expedição', sectorId: sector_97.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Expedição' },
    update: {},
    create: { name: 'Assistente de Expedição', sectorId: sector_97.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Expedição' },
    update: {},
    create: { name: 'Analista de Expedição', sectorId: sector_97.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Expedição' },
    update: {},
    create: { name: 'Coordenador de Expedição', sectorId: sector_97.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Expedição' },
    update: {},
    create: { name: 'Gerente de Expedição', sectorId: sector_97.id },
  })

  const sector_98 = await prisma.sector.upsert({
    where: { name: 'Expedição de Produtos' },
    update: {},
    create: { name: 'Expedição de Produtos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Expedição de Produtos' },
    update: {},
    create: { name: 'Estagiário de Expedição de Produtos', sectorId: sector_98.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Expedição de Produtos' },
    update: {},
    create: { name: 'Assistente de Expedição de Produtos', sectorId: sector_98.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Expedição de Produtos' },
    update: {},
    create: { name: 'Analista de Expedição de Produtos', sectorId: sector_98.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Expedição de Produtos' },
    update: {},
    create: { name: 'Coordenador de Expedição de Produtos', sectorId: sector_98.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Expedição de Produtos' },
    update: {},
    create: { name: 'Gerente de Expedição de Produtos', sectorId: sector_98.id },
  })

  const sector_99 = await prisma.sector.upsert({
    where: { name: 'Facilities' },
    update: {},
    create: { name: 'Facilities' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Facilities' },
    update: {},
    create: { name: 'Estagiário de Facilities', sectorId: sector_99.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Facilities' },
    update: {},
    create: { name: 'Assistente de Facilities', sectorId: sector_99.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Facilities' },
    update: {},
    create: { name: 'Analista de Facilities', sectorId: sector_99.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Facilities' },
    update: {},
    create: { name: 'Coordenador de Facilities', sectorId: sector_99.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Facilities' },
    update: {},
    create: { name: 'Gerente de Facilities', sectorId: sector_99.id },
  })

  const sector_100 = await prisma.sector.upsert({
    where: { name: 'Farmácia' },
    update: {},
    create: { name: 'Farmácia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Farmácia' },
    update: {},
    create: { name: 'Estagiário de Farmácia', sectorId: sector_100.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Farmácia' },
    update: {},
    create: { name: 'Assistente de Farmácia', sectorId: sector_100.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Farmácia' },
    update: {},
    create: { name: 'Analista de Farmácia', sectorId: sector_100.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Farmácia' },
    update: {},
    create: { name: 'Coordenador de Farmácia', sectorId: sector_100.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Farmácia' },
    update: {},
    create: { name: 'Gerente de Farmácia', sectorId: sector_100.id },
  })

  const sector_101 = await prisma.sector.upsert({
    where: { name: 'Farmácia Clínica' },
    update: {},
    create: { name: 'Farmácia Clínica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Farmácia Clínica' },
    update: {},
    create: { name: 'Estagiário de Farmácia Clínica', sectorId: sector_101.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Farmácia Clínica' },
    update: {},
    create: { name: 'Assistente de Farmácia Clínica', sectorId: sector_101.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Farmácia Clínica' },
    update: {},
    create: { name: 'Analista de Farmácia Clínica', sectorId: sector_101.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Farmácia Clínica' },
    update: {},
    create: { name: 'Coordenador de Farmácia Clínica', sectorId: sector_101.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Farmácia Clínica' },
    update: {},
    create: { name: 'Gerente de Farmácia Clínica', sectorId: sector_101.id },
  })

  const sector_102 = await prisma.sector.upsert({
    where: { name: 'Faturamento' },
    update: {},
    create: { name: 'Faturamento' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Faturamento' },
    update: {},
    create: { name: 'Estagiário de Faturamento', sectorId: sector_102.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Faturamento' },
    update: {},
    create: { name: 'Assistente de Faturamento', sectorId: sector_102.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Faturamento' },
    update: {},
    create: { name: 'Analista de Faturamento', sectorId: sector_102.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Faturamento' },
    update: {},
    create: { name: 'Coordenador de Faturamento', sectorId: sector_102.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Faturamento' },
    update: {},
    create: { name: 'Gerente de Faturamento', sectorId: sector_102.id },
  })

  const sector_103 = await prisma.sector.upsert({
    where: { name: 'Faturamento Médico' },
    update: {},
    create: { name: 'Faturamento Médico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Faturamento Médico' },
    update: {},
    create: { name: 'Estagiário de Faturamento Médico', sectorId: sector_103.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Faturamento Médico' },
    update: {},
    create: { name: 'Assistente de Faturamento Médico', sectorId: sector_103.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Faturamento Médico' },
    update: {},
    create: { name: 'Analista de Faturamento Médico', sectorId: sector_103.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Faturamento Médico' },
    update: {},
    create: { name: 'Coordenador de Faturamento Médico', sectorId: sector_103.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Faturamento Médico' },
    update: {},
    create: { name: 'Gerente de Faturamento Médico', sectorId: sector_103.id },
  })

  const sector_104 = await prisma.sector.upsert({
    where: { name: 'Financeiro' },
    update: {},
    create: { name: 'Financeiro' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Financeiro' },
    update: {},
    create: { name: 'Estagiário de Financeiro', sectorId: sector_104.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Financeiro' },
    update: {},
    create: { name: 'Assistente de Financeiro', sectorId: sector_104.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Financeiro' },
    update: {},
    create: { name: 'Analista de Financeiro', sectorId: sector_104.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Financeiro' },
    update: {},
    create: { name: 'Coordenador de Financeiro', sectorId: sector_104.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Financeiro' },
    update: {},
    create: { name: 'Gerente de Financeiro', sectorId: sector_104.id },
  })

  const sector_105 = await prisma.sector.upsert({
    where: { name: 'Financeiro - Contas a Pagar' },
    update: {},
    create: { name: 'Financeiro - Contas a Pagar' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Financeiro - Contas a Pagar' },
    update: {},
    create: { name: 'Estagiário de Financeiro - Contas a Pagar', sectorId: sector_105.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Financeiro - Contas a Pagar' },
    update: {},
    create: { name: 'Assistente de Financeiro - Contas a Pagar', sectorId: sector_105.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Financeiro - Contas a Pagar' },
    update: {},
    create: { name: 'Analista de Financeiro - Contas a Pagar', sectorId: sector_105.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Financeiro - Contas a Pagar' },
    update: {},
    create: { name: 'Coordenador de Financeiro - Contas a Pagar', sectorId: sector_105.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Financeiro - Contas a Pagar' },
    update: {},
    create: { name: 'Gerente de Financeiro - Contas a Pagar', sectorId: sector_105.id },
  })

  const sector_106 = await prisma.sector.upsert({
    where: { name: 'Financeiro - Contas a Receber' },
    update: {},
    create: { name: 'Financeiro - Contas a Receber' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Financeiro - Contas a Receber' },
    update: {},
    create: { name: 'Estagiário de Financeiro - Contas a Receber', sectorId: sector_106.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Financeiro - Contas a Receber' },
    update: {},
    create: { name: 'Assistente de Financeiro - Contas a Receber', sectorId: sector_106.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Financeiro - Contas a Receber' },
    update: {},
    create: { name: 'Analista de Financeiro - Contas a Receber', sectorId: sector_106.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Financeiro - Contas a Receber' },
    update: {},
    create: { name: 'Coordenador de Financeiro - Contas a Receber', sectorId: sector_106.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Financeiro - Contas a Receber' },
    update: {},
    create: { name: 'Gerente de Financeiro - Contas a Receber', sectorId: sector_106.id },
  })

  const sector_107 = await prisma.sector.upsert({
    where: { name: 'Financeiro - Tesouraria' },
    update: {},
    create: { name: 'Financeiro - Tesouraria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Financeiro - Tesouraria' },
    update: {},
    create: { name: 'Estagiário de Financeiro - Tesouraria', sectorId: sector_107.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Financeiro - Tesouraria' },
    update: {},
    create: { name: 'Assistente de Financeiro - Tesouraria', sectorId: sector_107.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Financeiro - Tesouraria' },
    update: {},
    create: { name: 'Analista de Financeiro - Tesouraria', sectorId: sector_107.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Financeiro - Tesouraria' },
    update: {},
    create: { name: 'Coordenador de Financeiro - Tesouraria', sectorId: sector_107.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Financeiro - Tesouraria' },
    update: {},
    create: { name: 'Gerente de Financeiro - Tesouraria', sectorId: sector_107.id },
  })

  const sector_108 = await prisma.sector.upsert({
    where: { name: 'Fisioterapia' },
    update: {},
    create: { name: 'Fisioterapia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Fisioterapia' },
    update: {},
    create: { name: 'Estagiário de Fisioterapia', sectorId: sector_108.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Fisioterapia' },
    update: {},
    create: { name: 'Assistente de Fisioterapia', sectorId: sector_108.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Fisioterapia' },
    update: {},
    create: { name: 'Analista de Fisioterapia', sectorId: sector_108.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Fisioterapia' },
    update: {},
    create: { name: 'Coordenador de Fisioterapia', sectorId: sector_108.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Fisioterapia' },
    update: {},
    create: { name: 'Gerente de Fisioterapia', sectorId: sector_108.id },
  })

  const sector_109 = await prisma.sector.upsert({
    where: { name: 'Franquias' },
    update: {},
    create: { name: 'Franquias' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Franquias' },
    update: {},
    create: { name: 'Estagiário de Franquias', sectorId: sector_109.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Franquias' },
    update: {},
    create: { name: 'Assistente de Franquias', sectorId: sector_109.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Franquias' },
    update: {},
    create: { name: 'Analista de Franquias', sectorId: sector_109.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Franquias' },
    update: {},
    create: { name: 'Coordenador de Franquias', sectorId: sector_109.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Franquias' },
    update: {},
    create: { name: 'Gerente de Franquias', sectorId: sector_109.id },
  })

  const sector_110 = await prisma.sector.upsert({
    where: { name: 'Franquias de Varejo' },
    update: {},
    create: { name: 'Franquias de Varejo' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Franquias de Varejo' },
    update: {},
    create: { name: 'Estagiário de Franquias de Varejo', sectorId: sector_110.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Franquias de Varejo' },
    update: {},
    create: { name: 'Assistente de Franquias de Varejo', sectorId: sector_110.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Franquias de Varejo' },
    update: {},
    create: { name: 'Analista de Franquias de Varejo', sectorId: sector_110.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Franquias de Varejo' },
    update: {},
    create: { name: 'Coordenador de Franquias de Varejo', sectorId: sector_110.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Franquias de Varejo' },
    update: {},
    create: { name: 'Gerente de Franquias de Varejo', sectorId: sector_110.id },
  })

  const sector_111 = await prisma.sector.upsert({
    where: { name: 'Freelancers' },
    update: {},
    create: { name: 'Freelancers' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Freelancers' },
    update: {},
    create: { name: 'Estagiário de Freelancers', sectorId: sector_111.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Freelancers' },
    update: {},
    create: { name: 'Assistente de Freelancers', sectorId: sector_111.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Freelancers' },
    update: {},
    create: { name: 'Analista de Freelancers', sectorId: sector_111.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Freelancers' },
    update: {},
    create: { name: 'Coordenador de Freelancers', sectorId: sector_111.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Freelancers' },
    update: {},
    create: { name: 'Gerente de Freelancers', sectorId: sector_111.id },
  })

  const sector_112 = await prisma.sector.upsert({
    where: { name: 'Física' },
    update: {},
    create: { name: 'Física' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Física' },
    update: {},
    create: { name: 'Estagiário de Física', sectorId: sector_112.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Física' },
    update: {},
    create: { name: 'Assistente de Física', sectorId: sector_112.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Física' },
    update: {},
    create: { name: 'Analista de Física', sectorId: sector_112.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Física' },
    update: {},
    create: { name: 'Coordenador de Física', sectorId: sector_112.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Física' },
    update: {},
    create: { name: 'Gerente de Física', sectorId: sector_112.id },
  })

  const sector_113 = await prisma.sector.upsert({
    where: { name: 'Garçom/Garçonete' },
    update: {},
    create: { name: 'Garçom/Garçonete' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Garçom/Garçonete' },
    update: {},
    create: { name: 'Estagiário de Garçom/Garçonete', sectorId: sector_113.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Garçom/Garçonete' },
    update: {},
    create: { name: 'Assistente de Garçom/Garçonete', sectorId: sector_113.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Garçom/Garçonete' },
    update: {},
    create: { name: 'Analista de Garçom/Garçonete', sectorId: sector_113.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Garçom/Garçonete' },
    update: {},
    create: { name: 'Coordenador de Garçom/Garçonete', sectorId: sector_113.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Garçom/Garçonete' },
    update: {},
    create: { name: 'Gerente de Garçom/Garçonete', sectorId: sector_113.id },
  })

  const sector_114 = await prisma.sector.upsert({
    where: { name: 'Gastronomia' },
    update: {},
    create: { name: 'Gastronomia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gastronomia' },
    update: {},
    create: { name: 'Estagiário de Gastronomia', sectorId: sector_114.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gastronomia' },
    update: {},
    create: { name: 'Assistente de Gastronomia', sectorId: sector_114.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gastronomia' },
    update: {},
    create: { name: 'Analista de Gastronomia', sectorId: sector_114.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gastronomia' },
    update: {},
    create: { name: 'Coordenador de Gastronomia', sectorId: sector_114.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gastronomia' },
    update: {},
    create: { name: 'Gerente de Gastronomia', sectorId: sector_114.id },
  })

  const sector_115 = await prisma.sector.upsert({
    where: { name: 'Geologia' },
    update: {},
    create: { name: 'Geologia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Geologia' },
    update: {},
    create: { name: 'Estagiário de Geologia', sectorId: sector_115.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Geologia' },
    update: {},
    create: { name: 'Assistente de Geologia', sectorId: sector_115.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Geologia' },
    update: {},
    create: { name: 'Analista de Geologia', sectorId: sector_115.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Geologia' },
    update: {},
    create: { name: 'Coordenador de Geologia', sectorId: sector_115.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Geologia' },
    update: {},
    create: { name: 'Gerente de Geologia', sectorId: sector_115.id },
  })

  const sector_116 = await prisma.sector.upsert({
    where: { name: 'Gerência de Restaurante' },
    update: {},
    create: { name: 'Gerência de Restaurante' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gerência de Restaurante' },
    update: {},
    create: { name: 'Estagiário de Gerência de Restaurante', sectorId: sector_116.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gerência de Restaurante' },
    update: {},
    create: { name: 'Assistente de Gerência de Restaurante', sectorId: sector_116.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gerência de Restaurante' },
    update: {},
    create: { name: 'Analista de Gerência de Restaurante', sectorId: sector_116.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gerência de Restaurante' },
    update: {},
    create: { name: 'Coordenador de Gerência de Restaurante', sectorId: sector_116.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gerência de Restaurante' },
    update: {},
    create: { name: 'Gerente de Gerência de Restaurante', sectorId: sector_116.id },
  })

  const sector_117 = await prisma.sector.upsert({
    where: { name: 'Gestão Agropecuária' },
    update: {},
    create: { name: 'Gestão Agropecuária' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gestão Agropecuária' },
    update: {},
    create: { name: 'Estagiário de Gestão Agropecuária', sectorId: sector_117.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gestão Agropecuária' },
    update: {},
    create: { name: 'Assistente de Gestão Agropecuária', sectorId: sector_117.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gestão Agropecuária' },
    update: {},
    create: { name: 'Analista de Gestão Agropecuária', sectorId: sector_117.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gestão Agropecuária' },
    update: {},
    create: { name: 'Coordenador de Gestão Agropecuária', sectorId: sector_117.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gestão Agropecuária' },
    update: {},
    create: { name: 'Gerente de Gestão Agropecuária', sectorId: sector_117.id },
  })

  const sector_118 = await prisma.sector.upsert({
    where: { name: 'Gestão Estratégica' },
    update: {},
    create: { name: 'Gestão Estratégica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gestão Estratégica' },
    update: {},
    create: { name: 'Estagiário de Gestão Estratégica', sectorId: sector_118.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gestão Estratégica' },
    update: {},
    create: { name: 'Assistente de Gestão Estratégica', sectorId: sector_118.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gestão Estratégica' },
    update: {},
    create: { name: 'Analista de Gestão Estratégica', sectorId: sector_118.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gestão Estratégica' },
    update: {},
    create: { name: 'Coordenador de Gestão Estratégica', sectorId: sector_118.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gestão Estratégica' },
    update: {},
    create: { name: 'Gerente de Gestão Estratégica', sectorId: sector_118.id },
  })

  const sector_119 = await prisma.sector.upsert({
    where: { name: 'Gestão Hospitalar' },
    update: {},
    create: { name: 'Gestão Hospitalar' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gestão Hospitalar' },
    update: {},
    create: { name: 'Estagiário de Gestão Hospitalar', sectorId: sector_119.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gestão Hospitalar' },
    update: {},
    create: { name: 'Assistente de Gestão Hospitalar', sectorId: sector_119.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gestão Hospitalar' },
    update: {},
    create: { name: 'Analista de Gestão Hospitalar', sectorId: sector_119.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gestão Hospitalar' },
    update: {},
    create: { name: 'Coordenador de Gestão Hospitalar', sectorId: sector_119.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gestão Hospitalar' },
    update: {},
    create: { name: 'Gerente de Gestão Hospitalar', sectorId: sector_119.id },
  })

  const sector_120 = await prisma.sector.upsert({
    where: { name: 'Gestão Pública' },
    update: {},
    create: { name: 'Gestão Pública' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gestão Pública' },
    update: {},
    create: { name: 'Estagiário de Gestão Pública', sectorId: sector_120.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gestão Pública' },
    update: {},
    create: { name: 'Assistente de Gestão Pública', sectorId: sector_120.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gestão Pública' },
    update: {},
    create: { name: 'Analista de Gestão Pública', sectorId: sector_120.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gestão Pública' },
    update: {},
    create: { name: 'Coordenador de Gestão Pública', sectorId: sector_120.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gestão Pública' },
    update: {},
    create: { name: 'Gerente de Gestão Pública', sectorId: sector_120.id },
  })

  const sector_121 = await prisma.sector.upsert({
    where: { name: 'Gestão de Escritórios' },
    update: {},
    create: { name: 'Gestão de Escritórios' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gestão de Escritórios' },
    update: {},
    create: { name: 'Estagiário de Gestão de Escritórios', sectorId: sector_121.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gestão de Escritórios' },
    update: {},
    create: { name: 'Assistente de Gestão de Escritórios', sectorId: sector_121.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gestão de Escritórios' },
    update: {},
    create: { name: 'Analista de Gestão de Escritórios', sectorId: sector_121.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gestão de Escritórios' },
    update: {},
    create: { name: 'Coordenador de Gestão de Escritórios', sectorId: sector_121.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gestão de Escritórios' },
    update: {},
    create: { name: 'Gerente de Gestão de Escritórios', sectorId: sector_121.id },
  })

  const sector_122 = await prisma.sector.upsert({
    where: { name: 'Gestão de Frota' },
    update: {},
    create: { name: 'Gestão de Frota' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gestão de Frota' },
    update: {},
    create: { name: 'Estagiário de Gestão de Frota', sectorId: sector_122.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gestão de Frota' },
    update: {},
    create: { name: 'Assistente de Gestão de Frota', sectorId: sector_122.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gestão de Frota' },
    update: {},
    create: { name: 'Analista de Gestão de Frota', sectorId: sector_122.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gestão de Frota' },
    update: {},
    create: { name: 'Coordenador de Gestão de Frota', sectorId: sector_122.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gestão de Frota' },
    update: {},
    create: { name: 'Gerente de Gestão de Frota', sectorId: sector_122.id },
  })

  const sector_123 = await prisma.sector.upsert({
    where: { name: 'Gestão de Mudanças' },
    update: {},
    create: { name: 'Gestão de Mudanças' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gestão de Mudanças' },
    update: {},
    create: { name: 'Estagiário de Gestão de Mudanças', sectorId: sector_123.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gestão de Mudanças' },
    update: {},
    create: { name: 'Assistente de Gestão de Mudanças', sectorId: sector_123.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gestão de Mudanças' },
    update: {},
    create: { name: 'Analista de Gestão de Mudanças', sectorId: sector_123.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gestão de Mudanças' },
    update: {},
    create: { name: 'Coordenador de Gestão de Mudanças', sectorId: sector_123.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gestão de Mudanças' },
    update: {},
    create: { name: 'Gerente de Gestão de Mudanças', sectorId: sector_123.id },
  })

  const sector_124 = await prisma.sector.upsert({
    where: { name: 'Gestão de Viagens' },
    update: {},
    create: { name: 'Gestão de Viagens' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Gestão de Viagens' },
    update: {},
    create: { name: 'Estagiário de Gestão de Viagens', sectorId: sector_124.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Gestão de Viagens' },
    update: {},
    create: { name: 'Assistente de Gestão de Viagens', sectorId: sector_124.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Gestão de Viagens' },
    update: {},
    create: { name: 'Analista de Gestão de Viagens', sectorId: sector_124.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Gestão de Viagens' },
    update: {},
    create: { name: 'Coordenador de Gestão de Viagens', sectorId: sector_124.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Gestão de Viagens' },
    update: {},
    create: { name: 'Gerente de Gestão de Viagens', sectorId: sector_124.id },
  })

  const sector_125 = await prisma.sector.upsert({
    where: { name: 'Governança' },
    update: {},
    create: { name: 'Governança' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Governança' },
    update: {},
    create: { name: 'Estagiário de Governança', sectorId: sector_125.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Governança' },
    update: {},
    create: { name: 'Assistente de Governança', sectorId: sector_125.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Governança' },
    update: {},
    create: { name: 'Analista de Governança', sectorId: sector_125.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Governança' },
    update: {},
    create: { name: 'Coordenador de Governança', sectorId: sector_125.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Governança' },
    update: {},
    create: { name: 'Gerente de Governança', sectorId: sector_125.id },
  })

  const sector_126 = await prisma.sector.upsert({
    where: { name: 'Governança Hoteleira' },
    update: {},
    create: { name: 'Governança Hoteleira' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Governança Hoteleira' },
    update: {},
    create: { name: 'Estagiário de Governança Hoteleira', sectorId: sector_126.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Governança Hoteleira' },
    update: {},
    create: { name: 'Assistente de Governança Hoteleira', sectorId: sector_126.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Governança Hoteleira' },
    update: {},
    create: { name: 'Analista de Governança Hoteleira', sectorId: sector_126.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Governança Hoteleira' },
    update: {},
    create: { name: 'Coordenador de Governança Hoteleira', sectorId: sector_126.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Governança Hoteleira' },
    update: {},
    create: { name: 'Gerente de Governança Hoteleira', sectorId: sector_126.id },
  })

  const sector_127 = await prisma.sector.upsert({
    where: { name: 'Guias Turísticos' },
    update: {},
    create: { name: 'Guias Turísticos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Guias Turísticos' },
    update: {},
    create: { name: 'Estagiário de Guias Turísticos', sectorId: sector_127.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Guias Turísticos' },
    update: {},
    create: { name: 'Assistente de Guias Turísticos', sectorId: sector_127.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Guias Turísticos' },
    update: {},
    create: { name: 'Analista de Guias Turísticos', sectorId: sector_127.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Guias Turísticos' },
    update: {},
    create: { name: 'Coordenador de Guias Turísticos', sectorId: sector_127.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Guias Turísticos' },
    update: {},
    create: { name: 'Gerente de Guias Turísticos', sectorId: sector_127.id },
  })

  const sector_128 = await prisma.sector.upsert({
    where: { name: 'Hidráulica' },
    update: {},
    create: { name: 'Hidráulica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Hidráulica' },
    update: {},
    create: { name: 'Estagiário de Hidráulica', sectorId: sector_128.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Hidráulica' },
    update: {},
    create: { name: 'Assistente de Hidráulica', sectorId: sector_128.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Hidráulica' },
    update: {},
    create: { name: 'Analista de Hidráulica', sectorId: sector_128.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Hidráulica' },
    update: {},
    create: { name: 'Coordenador de Hidráulica', sectorId: sector_128.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Hidráulica' },
    update: {},
    create: { name: 'Gerente de Hidráulica', sectorId: sector_128.id },
  })

  const sector_129 = await prisma.sector.upsert({
    where: { name: 'Hotelaria' },
    update: {},
    create: { name: 'Hotelaria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Hotelaria' },
    update: {},
    create: { name: 'Estagiário de Hotelaria', sectorId: sector_129.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Hotelaria' },
    update: {},
    create: { name: 'Assistente de Hotelaria', sectorId: sector_129.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Hotelaria' },
    update: {},
    create: { name: 'Analista de Hotelaria', sectorId: sector_129.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Hotelaria' },
    update: {},
    create: { name: 'Coordenador de Hotelaria', sectorId: sector_129.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Hotelaria' },
    update: {},
    create: { name: 'Gerente de Hotelaria', sectorId: sector_129.id },
  })

  const sector_130 = await prisma.sector.upsert({
    where: { name: 'Importação e Exportação' },
    update: {},
    create: { name: 'Importação e Exportação' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Importação e Exportação' },
    update: {},
    create: { name: 'Estagiário de Importação e Exportação', sectorId: sector_130.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Importação e Exportação' },
    update: {},
    create: { name: 'Assistente de Importação e Exportação', sectorId: sector_130.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Importação e Exportação' },
    update: {},
    create: { name: 'Analista de Importação e Exportação', sectorId: sector_130.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Importação e Exportação' },
    update: {},
    create: { name: 'Coordenador de Importação e Exportação', sectorId: sector_130.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Importação e Exportação' },
    update: {},
    create: { name: 'Gerente de Importação e Exportação', sectorId: sector_130.id },
  })

  const sector_131 = await prisma.sector.upsert({
    where: { name: 'Inclusão e Diversidade' },
    update: {},
    create: { name: 'Inclusão e Diversidade' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Inclusão e Diversidade' },
    update: {},
    create: { name: 'Estagiário de Inclusão e Diversidade', sectorId: sector_131.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Inclusão e Diversidade' },
    update: {},
    create: { name: 'Assistente de Inclusão e Diversidade', sectorId: sector_131.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Inclusão e Diversidade' },
    update: {},
    create: { name: 'Analista de Inclusão e Diversidade', sectorId: sector_131.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Inclusão e Diversidade' },
    update: {},
    create: { name: 'Coordenador de Inclusão e Diversidade', sectorId: sector_131.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Inclusão e Diversidade' },
    update: {},
    create: { name: 'Gerente de Inclusão e Diversidade', sectorId: sector_131.id },
  })

  const sector_132 = await prisma.sector.upsert({
    where: { name: 'Iniciativas Sociais' },
    update: {},
    create: { name: 'Iniciativas Sociais' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Iniciativas Sociais' },
    update: {},
    create: { name: 'Estagiário de Iniciativas Sociais', sectorId: sector_132.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Iniciativas Sociais' },
    update: {},
    create: { name: 'Assistente de Iniciativas Sociais', sectorId: sector_132.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Iniciativas Sociais' },
    update: {},
    create: { name: 'Analista de Iniciativas Sociais', sectorId: sector_132.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Iniciativas Sociais' },
    update: {},
    create: { name: 'Coordenador de Iniciativas Sociais', sectorId: sector_132.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Iniciativas Sociais' },
    update: {},
    create: { name: 'Gerente de Iniciativas Sociais', sectorId: sector_132.id },
  })

  const sector_133 = await prisma.sector.upsert({
    where: { name: 'Injeção Plástica' },
    update: {},
    create: { name: 'Injeção Plástica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Injeção Plástica' },
    update: {},
    create: { name: 'Estagiário de Injeção Plástica', sectorId: sector_133.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Injeção Plástica' },
    update: {},
    create: { name: 'Assistente de Injeção Plástica', sectorId: sector_133.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Injeção Plástica' },
    update: {},
    create: { name: 'Analista de Injeção Plástica', sectorId: sector_133.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Injeção Plástica' },
    update: {},
    create: { name: 'Coordenador de Injeção Plástica', sectorId: sector_133.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Injeção Plástica' },
    update: {},
    create: { name: 'Gerente de Injeção Plástica', sectorId: sector_133.id },
  })

  const sector_134 = await prisma.sector.upsert({
    where: { name: 'Inovação' },
    update: {},
    create: { name: 'Inovação' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Inovação' },
    update: {},
    create: { name: 'Estagiário de Inovação', sectorId: sector_134.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Inovação' },
    update: {},
    create: { name: 'Assistente de Inovação', sectorId: sector_134.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Inovação' },
    update: {},
    create: { name: 'Analista de Inovação', sectorId: sector_134.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Inovação' },
    update: {},
    create: { name: 'Coordenador de Inovação', sectorId: sector_134.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Inovação' },
    update: {},
    create: { name: 'Gerente de Inovação', sectorId: sector_134.id },
  })

  const sector_135 = await prisma.sector.upsert({
    where: { name: 'Instalações Elétricas' },
    update: {},
    create: { name: 'Instalações Elétricas' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Instalações Elétricas' },
    update: {},
    create: { name: 'Estagiário de Instalações Elétricas', sectorId: sector_135.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Instalações Elétricas' },
    update: {},
    create: { name: 'Assistente de Instalações Elétricas', sectorId: sector_135.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Instalações Elétricas' },
    update: {},
    create: { name: 'Analista de Instalações Elétricas', sectorId: sector_135.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Instalações Elétricas' },
    update: {},
    create: { name: 'Coordenador de Instalações Elétricas', sectorId: sector_135.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Instalações Elétricas' },
    update: {},
    create: { name: 'Gerente de Instalações Elétricas', sectorId: sector_135.id },
  })

  const sector_136 = await prisma.sector.upsert({
    where: { name: 'Intercâmbio' },
    update: {},
    create: { name: 'Intercâmbio' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Intercâmbio' },
    update: {},
    create: { name: 'Estagiário de Intercâmbio', sectorId: sector_136.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Intercâmbio' },
    update: {},
    create: { name: 'Assistente de Intercâmbio', sectorId: sector_136.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Intercâmbio' },
    update: {},
    create: { name: 'Analista de Intercâmbio', sectorId: sector_136.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Intercâmbio' },
    update: {},
    create: { name: 'Coordenador de Intercâmbio', sectorId: sector_136.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Intercâmbio' },
    update: {},
    create: { name: 'Gerente de Intercâmbio', sectorId: sector_136.id },
  })

  const sector_137 = await prisma.sector.upsert({
    where: { name: 'Jardinagem' },
    update: {},
    create: { name: 'Jardinagem' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Jardinagem' },
    update: {},
    create: { name: 'Estagiário de Jardinagem', sectorId: sector_137.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Jardinagem' },
    update: {},
    create: { name: 'Assistente de Jardinagem', sectorId: sector_137.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Jardinagem' },
    update: {},
    create: { name: 'Analista de Jardinagem', sectorId: sector_137.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Jardinagem' },
    update: {},
    create: { name: 'Coordenador de Jardinagem', sectorId: sector_137.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Jardinagem' },
    update: {},
    create: { name: 'Gerente de Jardinagem', sectorId: sector_137.id },
  })

  const sector_138 = await prisma.sector.upsert({
    where: { name: 'Jurídico' },
    update: {},
    create: { name: 'Jurídico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Jurídico' },
    update: {},
    create: { name: 'Estagiário de Jurídico', sectorId: sector_138.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Jurídico' },
    update: {},
    create: { name: 'Assistente de Jurídico', sectorId: sector_138.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Jurídico' },
    update: {},
    create: { name: 'Analista de Jurídico', sectorId: sector_138.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Jurídico' },
    update: {},
    create: { name: 'Coordenador de Jurídico', sectorId: sector_138.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Jurídico' },
    update: {},
    create: { name: 'Gerente de Jurídico', sectorId: sector_138.id },
  })

  const sector_139 = await prisma.sector.upsert({
    where: { name: 'Laboratório de Análises Clínicas' },
    update: {},
    create: { name: 'Laboratório de Análises Clínicas' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Laboratório de Análises Clínicas' },
    update: {},
    create: { name: 'Estagiário de Laboratório de Análises Clínicas', sectorId: sector_139.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Laboratório de Análises Clínicas' },
    update: {},
    create: { name: 'Assistente de Laboratório de Análises Clínicas', sectorId: sector_139.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Laboratório de Análises Clínicas' },
    update: {},
    create: { name: 'Analista de Laboratório de Análises Clínicas', sectorId: sector_139.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Laboratório de Análises Clínicas' },
    update: {},
    create: { name: 'Coordenador de Laboratório de Análises Clínicas', sectorId: sector_139.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Laboratório de Análises Clínicas' },
    update: {},
    create: { name: 'Gerente de Laboratório de Análises Clínicas', sectorId: sector_139.id },
  })

  const sector_140 = await prisma.sector.upsert({
    where: { name: 'Legalização de Empresas' },
    update: {},
    create: { name: 'Legalização de Empresas' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Legalização de Empresas' },
    update: {},
    create: { name: 'Estagiário de Legalização de Empresas', sectorId: sector_140.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Legalização de Empresas' },
    update: {},
    create: { name: 'Assistente de Legalização de Empresas', sectorId: sector_140.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Legalização de Empresas' },
    update: {},
    create: { name: 'Analista de Legalização de Empresas', sectorId: sector_140.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Legalização de Empresas' },
    update: {},
    create: { name: 'Coordenador de Legalização de Empresas', sectorId: sector_140.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Legalização de Empresas' },
    update: {},
    create: { name: 'Gerente de Legalização de Empresas', sectorId: sector_140.id },
  })

  const sector_141 = await prisma.sector.upsert({
    where: { name: 'Limpeza' },
    update: {},
    create: { name: 'Limpeza' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Limpeza' },
    update: {},
    create: { name: 'Estagiário de Limpeza', sectorId: sector_141.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Limpeza' },
    update: {},
    create: { name: 'Assistente de Limpeza', sectorId: sector_141.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Limpeza' },
    update: {},
    create: { name: 'Analista de Limpeza', sectorId: sector_141.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Limpeza' },
    update: {},
    create: { name: 'Coordenador de Limpeza', sectorId: sector_141.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Limpeza' },
    update: {},
    create: { name: 'Gerente de Limpeza', sectorId: sector_141.id },
  })

  const sector_142 = await prisma.sector.upsert({
    where: { name: 'Logística' },
    update: {},
    create: { name: 'Logística' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Logística' },
    update: {},
    create: { name: 'Estagiário de Logística', sectorId: sector_142.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Logística' },
    update: {},
    create: { name: 'Assistente de Logística', sectorId: sector_142.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Logística' },
    update: {},
    create: { name: 'Analista de Logística', sectorId: sector_142.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Logística' },
    update: {},
    create: { name: 'Coordenador de Logística', sectorId: sector_142.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Logística' },
    update: {},
    create: { name: 'Gerente de Logística', sectorId: sector_142.id },
  })

  const sector_143 = await prisma.sector.upsert({
    where: { name: 'Logística Reversa' },
    update: {},
    create: { name: 'Logística Reversa' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Logística Reversa' },
    update: {},
    create: { name: 'Estagiário de Logística Reversa', sectorId: sector_143.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Logística Reversa' },
    update: {},
    create: { name: 'Assistente de Logística Reversa', sectorId: sector_143.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Logística Reversa' },
    update: {},
    create: { name: 'Analista de Logística Reversa', sectorId: sector_143.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Logística Reversa' },
    update: {},
    create: { name: 'Coordenador de Logística Reversa', sectorId: sector_143.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Logística Reversa' },
    update: {},
    create: { name: 'Gerente de Logística Reversa', sectorId: sector_143.id },
  })

  const sector_144 = await prisma.sector.upsert({
    where: { name: 'Manejo Florestal' },
    update: {},
    create: { name: 'Manejo Florestal' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Manejo Florestal' },
    update: {},
    create: { name: 'Estagiário de Manejo Florestal', sectorId: sector_144.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Manejo Florestal' },
    update: {},
    create: { name: 'Assistente de Manejo Florestal', sectorId: sector_144.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Manejo Florestal' },
    update: {},
    create: { name: 'Analista de Manejo Florestal', sectorId: sector_144.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Manejo Florestal' },
    update: {},
    create: { name: 'Coordenador de Manejo Florestal', sectorId: sector_144.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Manejo Florestal' },
    update: {},
    create: { name: 'Gerente de Manejo Florestal', sectorId: sector_144.id },
  })

  const sector_145 = await prisma.sector.upsert({
    where: { name: 'Manutenção' },
    update: {},
    create: { name: 'Manutenção' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Manutenção' },
    update: {},
    create: { name: 'Estagiário de Manutenção', sectorId: sector_145.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Manutenção' },
    update: {},
    create: { name: 'Assistente de Manutenção', sectorId: sector_145.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Manutenção' },
    update: {},
    create: { name: 'Analista de Manutenção', sectorId: sector_145.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Manutenção' },
    update: {},
    create: { name: 'Coordenador de Manutenção', sectorId: sector_145.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Manutenção' },
    update: {},
    create: { name: 'Gerente de Manutenção', sectorId: sector_145.id },
  })

  const sector_146 = await prisma.sector.upsert({
    where: { name: 'Manutenção Industrial' },
    update: {},
    create: { name: 'Manutenção Industrial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Manutenção Industrial' },
    update: {},
    create: { name: 'Estagiário de Manutenção Industrial', sectorId: sector_146.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Manutenção Industrial' },
    update: {},
    create: { name: 'Assistente de Manutenção Industrial', sectorId: sector_146.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Manutenção Industrial' },
    update: {},
    create: { name: 'Analista de Manutenção Industrial', sectorId: sector_146.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Manutenção Industrial' },
    update: {},
    create: { name: 'Coordenador de Manutenção Industrial', sectorId: sector_146.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Manutenção Industrial' },
    update: {},
    create: { name: 'Gerente de Manutenção Industrial', sectorId: sector_146.id },
  })

  const sector_147 = await prisma.sector.upsert({
    where: { name: 'Manutenção Predial' },
    update: {},
    create: { name: 'Manutenção Predial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Manutenção Predial' },
    update: {},
    create: { name: 'Estagiário de Manutenção Predial', sectorId: sector_147.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Manutenção Predial' },
    update: {},
    create: { name: 'Assistente de Manutenção Predial', sectorId: sector_147.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Manutenção Predial' },
    update: {},
    create: { name: 'Analista de Manutenção Predial', sectorId: sector_147.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Manutenção Predial' },
    update: {},
    create: { name: 'Coordenador de Manutenção Predial', sectorId: sector_147.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Manutenção Predial' },
    update: {},
    create: { name: 'Gerente de Manutenção Predial', sectorId: sector_147.id },
  })

  const sector_148 = await prisma.sector.upsert({
    where: { name: 'Marketing' },
    update: {},
    create: { name: 'Marketing' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Marketing' },
    update: {},
    create: { name: 'Estagiário de Marketing', sectorId: sector_148.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Marketing' },
    update: {},
    create: { name: 'Assistente de Marketing', sectorId: sector_148.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Marketing' },
    update: {},
    create: { name: 'Analista de Marketing', sectorId: sector_148.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Marketing' },
    update: {},
    create: { name: 'Coordenador de Marketing', sectorId: sector_148.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Marketing' },
    update: {},
    create: { name: 'Gerente de Marketing', sectorId: sector_148.id },
  })

  const sector_149 = await prisma.sector.upsert({
    where: { name: 'Marketing Digital' },
    update: {},
    create: { name: 'Marketing Digital' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Marketing Digital' },
    update: {},
    create: { name: 'Estagiário de Marketing Digital', sectorId: sector_149.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Marketing Digital' },
    update: {},
    create: { name: 'Assistente de Marketing Digital', sectorId: sector_149.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Marketing Digital' },
    update: {},
    create: { name: 'Analista de Marketing Digital', sectorId: sector_149.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Marketing Digital' },
    update: {},
    create: { name: 'Coordenador de Marketing Digital', sectorId: sector_149.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Marketing Digital' },
    update: {},
    create: { name: 'Gerente de Marketing Digital', sectorId: sector_149.id },
  })

  const sector_150 = await prisma.sector.upsert({
    where: { name: 'Matemática' },
    update: {},
    create: { name: 'Matemática' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Matemática' },
    update: {},
    create: { name: 'Estagiário de Matemática', sectorId: sector_150.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Matemática' },
    update: {},
    create: { name: 'Assistente de Matemática', sectorId: sector_150.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Matemática' },
    update: {},
    create: { name: 'Analista de Matemática', sectorId: sector_150.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Matemática' },
    update: {},
    create: { name: 'Coordenador de Matemática', sectorId: sector_150.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Matemática' },
    update: {},
    create: { name: 'Gerente de Matemática', sectorId: sector_150.id },
  })

  const sector_151 = await prisma.sector.upsert({
    where: { name: 'Mecânica Industrial' },
    update: {},
    create: { name: 'Mecânica Industrial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Mecânica Industrial' },
    update: {},
    create: { name: 'Estagiário de Mecânica Industrial', sectorId: sector_151.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Mecânica Industrial' },
    update: {},
    create: { name: 'Assistente de Mecânica Industrial', sectorId: sector_151.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Mecânica Industrial' },
    update: {},
    create: { name: 'Analista de Mecânica Industrial', sectorId: sector_151.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Mecânica Industrial' },
    update: {},
    create: { name: 'Coordenador de Mecânica Industrial', sectorId: sector_151.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Mecânica Industrial' },
    update: {},
    create: { name: 'Gerente de Mecânica Industrial', sectorId: sector_151.id },
  })

  const sector_152 = await prisma.sector.upsert({
    where: { name: 'Medicina do Trabalho' },
    update: {},
    create: { name: 'Medicina do Trabalho' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Medicina do Trabalho' },
    update: {},
    create: { name: 'Estagiário de Medicina do Trabalho', sectorId: sector_152.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Medicina do Trabalho' },
    update: {},
    create: { name: 'Assistente de Medicina do Trabalho', sectorId: sector_152.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Medicina do Trabalho' },
    update: {},
    create: { name: 'Analista de Medicina do Trabalho', sectorId: sector_152.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Medicina do Trabalho' },
    update: {},
    create: { name: 'Coordenador de Medicina do Trabalho', sectorId: sector_152.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Medicina do Trabalho' },
    update: {},
    create: { name: 'Gerente de Medicina do Trabalho', sectorId: sector_152.id },
  })

  const sector_153 = await prisma.sector.upsert({
    where: { name: 'Meio Ambiente' },
    update: {},
    create: { name: 'Meio Ambiente' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Meio Ambiente' },
    update: {},
    create: { name: 'Estagiário de Meio Ambiente', sectorId: sector_153.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Meio Ambiente' },
    update: {},
    create: { name: 'Assistente de Meio Ambiente', sectorId: sector_153.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Meio Ambiente' },
    update: {},
    create: { name: 'Analista de Meio Ambiente', sectorId: sector_153.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Meio Ambiente' },
    update: {},
    create: { name: 'Coordenador de Meio Ambiente', sectorId: sector_153.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Meio Ambiente' },
    update: {},
    create: { name: 'Gerente de Meio Ambiente', sectorId: sector_153.id },
  })

  const sector_154 = await prisma.sector.upsert({
    where: { name: 'Mestre de Obras' },
    update: {},
    create: { name: 'Mestre de Obras' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Mestre de Obras' },
    update: {},
    create: { name: 'Estagiário de Mestre de Obras', sectorId: sector_154.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Mestre de Obras' },
    update: {},
    create: { name: 'Assistente de Mestre de Obras', sectorId: sector_154.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Mestre de Obras' },
    update: {},
    create: { name: 'Analista de Mestre de Obras', sectorId: sector_154.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Mestre de Obras' },
    update: {},
    create: { name: 'Coordenador de Mestre de Obras', sectorId: sector_154.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Mestre de Obras' },
    update: {},
    create: { name: 'Gerente de Mestre de Obras', sectorId: sector_154.id },
  })

  const sector_155 = await prisma.sector.upsert({
    where: { name: 'Moda e Vestuário' },
    update: {},
    create: { name: 'Moda e Vestuário' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Moda e Vestuário' },
    update: {},
    create: { name: 'Estagiário de Moda e Vestuário', sectorId: sector_155.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Moda e Vestuário' },
    update: {},
    create: { name: 'Assistente de Moda e Vestuário', sectorId: sector_155.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Moda e Vestuário' },
    update: {},
    create: { name: 'Analista de Moda e Vestuário', sectorId: sector_155.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Moda e Vestuário' },
    update: {},
    create: { name: 'Coordenador de Moda e Vestuário', sectorId: sector_155.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Moda e Vestuário' },
    update: {},
    create: { name: 'Gerente de Moda e Vestuário', sectorId: sector_155.id },
  })

  const sector_156 = await prisma.sector.upsert({
    where: { name: 'Montagem Industrial' },
    update: {},
    create: { name: 'Montagem Industrial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Montagem Industrial' },
    update: {},
    create: { name: 'Estagiário de Montagem Industrial', sectorId: sector_156.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Montagem Industrial' },
    update: {},
    create: { name: 'Assistente de Montagem Industrial', sectorId: sector_156.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Montagem Industrial' },
    update: {},
    create: { name: 'Analista de Montagem Industrial', sectorId: sector_156.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Montagem Industrial' },
    update: {},
    create: { name: 'Coordenador de Montagem Industrial', sectorId: sector_156.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Montagem Industrial' },
    update: {},
    create: { name: 'Gerente de Montagem Industrial', sectorId: sector_156.id },
  })

  const sector_157 = await prisma.sector.upsert({
    where: { name: 'Motorista' },
    update: {},
    create: { name: 'Motorista' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Motorista' },
    update: {},
    create: { name: 'Estagiário de Motorista', sectorId: sector_157.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Motorista' },
    update: {},
    create: { name: 'Assistente de Motorista', sectorId: sector_157.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Motorista' },
    update: {},
    create: { name: 'Analista de Motorista', sectorId: sector_157.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Motorista' },
    update: {},
    create: { name: 'Coordenador de Motorista', sectorId: sector_157.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Motorista' },
    update: {},
    create: { name: 'Gerente de Motorista', sectorId: sector_157.id },
  })

  const sector_158 = await prisma.sector.upsert({
    where: { name: 'Motorista Carreteiro' },
    update: {},
    create: { name: 'Motorista Carreteiro' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Motorista Carreteiro' },
    update: {},
    create: { name: 'Estagiário de Motorista Carreteiro', sectorId: sector_158.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Motorista Carreteiro' },
    update: {},
    create: { name: 'Assistente de Motorista Carreteiro', sectorId: sector_158.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Motorista Carreteiro' },
    update: {},
    create: { name: 'Analista de Motorista Carreteiro', sectorId: sector_158.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Motorista Carreteiro' },
    update: {},
    create: { name: 'Coordenador de Motorista Carreteiro', sectorId: sector_158.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Motorista Carreteiro' },
    update: {},
    create: { name: 'Gerente de Motorista Carreteiro', sectorId: sector_158.id },
  })

  const sector_159 = await prisma.sector.upsert({
    where: { name: 'Motorista de Entrega' },
    update: {},
    create: { name: 'Motorista de Entrega' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Motorista de Entrega' },
    update: {},
    create: { name: 'Estagiário de Motorista de Entrega', sectorId: sector_159.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Motorista de Entrega' },
    update: {},
    create: { name: 'Assistente de Motorista de Entrega', sectorId: sector_159.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Motorista de Entrega' },
    update: {},
    create: { name: 'Analista de Motorista de Entrega', sectorId: sector_159.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Motorista de Entrega' },
    update: {},
    create: { name: 'Coordenador de Motorista de Entrega', sectorId: sector_159.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Motorista de Entrega' },
    update: {},
    create: { name: 'Gerente de Motorista de Entrega', sectorId: sector_159.id },
  })

  const sector_160 = await prisma.sector.upsert({
    where: { name: 'Médico Clínico' },
    update: {},
    create: { name: 'Médico Clínico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Médico Clínico' },
    update: {},
    create: { name: 'Estagiário de Médico Clínico', sectorId: sector_160.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Médico Clínico' },
    update: {},
    create: { name: 'Assistente de Médico Clínico', sectorId: sector_160.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Médico Clínico' },
    update: {},
    create: { name: 'Analista de Médico Clínico', sectorId: sector_160.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Médico Clínico' },
    update: {},
    create: { name: 'Coordenador de Médico Clínico', sectorId: sector_160.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Médico Clínico' },
    update: {},
    create: { name: 'Gerente de Médico Clínico', sectorId: sector_160.id },
  })

  const sector_161 = await prisma.sector.upsert({
    where: { name: 'Médico Especialista' },
    update: {},
    create: { name: 'Médico Especialista' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Médico Especialista' },
    update: {},
    create: { name: 'Estagiário de Médico Especialista', sectorId: sector_161.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Médico Especialista' },
    update: {},
    create: { name: 'Assistente de Médico Especialista', sectorId: sector_161.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Médico Especialista' },
    update: {},
    create: { name: 'Analista de Médico Especialista', sectorId: sector_161.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Médico Especialista' },
    update: {},
    create: { name: 'Coordenador de Médico Especialista', sectorId: sector_161.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Médico Especialista' },
    update: {},
    create: { name: 'Gerente de Médico Especialista', sectorId: sector_161.id },
  })

  const sector_162 = await prisma.sector.upsert({
    where: { name: 'Natação' },
    update: {},
    create: { name: 'Natação' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Natação' },
    update: {},
    create: { name: 'Estagiário de Natação', sectorId: sector_162.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Natação' },
    update: {},
    create: { name: 'Assistente de Natação', sectorId: sector_162.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Natação' },
    update: {},
    create: { name: 'Analista de Natação', sectorId: sector_162.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Natação' },
    update: {},
    create: { name: 'Coordenador de Natação', sectorId: sector_162.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Natação' },
    update: {},
    create: { name: 'Gerente de Natação', sectorId: sector_162.id },
  })

  const sector_163 = await prisma.sector.upsert({
    where: { name: 'Nutrição Clínica' },
    update: {},
    create: { name: 'Nutrição Clínica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Nutrição Clínica' },
    update: {},
    create: { name: 'Estagiário de Nutrição Clínica', sectorId: sector_163.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Nutrição Clínica' },
    update: {},
    create: { name: 'Assistente de Nutrição Clínica', sectorId: sector_163.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Nutrição Clínica' },
    update: {},
    create: { name: 'Analista de Nutrição Clínica', sectorId: sector_163.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Nutrição Clínica' },
    update: {},
    create: { name: 'Coordenador de Nutrição Clínica', sectorId: sector_163.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Nutrição Clínica' },
    update: {},
    create: { name: 'Gerente de Nutrição Clínica', sectorId: sector_163.id },
  })

  const sector_164 = await prisma.sector.upsert({
    where: { name: 'ONGs' },
    update: {},
    create: { name: 'ONGs' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de ONGs' },
    update: {},
    create: { name: 'Estagiário de ONGs', sectorId: sector_164.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de ONGs' },
    update: {},
    create: { name: 'Assistente de ONGs', sectorId: sector_164.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de ONGs' },
    update: {},
    create: { name: 'Analista de ONGs', sectorId: sector_164.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de ONGs' },
    update: {},
    create: { name: 'Coordenador de ONGs', sectorId: sector_164.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de ONGs' },
    update: {},
    create: { name: 'Gerente de ONGs', sectorId: sector_164.id },
  })

  const sector_165 = await prisma.sector.upsert({
    where: { name: 'Obras' },
    update: {},
    create: { name: 'Obras' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Obras' },
    update: {},
    create: { name: 'Estagiário de Obras', sectorId: sector_165.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Obras' },
    update: {},
    create: { name: 'Assistente de Obras', sectorId: sector_165.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Obras' },
    update: {},
    create: { name: 'Analista de Obras', sectorId: sector_165.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Obras' },
    update: {},
    create: { name: 'Coordenador de Obras', sectorId: sector_165.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Obras' },
    update: {},
    create: { name: 'Gerente de Obras', sectorId: sector_165.id },
  })

  const sector_166 = await prisma.sector.upsert({
    where: { name: 'Odontologia' },
    update: {},
    create: { name: 'Odontologia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Odontologia' },
    update: {},
    create: { name: 'Estagiário de Odontologia', sectorId: sector_166.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Odontologia' },
    update: {},
    create: { name: 'Assistente de Odontologia', sectorId: sector_166.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Odontologia' },
    update: {},
    create: { name: 'Analista de Odontologia', sectorId: sector_166.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Odontologia' },
    update: {},
    create: { name: 'Coordenador de Odontologia', sectorId: sector_166.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Odontologia' },
    update: {},
    create: { name: 'Gerente de Odontologia', sectorId: sector_166.id },
  })

  const sector_167 = await prisma.sector.upsert({
    where: { name: 'Operador de Empilhadeira' },
    update: {},
    create: { name: 'Operador de Empilhadeira' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Operador de Empilhadeira' },
    update: {},
    create: { name: 'Estagiário de Operador de Empilhadeira', sectorId: sector_167.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Operador de Empilhadeira' },
    update: {},
    create: { name: 'Assistente de Operador de Empilhadeira', sectorId: sector_167.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Operador de Empilhadeira' },
    update: {},
    create: { name: 'Analista de Operador de Empilhadeira', sectorId: sector_167.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Operador de Empilhadeira' },
    update: {},
    create: { name: 'Coordenador de Operador de Empilhadeira', sectorId: sector_167.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Operador de Empilhadeira' },
    update: {},
    create: { name: 'Gerente de Operador de Empilhadeira', sectorId: sector_167.id },
  })

  const sector_168 = await prisma.sector.upsert({
    where: { name: 'Operador de Máquinas' },
    update: {},
    create: { name: 'Operador de Máquinas' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Operador de Máquinas' },
    update: {},
    create: { name: 'Estagiário de Operador de Máquinas', sectorId: sector_168.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Operador de Máquinas' },
    update: {},
    create: { name: 'Assistente de Operador de Máquinas', sectorId: sector_168.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Operador de Máquinas' },
    update: {},
    create: { name: 'Analista de Operador de Máquinas', sectorId: sector_168.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Operador de Máquinas' },
    update: {},
    create: { name: 'Coordenador de Operador de Máquinas', sectorId: sector_168.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Operador de Máquinas' },
    update: {},
    create: { name: 'Gerente de Operador de Máquinas', sectorId: sector_168.id },
  })

  const sector_169 = await prisma.sector.upsert({
    where: { name: 'Operador de Trator' },
    update: {},
    create: { name: 'Operador de Trator' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Operador de Trator' },
    update: {},
    create: { name: 'Estagiário de Operador de Trator', sectorId: sector_169.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Operador de Trator' },
    update: {},
    create: { name: 'Assistente de Operador de Trator', sectorId: sector_169.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Operador de Trator' },
    update: {},
    create: { name: 'Analista de Operador de Trator', sectorId: sector_169.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Operador de Trator' },
    update: {},
    create: { name: 'Coordenador de Operador de Trator', sectorId: sector_169.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Operador de Trator' },
    update: {},
    create: { name: 'Gerente de Operador de Trator', sectorId: sector_169.id },
  })

  const sector_170 = await prisma.sector.upsert({
    where: { name: 'Operações' },
    update: {},
    create: { name: 'Operações' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Operações' },
    update: {},
    create: { name: 'Estagiário de Operações', sectorId: sector_170.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Operações' },
    update: {},
    create: { name: 'Assistente de Operações', sectorId: sector_170.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Operações' },
    update: {},
    create: { name: 'Analista de Operações', sectorId: sector_170.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Operações' },
    update: {},
    create: { name: 'Coordenador de Operações', sectorId: sector_170.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Operações' },
    update: {},
    create: { name: 'Gerente de Operações', sectorId: sector_170.id },
  })

  const sector_171 = await prisma.sector.upsert({
    where: { name: 'PCM' },
    update: {},
    create: { name: 'PCM' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de PCM' },
    update: {},
    create: { name: 'Estagiário de PCM', sectorId: sector_171.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de PCM' },
    update: {},
    create: { name: 'Assistente de PCM', sectorId: sector_171.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de PCM' },
    update: {},
    create: { name: 'Analista de PCM', sectorId: sector_171.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de PCM' },
    update: {},
    create: { name: 'Coordenador de PCM', sectorId: sector_171.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de PCM' },
    update: {},
    create: { name: 'Gerente de PCM', sectorId: sector_171.id },
  })

  const sector_172 = await prisma.sector.upsert({
    where: { name: 'PMO' },
    update: {},
    create: { name: 'PMO' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de PMO' },
    update: {},
    create: { name: 'Estagiário de PMO', sectorId: sector_172.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de PMO' },
    update: {},
    create: { name: 'Assistente de PMO', sectorId: sector_172.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de PMO' },
    update: {},
    create: { name: 'Analista de PMO', sectorId: sector_172.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de PMO' },
    update: {},
    create: { name: 'Coordenador de PMO', sectorId: sector_172.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de PMO' },
    update: {},
    create: { name: 'Gerente de PMO', sectorId: sector_172.id },
  })

  const sector_173 = await prisma.sector.upsert({
    where: { name: 'Panificação' },
    update: {},
    create: { name: 'Panificação' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Panificação' },
    update: {},
    create: { name: 'Estagiário de Panificação', sectorId: sector_173.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Panificação' },
    update: {},
    create: { name: 'Assistente de Panificação', sectorId: sector_173.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Panificação' },
    update: {},
    create: { name: 'Analista de Panificação', sectorId: sector_173.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Panificação' },
    update: {},
    create: { name: 'Coordenador de Panificação', sectorId: sector_173.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Panificação' },
    update: {},
    create: { name: 'Gerente de Panificação', sectorId: sector_173.id },
  })

  const sector_174 = await prisma.sector.upsert({
    where: { name: 'Paralegal' },
    update: {},
    create: { name: 'Paralegal' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Paralegal' },
    update: {},
    create: { name: 'Estagiário de Paralegal', sectorId: sector_174.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Paralegal' },
    update: {},
    create: { name: 'Assistente de Paralegal', sectorId: sector_174.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Paralegal' },
    update: {},
    create: { name: 'Analista de Paralegal', sectorId: sector_174.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Paralegal' },
    update: {},
    create: { name: 'Coordenador de Paralegal', sectorId: sector_174.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Paralegal' },
    update: {},
    create: { name: 'Gerente de Paralegal', sectorId: sector_174.id },
  })

  const sector_175 = await prisma.sector.upsert({
    where: { name: 'Pedreiro' },
    update: {},
    create: { name: 'Pedreiro' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Pedreiro' },
    update: {},
    create: { name: 'Estagiário de Pedreiro', sectorId: sector_175.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Pedreiro' },
    update: {},
    create: { name: 'Assistente de Pedreiro', sectorId: sector_175.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Pedreiro' },
    update: {},
    create: { name: 'Analista de Pedreiro', sectorId: sector_175.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Pedreiro' },
    update: {},
    create: { name: 'Coordenador de Pedreiro', sectorId: sector_175.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Pedreiro' },
    update: {},
    create: { name: 'Gerente de Pedreiro', sectorId: sector_175.id },
  })

  const sector_176 = await prisma.sector.upsert({
    where: { name: 'Pesquisa de Mercado' },
    update: {},
    create: { name: 'Pesquisa de Mercado' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Pesquisa de Mercado' },
    update: {},
    create: { name: 'Estagiário de Pesquisa de Mercado', sectorId: sector_176.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Pesquisa de Mercado' },
    update: {},
    create: { name: 'Assistente de Pesquisa de Mercado', sectorId: sector_176.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Pesquisa de Mercado' },
    update: {},
    create: { name: 'Analista de Pesquisa de Mercado', sectorId: sector_176.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Pesquisa de Mercado' },
    update: {},
    create: { name: 'Coordenador de Pesquisa de Mercado', sectorId: sector_176.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Pesquisa de Mercado' },
    update: {},
    create: { name: 'Gerente de Pesquisa de Mercado', sectorId: sector_176.id },
  })

  const sector_177 = await prisma.sector.upsert({
    where: { name: 'Pilates' },
    update: {},
    create: { name: 'Pilates' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Pilates' },
    update: {},
    create: { name: 'Estagiário de Pilates', sectorId: sector_177.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Pilates' },
    update: {},
    create: { name: 'Assistente de Pilates', sectorId: sector_177.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Pilates' },
    update: {},
    create: { name: 'Analista de Pilates', sectorId: sector_177.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Pilates' },
    update: {},
    create: { name: 'Coordenador de Pilates', sectorId: sector_177.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Pilates' },
    update: {},
    create: { name: 'Gerente de Pilates', sectorId: sector_177.id },
  })

  const sector_178 = await prisma.sector.upsert({
    where: { name: 'Pintura' },
    update: {},
    create: { name: 'Pintura' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Pintura' },
    update: {},
    create: { name: 'Estagiário de Pintura', sectorId: sector_178.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Pintura' },
    update: {},
    create: { name: 'Assistente de Pintura', sectorId: sector_178.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Pintura' },
    update: {},
    create: { name: 'Analista de Pintura', sectorId: sector_178.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Pintura' },
    update: {},
    create: { name: 'Coordenador de Pintura', sectorId: sector_178.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Pintura' },
    update: {},
    create: { name: 'Gerente de Pintura', sectorId: sector_178.id },
  })

  const sector_179 = await prisma.sector.upsert({
    where: { name: 'Planejamento' },
    update: {},
    create: { name: 'Planejamento' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Planejamento' },
    update: {},
    create: { name: 'Estagiário de Planejamento', sectorId: sector_179.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Planejamento' },
    update: {},
    create: { name: 'Assistente de Planejamento', sectorId: sector_179.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Planejamento' },
    update: {},
    create: { name: 'Analista de Planejamento', sectorId: sector_179.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Planejamento' },
    update: {},
    create: { name: 'Coordenador de Planejamento', sectorId: sector_179.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Planejamento' },
    update: {},
    create: { name: 'Gerente de Planejamento', sectorId: sector_179.id },
  })

  const sector_180 = await prisma.sector.upsert({
    where: { name: 'Planejamento Estratégico' },
    update: {},
    create: { name: 'Planejamento Estratégico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Planejamento Estratégico' },
    update: {},
    create: { name: 'Estagiário de Planejamento Estratégico', sectorId: sector_180.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Planejamento Estratégico' },
    update: {},
    create: { name: 'Assistente de Planejamento Estratégico', sectorId: sector_180.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Planejamento Estratégico' },
    update: {},
    create: { name: 'Analista de Planejamento Estratégico', sectorId: sector_180.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Planejamento Estratégico' },
    update: {},
    create: { name: 'Coordenador de Planejamento Estratégico', sectorId: sector_180.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Planejamento Estratégico' },
    update: {},
    create: { name: 'Gerente de Planejamento Estratégico', sectorId: sector_180.id },
  })

  const sector_181 = await prisma.sector.upsert({
    where: { name: 'Planejamento de Obras' },
    update: {},
    create: { name: 'Planejamento de Obras' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Planejamento de Obras' },
    update: {},
    create: { name: 'Estagiário de Planejamento de Obras', sectorId: sector_181.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Planejamento de Obras' },
    update: {},
    create: { name: 'Assistente de Planejamento de Obras', sectorId: sector_181.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Planejamento de Obras' },
    update: {},
    create: { name: 'Analista de Planejamento de Obras', sectorId: sector_181.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Planejamento de Obras' },
    update: {},
    create: { name: 'Coordenador de Planejamento de Obras', sectorId: sector_181.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Planejamento de Obras' },
    update: {},
    create: { name: 'Gerente de Planejamento de Obras', sectorId: sector_181.id },
  })

  const sector_182 = await prisma.sector.upsert({
    where: { name: 'Plantio Florestal' },
    update: {},
    create: { name: 'Plantio Florestal' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Plantio Florestal' },
    update: {},
    create: { name: 'Estagiário de Plantio Florestal', sectorId: sector_182.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Plantio Florestal' },
    update: {},
    create: { name: 'Assistente de Plantio Florestal', sectorId: sector_182.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Plantio Florestal' },
    update: {},
    create: { name: 'Analista de Plantio Florestal', sectorId: sector_182.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Plantio Florestal' },
    update: {},
    create: { name: 'Coordenador de Plantio Florestal', sectorId: sector_182.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Plantio Florestal' },
    update: {},
    create: { name: 'Gerente de Plantio Florestal', sectorId: sector_182.id },
  })

  const sector_183 = await prisma.sector.upsert({
    where: { name: 'Portaria' },
    update: {},
    create: { name: 'Portaria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Portaria' },
    update: {},
    create: { name: 'Estagiário de Portaria', sectorId: sector_183.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Portaria' },
    update: {},
    create: { name: 'Assistente de Portaria', sectorId: sector_183.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Portaria' },
    update: {},
    create: { name: 'Analista de Portaria', sectorId: sector_183.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Portaria' },
    update: {},
    create: { name: 'Coordenador de Portaria', sectorId: sector_183.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Portaria' },
    update: {},
    create: { name: 'Gerente de Portaria', sectorId: sector_183.id },
  })

  const sector_184 = await prisma.sector.upsert({
    where: { name: 'Procuradoria' },
    update: {},
    create: { name: 'Procuradoria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Procuradoria' },
    update: {},
    create: { name: 'Estagiário de Procuradoria', sectorId: sector_184.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Procuradoria' },
    update: {},
    create: { name: 'Assistente de Procuradoria', sectorId: sector_184.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Procuradoria' },
    update: {},
    create: { name: 'Analista de Procuradoria', sectorId: sector_184.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Procuradoria' },
    update: {},
    create: { name: 'Coordenador de Procuradoria', sectorId: sector_184.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Procuradoria' },
    update: {},
    create: { name: 'Gerente de Procuradoria', sectorId: sector_184.id },
  })

  const sector_185 = await prisma.sector.upsert({
    where: { name: 'Produto' },
    update: {},
    create: { name: 'Produto' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Produto' },
    update: {},
    create: { name: 'Estagiário de Produto', sectorId: sector_185.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Produto' },
    update: {},
    create: { name: 'Assistente de Produto', sectorId: sector_185.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Produto' },
    update: {},
    create: { name: 'Analista de Produto', sectorId: sector_185.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Produto' },
    update: {},
    create: { name: 'Coordenador de Produto', sectorId: sector_185.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Produto' },
    update: {},
    create: { name: 'Gerente de Produto', sectorId: sector_185.id },
  })

  const sector_186 = await prisma.sector.upsert({
    where: { name: 'Produção' },
    update: {},
    create: { name: 'Produção' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Produção' },
    update: {},
    create: { name: 'Estagiário de Produção', sectorId: sector_186.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Produção' },
    update: {},
    create: { name: 'Assistente de Produção', sectorId: sector_186.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Produção' },
    update: {},
    create: { name: 'Analista de Produção', sectorId: sector_186.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Produção' },
    update: {},
    create: { name: 'Coordenador de Produção', sectorId: sector_186.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Produção' },
    update: {},
    create: { name: 'Gerente de Produção', sectorId: sector_186.id },
  })

  const sector_187 = await prisma.sector.upsert({
    where: { name: 'Produção Audiovisual' },
    update: {},
    create: { name: 'Produção Audiovisual' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Produção Audiovisual' },
    update: {},
    create: { name: 'Estagiário de Produção Audiovisual', sectorId: sector_187.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Produção Audiovisual' },
    update: {},
    create: { name: 'Assistente de Produção Audiovisual', sectorId: sector_187.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Produção Audiovisual' },
    update: {},
    create: { name: 'Analista de Produção Audiovisual', sectorId: sector_187.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Produção Audiovisual' },
    update: {},
    create: { name: 'Coordenador de Produção Audiovisual', sectorId: sector_187.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Produção Audiovisual' },
    update: {},
    create: { name: 'Gerente de Produção Audiovisual', sectorId: sector_187.id },
  })

  const sector_188 = await prisma.sector.upsert({
    where: { name: 'Produção Cultural' },
    update: {},
    create: { name: 'Produção Cultural' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Produção Cultural' },
    update: {},
    create: { name: 'Estagiário de Produção Cultural', sectorId: sector_188.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Produção Cultural' },
    update: {},
    create: { name: 'Assistente de Produção Cultural', sectorId: sector_188.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Produção Cultural' },
    update: {},
    create: { name: 'Analista de Produção Cultural', sectorId: sector_188.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Produção Cultural' },
    update: {},
    create: { name: 'Coordenador de Produção Cultural', sectorId: sector_188.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Produção Cultural' },
    update: {},
    create: { name: 'Gerente de Produção Cultural', sectorId: sector_188.id },
  })

  const sector_189 = await prisma.sector.upsert({
    where: { name: 'Produção Rural' },
    update: {},
    create: { name: 'Produção Rural' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Produção Rural' },
    update: {},
    create: { name: 'Estagiário de Produção Rural', sectorId: sector_189.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Produção Rural' },
    update: {},
    create: { name: 'Assistente de Produção Rural', sectorId: sector_189.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Produção Rural' },
    update: {},
    create: { name: 'Analista de Produção Rural', sectorId: sector_189.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Produção Rural' },
    update: {},
    create: { name: 'Coordenador de Produção Rural', sectorId: sector_189.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Produção Rural' },
    update: {},
    create: { name: 'Gerente de Produção Rural', sectorId: sector_189.id },
  })

  const sector_190 = await prisma.sector.upsert({
    where: { name: 'Projetos' },
    update: {},
    create: { name: 'Projetos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Projetos' },
    update: {},
    create: { name: 'Estagiário de Projetos', sectorId: sector_190.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Projetos' },
    update: {},
    create: { name: 'Assistente de Projetos', sectorId: sector_190.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Projetos' },
    update: {},
    create: { name: 'Analista de Projetos', sectorId: sector_190.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Projetos' },
    update: {},
    create: { name: 'Coordenador de Projetos', sectorId: sector_190.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Projetos' },
    update: {},
    create: { name: 'Gerente de Projetos', sectorId: sector_190.id },
  })

  const sector_191 = await prisma.sector.upsert({
    where: { name: 'Projetos Sustentáveis' },
    update: {},
    create: { name: 'Projetos Sustentáveis' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Projetos Sustentáveis' },
    update: {},
    create: { name: 'Estagiário de Projetos Sustentáveis', sectorId: sector_191.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Projetos Sustentáveis' },
    update: {},
    create: { name: 'Assistente de Projetos Sustentáveis', sectorId: sector_191.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Projetos Sustentáveis' },
    update: {},
    create: { name: 'Analista de Projetos Sustentáveis', sectorId: sector_191.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Projetos Sustentáveis' },
    update: {},
    create: { name: 'Coordenador de Projetos Sustentáveis', sectorId: sector_191.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Projetos Sustentáveis' },
    update: {},
    create: { name: 'Gerente de Projetos Sustentáveis', sectorId: sector_191.id },
  })

  const sector_192 = await prisma.sector.upsert({
    where: { name: 'Projetos de Construção' },
    update: {},
    create: { name: 'Projetos de Construção' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Projetos de Construção' },
    update: {},
    create: { name: 'Estagiário de Projetos de Construção', sectorId: sector_192.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Projetos de Construção' },
    update: {},
    create: { name: 'Assistente de Projetos de Construção', sectorId: sector_192.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Projetos de Construção' },
    update: {},
    create: { name: 'Analista de Projetos de Construção', sectorId: sector_192.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Projetos de Construção' },
    update: {},
    create: { name: 'Coordenador de Projetos de Construção', sectorId: sector_192.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Projetos de Construção' },
    update: {},
    create: { name: 'Gerente de Projetos de Construção', sectorId: sector_192.id },
  })

  const sector_193 = await prisma.sector.upsert({
    where: { name: 'Prontuário Eletrônico' },
    update: {},
    create: { name: 'Prontuário Eletrônico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Prontuário Eletrônico' },
    update: {},
    create: { name: 'Estagiário de Prontuário Eletrônico', sectorId: sector_193.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Prontuário Eletrônico' },
    update: {},
    create: { name: 'Assistente de Prontuário Eletrônico', sectorId: sector_193.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Prontuário Eletrônico' },
    update: {},
    create: { name: 'Analista de Prontuário Eletrônico', sectorId: sector_193.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Prontuário Eletrônico' },
    update: {},
    create: { name: 'Coordenador de Prontuário Eletrônico', sectorId: sector_193.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Prontuário Eletrônico' },
    update: {},
    create: { name: 'Gerente de Prontuário Eletrônico', sectorId: sector_193.id },
  })

  const sector_194 = await prisma.sector.upsert({
    where: { name: 'Psicologia Clínica' },
    update: {},
    create: { name: 'Psicologia Clínica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Psicologia Clínica' },
    update: {},
    create: { name: 'Estagiário de Psicologia Clínica', sectorId: sector_194.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Psicologia Clínica' },
    update: {},
    create: { name: 'Assistente de Psicologia Clínica', sectorId: sector_194.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Psicologia Clínica' },
    update: {},
    create: { name: 'Analista de Psicologia Clínica', sectorId: sector_194.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Psicologia Clínica' },
    update: {},
    create: { name: 'Coordenador de Psicologia Clínica', sectorId: sector_194.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Psicologia Clínica' },
    update: {},
    create: { name: 'Gerente de Psicologia Clínica', sectorId: sector_194.id },
  })

  const sector_195 = await prisma.sector.upsert({
    where: { name: 'Psicologia Organizacional' },
    update: {},
    create: { name: 'Psicologia Organizacional' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Psicologia Organizacional' },
    update: {},
    create: { name: 'Estagiário de Psicologia Organizacional', sectorId: sector_195.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Psicologia Organizacional' },
    update: {},
    create: { name: 'Assistente de Psicologia Organizacional', sectorId: sector_195.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Psicologia Organizacional' },
    update: {},
    create: { name: 'Analista de Psicologia Organizacional', sectorId: sector_195.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Psicologia Organizacional' },
    update: {},
    create: { name: 'Coordenador de Psicologia Organizacional', sectorId: sector_195.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Psicologia Organizacional' },
    update: {},
    create: { name: 'Gerente de Psicologia Organizacional', sectorId: sector_195.id },
  })

  const sector_196 = await prisma.sector.upsert({
    where: { name: 'Psicopedagogia' },
    update: {},
    create: { name: 'Psicopedagogia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Psicopedagogia' },
    update: {},
    create: { name: 'Estagiário de Psicopedagogia', sectorId: sector_196.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Psicopedagogia' },
    update: {},
    create: { name: 'Assistente de Psicopedagogia', sectorId: sector_196.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Psicopedagogia' },
    update: {},
    create: { name: 'Analista de Psicopedagogia', sectorId: sector_196.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Psicopedagogia' },
    update: {},
    create: { name: 'Coordenador de Psicopedagogia', sectorId: sector_196.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Psicopedagogia' },
    update: {},
    create: { name: 'Gerente de Psicopedagogia', sectorId: sector_196.id },
  })

  const sector_197 = await prisma.sector.upsert({
    where: { name: 'Pós-Venda' },
    update: {},
    create: { name: 'Pós-Venda' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Pós-Venda' },
    update: {},
    create: { name: 'Estagiário de Pós-Venda', sectorId: sector_197.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Pós-Venda' },
    update: {},
    create: { name: 'Assistente de Pós-Venda', sectorId: sector_197.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Pós-Venda' },
    update: {},
    create: { name: 'Analista de Pós-Venda', sectorId: sector_197.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Pós-Venda' },
    update: {},
    create: { name: 'Coordenador de Pós-Venda', sectorId: sector_197.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Pós-Venda' },
    update: {},
    create: { name: 'Gerente de Pós-Venda', sectorId: sector_197.id },
  })

  const sector_198 = await prisma.sector.upsert({
    where: { name: 'QA/Testes' },
    update: {},
    create: { name: 'QA/Testes' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de QA/Testes' },
    update: {},
    create: { name: 'Estagiário de QA/Testes', sectorId: sector_198.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de QA/Testes' },
    update: {},
    create: { name: 'Assistente de QA/Testes', sectorId: sector_198.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de QA/Testes' },
    update: {},
    create: { name: 'Analista de QA/Testes', sectorId: sector_198.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de QA/Testes' },
    update: {},
    create: { name: 'Coordenador de QA/Testes', sectorId: sector_198.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de QA/Testes' },
    update: {},
    create: { name: 'Gerente de QA/Testes', sectorId: sector_198.id },
  })

  const sector_199 = await prisma.sector.upsert({
    where: { name: 'Qualidade' },
    update: {},
    create: { name: 'Qualidade' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Qualidade' },
    update: {},
    create: { name: 'Estagiário de Qualidade', sectorId: sector_199.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Qualidade' },
    update: {},
    create: { name: 'Assistente de Qualidade', sectorId: sector_199.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Qualidade' },
    update: {},
    create: { name: 'Analista de Qualidade', sectorId: sector_199.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Qualidade' },
    update: {},
    create: { name: 'Coordenador de Qualidade', sectorId: sector_199.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Qualidade' },
    update: {},
    create: { name: 'Gerente de Qualidade', sectorId: sector_199.id },
  })

  const sector_200 = await prisma.sector.upsert({
    where: { name: 'Química' },
    update: {},
    create: { name: 'Química' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Química' },
    update: {},
    create: { name: 'Estagiário de Química', sectorId: sector_200.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Química' },
    update: {},
    create: { name: 'Assistente de Química', sectorId: sector_200.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Química' },
    update: {},
    create: { name: 'Analista de Química', sectorId: sector_200.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Química' },
    update: {},
    create: { name: 'Coordenador de Química', sectorId: sector_200.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Química' },
    update: {},
    create: { name: 'Gerente de Química', sectorId: sector_200.id },
  })

  const sector_201 = await prisma.sector.upsert({
    where: { name: 'RH Estratégico' },
    update: {},
    create: { name: 'RH Estratégico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de RH Estratégico' },
    update: {},
    create: { name: 'Estagiário de RH Estratégico', sectorId: sector_201.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de RH Estratégico' },
    update: {},
    create: { name: 'Assistente de RH Estratégico', sectorId: sector_201.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de RH Estratégico' },
    update: {},
    create: { name: 'Analista de RH Estratégico', sectorId: sector_201.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de RH Estratégico' },
    update: {},
    create: { name: 'Coordenador de RH Estratégico', sectorId: sector_201.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de RH Estratégico' },
    update: {},
    create: { name: 'Gerente de RH Estratégico', sectorId: sector_201.id },
  })

  const sector_202 = await prisma.sector.upsert({
    where: { name: 'Radiologia' },
    update: {},
    create: { name: 'Radiologia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Radiologia' },
    update: {},
    create: { name: 'Estagiário de Radiologia', sectorId: sector_202.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Radiologia' },
    update: {},
    create: { name: 'Assistente de Radiologia', sectorId: sector_202.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Radiologia' },
    update: {},
    create: { name: 'Analista de Radiologia', sectorId: sector_202.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Radiologia' },
    update: {},
    create: { name: 'Coordenador de Radiologia', sectorId: sector_202.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Radiologia' },
    update: {},
    create: { name: 'Gerente de Radiologia', sectorId: sector_202.id },
  })

  const sector_203 = await prisma.sector.upsert({
    where: { name: 'Recepção Clínica' },
    update: {},
    create: { name: 'Recepção Clínica' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Recepção Clínica' },
    update: {},
    create: { name: 'Estagiário de Recepção Clínica', sectorId: sector_203.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Recepção Clínica' },
    update: {},
    create: { name: 'Assistente de Recepção Clínica', sectorId: sector_203.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Recepção Clínica' },
    update: {},
    create: { name: 'Analista de Recepção Clínica', sectorId: sector_203.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Recepção Clínica' },
    update: {},
    create: { name: 'Coordenador de Recepção Clínica', sectorId: sector_203.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Recepção Clínica' },
    update: {},
    create: { name: 'Gerente de Recepção Clínica', sectorId: sector_203.id },
  })

  const sector_204 = await prisma.sector.upsert({
    where: { name: 'Recepção de Hotel' },
    update: {},
    create: { name: 'Recepção de Hotel' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Recepção de Hotel' },
    update: {},
    create: { name: 'Estagiário de Recepção de Hotel', sectorId: sector_204.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Recepção de Hotel' },
    update: {},
    create: { name: 'Assistente de Recepção de Hotel', sectorId: sector_204.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Recepção de Hotel' },
    update: {},
    create: { name: 'Analista de Recepção de Hotel', sectorId: sector_204.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Recepção de Hotel' },
    update: {},
    create: { name: 'Coordenador de Recepção de Hotel', sectorId: sector_204.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Recepção de Hotel' },
    update: {},
    create: { name: 'Gerente de Recepção de Hotel', sectorId: sector_204.id },
  })

  const sector_205 = await prisma.sector.upsert({
    where: { name: 'Recrutamento e Seleção' },
    update: {},
    create: { name: 'Recrutamento e Seleção' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Recrutamento e Seleção' },
    update: {},
    create: { name: 'Estagiário de Recrutamento e Seleção', sectorId: sector_205.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Recrutamento e Seleção' },
    update: {},
    create: { name: 'Assistente de Recrutamento e Seleção', sectorId: sector_205.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Recrutamento e Seleção' },
    update: {},
    create: { name: 'Analista de Recrutamento e Seleção', sectorId: sector_205.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Recrutamento e Seleção' },
    update: {},
    create: { name: 'Coordenador de Recrutamento e Seleção', sectorId: sector_205.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Recrutamento e Seleção' },
    update: {},
    create: { name: 'Gerente de Recrutamento e Seleção', sectorId: sector_205.id },
  })

  const sector_206 = await prisma.sector.upsert({
    where: { name: 'Recursos Humanos' },
    update: {},
    create: { name: 'Recursos Humanos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Recursos Humanos' },
    update: {},
    create: { name: 'Estagiário de Recursos Humanos', sectorId: sector_206.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Recursos Humanos' },
    update: {},
    create: { name: 'Assistente de Recursos Humanos', sectorId: sector_206.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Recursos Humanos' },
    update: {},
    create: { name: 'Analista de Recursos Humanos', sectorId: sector_206.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Recursos Humanos' },
    update: {},
    create: { name: 'Coordenador de Recursos Humanos', sectorId: sector_206.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Recursos Humanos' },
    update: {},
    create: { name: 'Gerente de Recursos Humanos', sectorId: sector_206.id },
  })

  const sector_207 = await prisma.sector.upsert({
    where: { name: 'Refrigeração' },
    update: {},
    create: { name: 'Refrigeração' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Refrigeração' },
    update: {},
    create: { name: 'Estagiário de Refrigeração', sectorId: sector_207.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Refrigeração' },
    update: {},
    create: { name: 'Assistente de Refrigeração', sectorId: sector_207.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Refrigeração' },
    update: {},
    create: { name: 'Analista de Refrigeração', sectorId: sector_207.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Refrigeração' },
    update: {},
    create: { name: 'Coordenador de Refrigeração', sectorId: sector_207.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Refrigeração' },
    update: {},
    create: { name: 'Gerente de Refrigeração', sectorId: sector_207.id },
  })

  const sector_208 = await prisma.sector.upsert({
    where: { name: 'Relacionamento com o Cliente' },
    update: {},
    create: { name: 'Relacionamento com o Cliente' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Relacionamento com o Cliente' },
    update: {},
    create: { name: 'Estagiário de Relacionamento com o Cliente', sectorId: sector_208.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Relacionamento com o Cliente' },
    update: {},
    create: { name: 'Assistente de Relacionamento com o Cliente', sectorId: sector_208.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Relacionamento com o Cliente' },
    update: {},
    create: { name: 'Analista de Relacionamento com o Cliente', sectorId: sector_208.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Relacionamento com o Cliente' },
    update: {},
    create: { name: 'Coordenador de Relacionamento com o Cliente', sectorId: sector_208.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Relacionamento com o Cliente' },
    update: {},
    create: { name: 'Gerente de Relacionamento com o Cliente', sectorId: sector_208.id },
  })

  const sector_209 = await prisma.sector.upsert({
    where: { name: 'Representação Comercial' },
    update: {},
    create: { name: 'Representação Comercial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Representação Comercial' },
    update: {},
    create: { name: 'Estagiário de Representação Comercial', sectorId: sector_209.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Representação Comercial' },
    update: {},
    create: { name: 'Assistente de Representação Comercial', sectorId: sector_209.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Representação Comercial' },
    update: {},
    create: { name: 'Analista de Representação Comercial', sectorId: sector_209.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Representação Comercial' },
    update: {},
    create: { name: 'Coordenador de Representação Comercial', sectorId: sector_209.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Representação Comercial' },
    update: {},
    create: { name: 'Gerente de Representação Comercial', sectorId: sector_209.id },
  })

  const sector_210 = await prisma.sector.upsert({
    where: { name: 'Reservas' },
    update: {},
    create: { name: 'Reservas' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Reservas' },
    update: {},
    create: { name: 'Estagiário de Reservas', sectorId: sector_210.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Reservas' },
    update: {},
    create: { name: 'Assistente de Reservas', sectorId: sector_210.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Reservas' },
    update: {},
    create: { name: 'Analista de Reservas', sectorId: sector_210.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Reservas' },
    update: {},
    create: { name: 'Coordenador de Reservas', sectorId: sector_210.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Reservas' },
    update: {},
    create: { name: 'Gerente de Reservas', sectorId: sector_210.id },
  })

  const sector_211 = await prisma.sector.upsert({
    where: { name: 'Roteirização' },
    update: {},
    create: { name: 'Roteirização' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Roteirização' },
    update: {},
    create: { name: 'Estagiário de Roteirização', sectorId: sector_211.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Roteirização' },
    update: {},
    create: { name: 'Assistente de Roteirização', sectorId: sector_211.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Roteirização' },
    update: {},
    create: { name: 'Analista de Roteirização', sectorId: sector_211.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Roteirização' },
    update: {},
    create: { name: 'Coordenador de Roteirização', sectorId: sector_211.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Roteirização' },
    update: {},
    create: { name: 'Gerente de Roteirização', sectorId: sector_211.id },
  })

  const sector_212 = await prisma.sector.upsert({
    where: { name: 'SAC' },
    update: {},
    create: { name: 'SAC' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de SAC' },
    update: {},
    create: { name: 'Estagiário de SAC', sectorId: sector_212.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de SAC' },
    update: {},
    create: { name: 'Assistente de SAC', sectorId: sector_212.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de SAC' },
    update: {},
    create: { name: 'Analista de SAC', sectorId: sector_212.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de SAC' },
    update: {},
    create: { name: 'Coordenador de SAC', sectorId: sector_212.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de SAC' },
    update: {},
    create: { name: 'Gerente de SAC', sectorId: sector_212.id },
  })

  const sector_213 = await prisma.sector.upsert({
    where: { name: 'Salão de Beleza' },
    update: {},
    create: { name: 'Salão de Beleza' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Salão de Beleza' },
    update: {},
    create: { name: 'Estagiário de Salão de Beleza', sectorId: sector_213.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Salão de Beleza' },
    update: {},
    create: { name: 'Assistente de Salão de Beleza', sectorId: sector_213.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Salão de Beleza' },
    update: {},
    create: { name: 'Analista de Salão de Beleza', sectorId: sector_213.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Salão de Beleza' },
    update: {},
    create: { name: 'Coordenador de Salão de Beleza', sectorId: sector_213.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Salão de Beleza' },
    update: {},
    create: { name: 'Gerente de Salão de Beleza', sectorId: sector_213.id },
  })

  const sector_214 = await prisma.sector.upsert({
    where: { name: 'Saúde e Segurança do Trabalho' },
    update: {},
    create: { name: 'Saúde e Segurança do Trabalho' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Saúde e Segurança do Trabalho' },
    update: {},
    create: { name: 'Estagiário de Saúde e Segurança do Trabalho', sectorId: sector_214.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Saúde e Segurança do Trabalho' },
    update: {},
    create: { name: 'Assistente de Saúde e Segurança do Trabalho', sectorId: sector_214.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Saúde e Segurança do Trabalho' },
    update: {},
    create: { name: 'Analista de Saúde e Segurança do Trabalho', sectorId: sector_214.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Saúde e Segurança do Trabalho' },
    update: {},
    create: { name: 'Coordenador de Saúde e Segurança do Trabalho', sectorId: sector_214.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Saúde e Segurança do Trabalho' },
    update: {},
    create: { name: 'Gerente de Saúde e Segurança do Trabalho', sectorId: sector_214.id },
  })

  const sector_215 = await prisma.sector.upsert({
    where: { name: 'Segurança Patrimonial' },
    update: {},
    create: { name: 'Segurança Patrimonial' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Segurança Patrimonial' },
    update: {},
    create: { name: 'Estagiário de Segurança Patrimonial', sectorId: sector_215.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Segurança Patrimonial' },
    update: {},
    create: { name: 'Assistente de Segurança Patrimonial', sectorId: sector_215.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Segurança Patrimonial' },
    update: {},
    create: { name: 'Analista de Segurança Patrimonial', sectorId: sector_215.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Segurança Patrimonial' },
    update: {},
    create: { name: 'Coordenador de Segurança Patrimonial', sectorId: sector_215.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Segurança Patrimonial' },
    update: {},
    create: { name: 'Gerente de Segurança Patrimonial', sectorId: sector_215.id },
  })

  const sector_216 = await prisma.sector.upsert({
    where: { name: 'Segurança da Informação' },
    update: {},
    create: { name: 'Segurança da Informação' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Segurança da Informação' },
    update: {},
    create: { name: 'Estagiário de Segurança da Informação', sectorId: sector_216.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Segurança da Informação' },
    update: {},
    create: { name: 'Assistente de Segurança da Informação', sectorId: sector_216.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Segurança da Informação' },
    update: {},
    create: { name: 'Analista de Segurança da Informação', sectorId: sector_216.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Segurança da Informação' },
    update: {},
    create: { name: 'Coordenador de Segurança da Informação', sectorId: sector_216.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Segurança da Informação' },
    update: {},
    create: { name: 'Gerente de Segurança da Informação', sectorId: sector_216.id },
  })

  const sector_217 = await prisma.sector.upsert({
    where: { name: 'Separação de Pedidos' },
    update: {},
    create: { name: 'Separação de Pedidos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Separação de Pedidos' },
    update: {},
    create: { name: 'Estagiário de Separação de Pedidos', sectorId: sector_217.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Separação de Pedidos' },
    update: {},
    create: { name: 'Assistente de Separação de Pedidos', sectorId: sector_217.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Separação de Pedidos' },
    update: {},
    create: { name: 'Analista de Separação de Pedidos', sectorId: sector_217.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Separação de Pedidos' },
    update: {},
    create: { name: 'Coordenador de Separação de Pedidos', sectorId: sector_217.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Separação de Pedidos' },
    update: {},
    create: { name: 'Gerente de Separação de Pedidos', sectorId: sector_217.id },
  })

  const sector_218 = await prisma.sector.upsert({
    where: { name: 'Servente de Obras' },
    update: {},
    create: { name: 'Servente de Obras' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Servente de Obras' },
    update: {},
    create: { name: 'Estagiário de Servente de Obras', sectorId: sector_218.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Servente de Obras' },
    update: {},
    create: { name: 'Assistente de Servente de Obras', sectorId: sector_218.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Servente de Obras' },
    update: {},
    create: { name: 'Analista de Servente de Obras', sectorId: sector_218.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Servente de Obras' },
    update: {},
    create: { name: 'Coordenador de Servente de Obras', sectorId: sector_218.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Servente de Obras' },
    update: {},
    create: { name: 'Gerente de Servente de Obras', sectorId: sector_218.id },
  })

  const sector_219 = await prisma.sector.upsert({
    where: { name: 'Serviços Autônomos' },
    update: {},
    create: { name: 'Serviços Autônomos' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Serviços Autônomos' },
    update: {},
    create: { name: 'Estagiário de Serviços Autônomos', sectorId: sector_219.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Serviços Autônomos' },
    update: {},
    create: { name: 'Assistente de Serviços Autônomos', sectorId: sector_219.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Serviços Autônomos' },
    update: {},
    create: { name: 'Analista de Serviços Autônomos', sectorId: sector_219.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Serviços Autônomos' },
    update: {},
    create: { name: 'Coordenador de Serviços Autônomos', sectorId: sector_219.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Serviços Autônomos' },
    update: {},
    create: { name: 'Gerente de Serviços Autônomos', sectorId: sector_219.id },
  })

  const sector_220 = await prisma.sector.upsert({
    where: { name: 'Serviços Gerais' },
    update: {},
    create: { name: 'Serviços Gerais' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Serviços Gerais' },
    update: {},
    create: { name: 'Estagiário de Serviços Gerais', sectorId: sector_220.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Serviços Gerais' },
    update: {},
    create: { name: 'Assistente de Serviços Gerais', sectorId: sector_220.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Serviços Gerais' },
    update: {},
    create: { name: 'Analista de Serviços Gerais', sectorId: sector_220.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Serviços Gerais' },
    update: {},
    create: { name: 'Coordenador de Serviços Gerais', sectorId: sector_220.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Serviços Gerais' },
    update: {},
    create: { name: 'Gerente de Serviços Gerais', sectorId: sector_220.id },
  })

  const sector_221 = await prisma.sector.upsert({
    where: { name: 'Serviços Terceirizados' },
    update: {},
    create: { name: 'Serviços Terceirizados' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Serviços Terceirizados' },
    update: {},
    create: { name: 'Estagiário de Serviços Terceirizados', sectorId: sector_221.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Serviços Terceirizados' },
    update: {},
    create: { name: 'Assistente de Serviços Terceirizados', sectorId: sector_221.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Serviços Terceirizados' },
    update: {},
    create: { name: 'Analista de Serviços Terceirizados', sectorId: sector_221.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Serviços Terceirizados' },
    update: {},
    create: { name: 'Coordenador de Serviços Terceirizados', sectorId: sector_221.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Serviços Terceirizados' },
    update: {},
    create: { name: 'Gerente de Serviços Terceirizados', sectorId: sector_221.id },
  })

  const sector_222 = await prisma.sector.upsert({
    where: { name: 'Soldagem' },
    update: {},
    create: { name: 'Soldagem' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Soldagem' },
    update: {},
    create: { name: 'Estagiário de Soldagem', sectorId: sector_222.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Soldagem' },
    update: {},
    create: { name: 'Assistente de Soldagem', sectorId: sector_222.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Soldagem' },
    update: {},
    create: { name: 'Analista de Soldagem', sectorId: sector_222.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Soldagem' },
    update: {},
    create: { name: 'Coordenador de Soldagem', sectorId: sector_222.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Soldagem' },
    update: {},
    create: { name: 'Gerente de Soldagem', sectorId: sector_222.id },
  })

  const sector_223 = await prisma.sector.upsert({
    where: { name: 'Sommelier' },
    update: {},
    create: { name: 'Sommelier' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Sommelier' },
    update: {},
    create: { name: 'Estagiário de Sommelier', sectorId: sector_223.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Sommelier' },
    update: {},
    create: { name: 'Assistente de Sommelier', sectorId: sector_223.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Sommelier' },
    update: {},
    create: { name: 'Analista de Sommelier', sectorId: sector_223.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Sommelier' },
    update: {},
    create: { name: 'Coordenador de Sommelier', sectorId: sector_223.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Sommelier' },
    update: {},
    create: { name: 'Gerente de Sommelier', sectorId: sector_223.id },
  })

  const sector_224 = await prisma.sector.upsert({
    where: { name: 'Startups' },
    update: {},
    create: { name: 'Startups' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Startups' },
    update: {},
    create: { name: 'Estagiário de Startups', sectorId: sector_224.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Startups' },
    update: {},
    create: { name: 'Assistente de Startups', sectorId: sector_224.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Startups' },
    update: {},
    create: { name: 'Analista de Startups', sectorId: sector_224.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Startups' },
    update: {},
    create: { name: 'Coordenador de Startups', sectorId: sector_224.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Startups' },
    update: {},
    create: { name: 'Gerente de Startups', sectorId: sector_224.id },
  })

  const sector_225 = await prisma.sector.upsert({
    where: { name: 'Supply Chain' },
    update: {},
    create: { name: 'Supply Chain' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Supply Chain' },
    update: {},
    create: { name: 'Estagiário de Supply Chain', sectorId: sector_225.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Supply Chain' },
    update: {},
    create: { name: 'Assistente de Supply Chain', sectorId: sector_225.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Supply Chain' },
    update: {},
    create: { name: 'Analista de Supply Chain', sectorId: sector_225.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Supply Chain' },
    update: {},
    create: { name: 'Coordenador de Supply Chain', sectorId: sector_225.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Supply Chain' },
    update: {},
    create: { name: 'Gerente de Supply Chain', sectorId: sector_225.id },
  })

  const sector_226 = await prisma.sector.upsert({
    where: { name: 'Sustentabilidade' },
    update: {},
    create: { name: 'Sustentabilidade' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Sustentabilidade' },
    update: {},
    create: { name: 'Estagiário de Sustentabilidade', sectorId: sector_226.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Sustentabilidade' },
    update: {},
    create: { name: 'Assistente de Sustentabilidade', sectorId: sector_226.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Sustentabilidade' },
    update: {},
    create: { name: 'Analista de Sustentabilidade', sectorId: sector_226.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Sustentabilidade' },
    update: {},
    create: { name: 'Coordenador de Sustentabilidade', sectorId: sector_226.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Sustentabilidade' },
    update: {},
    create: { name: 'Gerente de Sustentabilidade', sectorId: sector_226.id },
  })

  const sector_227 = await prisma.sector.upsert({
    where: { name: 'TI - Desenvolvimento' },
    update: {},
    create: { name: 'TI - Desenvolvimento' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de TI - Desenvolvimento' },
    update: {},
    create: { name: 'Estagiário de TI - Desenvolvimento', sectorId: sector_227.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de TI - Desenvolvimento' },
    update: {},
    create: { name: 'Assistente de TI - Desenvolvimento', sectorId: sector_227.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de TI - Desenvolvimento' },
    update: {},
    create: { name: 'Analista de TI - Desenvolvimento', sectorId: sector_227.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de TI - Desenvolvimento' },
    update: {},
    create: { name: 'Coordenador de TI - Desenvolvimento', sectorId: sector_227.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de TI - Desenvolvimento' },
    update: {},
    create: { name: 'Gerente de TI - Desenvolvimento', sectorId: sector_227.id },
  })

  const sector_228 = await prisma.sector.upsert({
    where: { name: 'TI - Infraestrutura' },
    update: {},
    create: { name: 'TI - Infraestrutura' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de TI - Infraestrutura' },
    update: {},
    create: { name: 'Estagiário de TI - Infraestrutura', sectorId: sector_228.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de TI - Infraestrutura' },
    update: {},
    create: { name: 'Assistente de TI - Infraestrutura', sectorId: sector_228.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de TI - Infraestrutura' },
    update: {},
    create: { name: 'Analista de TI - Infraestrutura', sectorId: sector_228.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de TI - Infraestrutura' },
    update: {},
    create: { name: 'Coordenador de TI - Infraestrutura', sectorId: sector_228.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de TI - Infraestrutura' },
    update: {},
    create: { name: 'Gerente de TI - Infraestrutura', sectorId: sector_228.id },
  })

  const sector_229 = await prisma.sector.upsert({
    where: { name: 'TI - Suporte' },
    update: {},
    create: { name: 'TI - Suporte' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de TI - Suporte' },
    update: {},
    create: { name: 'Estagiário de TI - Suporte', sectorId: sector_229.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de TI - Suporte' },
    update: {},
    create: { name: 'Assistente de TI - Suporte', sectorId: sector_229.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de TI - Suporte' },
    update: {},
    create: { name: 'Analista de TI - Suporte', sectorId: sector_229.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de TI - Suporte' },
    update: {},
    create: { name: 'Coordenador de TI - Suporte', sectorId: sector_229.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de TI - Suporte' },
    update: {},
    create: { name: 'Gerente de TI - Suporte', sectorId: sector_229.id },
  })

  const sector_230 = await prisma.sector.upsert({
    where: { name: 'Telemarketing' },
    update: {},
    create: { name: 'Telemarketing' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Telemarketing' },
    update: {},
    create: { name: 'Estagiário de Telemarketing', sectorId: sector_230.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Telemarketing' },
    update: {},
    create: { name: 'Assistente de Telemarketing', sectorId: sector_230.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Telemarketing' },
    update: {},
    create: { name: 'Analista de Telemarketing', sectorId: sector_230.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Telemarketing' },
    update: {},
    create: { name: 'Coordenador de Telemarketing', sectorId: sector_230.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Telemarketing' },
    update: {},
    create: { name: 'Gerente de Telemarketing', sectorId: sector_230.id },
  })

  const sector_231 = await prisma.sector.upsert({
    where: { name: 'Terapias Alternativas' },
    update: {},
    create: { name: 'Terapias Alternativas' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Terapias Alternativas' },
    update: {},
    create: { name: 'Estagiário de Terapias Alternativas', sectorId: sector_231.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Terapias Alternativas' },
    update: {},
    create: { name: 'Assistente de Terapias Alternativas', sectorId: sector_231.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Terapias Alternativas' },
    update: {},
    create: { name: 'Analista de Terapias Alternativas', sectorId: sector_231.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Terapias Alternativas' },
    update: {},
    create: { name: 'Coordenador de Terapias Alternativas', sectorId: sector_231.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Terapias Alternativas' },
    update: {},
    create: { name: 'Gerente de Terapias Alternativas', sectorId: sector_231.id },
  })

  const sector_232 = await prisma.sector.upsert({
    where: { name: 'Tesouraria' },
    update: {},
    create: { name: 'Tesouraria' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Tesouraria' },
    update: {},
    create: { name: 'Estagiário de Tesouraria', sectorId: sector_232.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Tesouraria' },
    update: {},
    create: { name: 'Assistente de Tesouraria', sectorId: sector_232.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Tesouraria' },
    update: {},
    create: { name: 'Analista de Tesouraria', sectorId: sector_232.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Tesouraria' },
    update: {},
    create: { name: 'Coordenador de Tesouraria', sectorId: sector_232.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Tesouraria' },
    update: {},
    create: { name: 'Gerente de Tesouraria', sectorId: sector_232.id },
  })

  const sector_233 = await prisma.sector.upsert({
    where: { name: 'Topografia' },
    update: {},
    create: { name: 'Topografia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Topografia' },
    update: {},
    create: { name: 'Estagiário de Topografia', sectorId: sector_233.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Topografia' },
    update: {},
    create: { name: 'Assistente de Topografia', sectorId: sector_233.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Topografia' },
    update: {},
    create: { name: 'Analista de Topografia', sectorId: sector_233.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Topografia' },
    update: {},
    create: { name: 'Coordenador de Topografia', sectorId: sector_233.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Topografia' },
    update: {},
    create: { name: 'Gerente de Topografia', sectorId: sector_233.id },
  })

  const sector_234 = await prisma.sector.upsert({
    where: { name: 'Trabalho Temporário' },
    update: {},
    create: { name: 'Trabalho Temporário' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Trabalho Temporário' },
    update: {},
    create: { name: 'Estagiário de Trabalho Temporário', sectorId: sector_234.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Trabalho Temporário' },
    update: {},
    create: { name: 'Assistente de Trabalho Temporário', sectorId: sector_234.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Trabalho Temporário' },
    update: {},
    create: { name: 'Analista de Trabalho Temporário', sectorId: sector_234.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Trabalho Temporário' },
    update: {},
    create: { name: 'Coordenador de Trabalho Temporário', sectorId: sector_234.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Trabalho Temporário' },
    update: {},
    create: { name: 'Gerente de Trabalho Temporário', sectorId: sector_234.id },
  })

  const sector_235 = await prisma.sector.upsert({
    where: { name: 'Tradução e Interpretação' },
    update: {},
    create: { name: 'Tradução e Interpretação' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Tradução e Interpretação' },
    update: {},
    create: { name: 'Estagiário de Tradução e Interpretação', sectorId: sector_235.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Tradução e Interpretação' },
    update: {},
    create: { name: 'Assistente de Tradução e Interpretação', sectorId: sector_235.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Tradução e Interpretação' },
    update: {},
    create: { name: 'Analista de Tradução e Interpretação', sectorId: sector_235.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Tradução e Interpretação' },
    update: {},
    create: { name: 'Coordenador de Tradução e Interpretação', sectorId: sector_235.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Tradução e Interpretação' },
    update: {},
    create: { name: 'Gerente de Tradução e Interpretação', sectorId: sector_235.id },
  })

  const sector_236 = await prisma.sector.upsert({
    where: { name: 'Transportadora' },
    update: {},
    create: { name: 'Transportadora' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Transportadora' },
    update: {},
    create: { name: 'Estagiário de Transportadora', sectorId: sector_236.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Transportadora' },
    update: {},
    create: { name: 'Assistente de Transportadora', sectorId: sector_236.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Transportadora' },
    update: {},
    create: { name: 'Analista de Transportadora', sectorId: sector_236.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Transportadora' },
    update: {},
    create: { name: 'Coordenador de Transportadora', sectorId: sector_236.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Transportadora' },
    update: {},
    create: { name: 'Gerente de Transportadora', sectorId: sector_236.id },
  })

  const sector_237 = await prisma.sector.upsert({
    where: { name: 'Treinamento Corporativo' },
    update: {},
    create: { name: 'Treinamento Corporativo' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Treinamento Corporativo' },
    update: {},
    create: { name: 'Estagiário de Treinamento Corporativo', sectorId: sector_237.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Treinamento Corporativo' },
    update: {},
    create: { name: 'Assistente de Treinamento Corporativo', sectorId: sector_237.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Treinamento Corporativo' },
    update: {},
    create: { name: 'Analista de Treinamento Corporativo', sectorId: sector_237.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Treinamento Corporativo' },
    update: {},
    create: { name: 'Coordenador de Treinamento Corporativo', sectorId: sector_237.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Treinamento Corporativo' },
    update: {},
    create: { name: 'Gerente de Treinamento Corporativo', sectorId: sector_237.id },
  })

  const sector_238 = await prisma.sector.upsert({
    where: { name: 'Treinamento Técnico' },
    update: {},
    create: { name: 'Treinamento Técnico' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Treinamento Técnico' },
    update: {},
    create: { name: 'Estagiário de Treinamento Técnico', sectorId: sector_238.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Treinamento Técnico' },
    update: {},
    create: { name: 'Assistente de Treinamento Técnico', sectorId: sector_238.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Treinamento Técnico' },
    update: {},
    create: { name: 'Analista de Treinamento Técnico', sectorId: sector_238.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Treinamento Técnico' },
    update: {},
    create: { name: 'Coordenador de Treinamento Técnico', sectorId: sector_238.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Treinamento Técnico' },
    update: {},
    create: { name: 'Gerente de Treinamento Técnico', sectorId: sector_238.id },
  })

  const sector_239 = await prisma.sector.upsert({
    where: { name: 'Treinamento e Desenvolvimento' },
    update: {},
    create: { name: 'Treinamento e Desenvolvimento' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Treinamento e Desenvolvimento' },
    update: {},
    create: { name: 'Estagiário de Treinamento e Desenvolvimento', sectorId: sector_239.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Treinamento e Desenvolvimento' },
    update: {},
    create: { name: 'Assistente de Treinamento e Desenvolvimento', sectorId: sector_239.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Treinamento e Desenvolvimento' },
    update: {},
    create: { name: 'Analista de Treinamento e Desenvolvimento', sectorId: sector_239.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Treinamento e Desenvolvimento' },
    update: {},
    create: { name: 'Coordenador de Treinamento e Desenvolvimento', sectorId: sector_239.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Treinamento e Desenvolvimento' },
    update: {},
    create: { name: 'Gerente de Treinamento e Desenvolvimento', sectorId: sector_239.id },
  })

  const sector_240 = await prisma.sector.upsert({
    where: { name: 'Turismo' },
    update: {},
    create: { name: 'Turismo' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Turismo' },
    update: {},
    create: { name: 'Estagiário de Turismo', sectorId: sector_240.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Turismo' },
    update: {},
    create: { name: 'Assistente de Turismo', sectorId: sector_240.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Turismo' },
    update: {},
    create: { name: 'Analista de Turismo', sectorId: sector_240.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Turismo' },
    update: {},
    create: { name: 'Coordenador de Turismo', sectorId: sector_240.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Turismo' },
    update: {},
    create: { name: 'Gerente de Turismo', sectorId: sector_240.id },
  })

  const sector_241 = await prisma.sector.upsert({
    where: { name: 'Turismo Receptivo' },
    update: {},
    create: { name: 'Turismo Receptivo' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Turismo Receptivo' },
    update: {},
    create: { name: 'Estagiário de Turismo Receptivo', sectorId: sector_241.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Turismo Receptivo' },
    update: {},
    create: { name: 'Assistente de Turismo Receptivo', sectorId: sector_241.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Turismo Receptivo' },
    update: {},
    create: { name: 'Analista de Turismo Receptivo', sectorId: sector_241.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Turismo Receptivo' },
    update: {},
    create: { name: 'Coordenador de Turismo Receptivo', sectorId: sector_241.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Turismo Receptivo' },
    update: {},
    create: { name: 'Gerente de Turismo Receptivo', sectorId: sector_241.id },
  })

  const sector_242 = await prisma.sector.upsert({
    where: { name: 'Técnico Agrícola' },
    update: {},
    create: { name: 'Técnico Agrícola' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Técnico Agrícola' },
    update: {},
    create: { name: 'Estagiário de Técnico Agrícola', sectorId: sector_242.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Técnico Agrícola' },
    update: {},
    create: { name: 'Assistente de Técnico Agrícola', sectorId: sector_242.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Técnico Agrícola' },
    update: {},
    create: { name: 'Analista de Técnico Agrícola', sectorId: sector_242.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Técnico Agrícola' },
    update: {},
    create: { name: 'Coordenador de Técnico Agrícola', sectorId: sector_242.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Técnico Agrícola' },
    update: {},
    create: { name: 'Gerente de Técnico Agrícola', sectorId: sector_242.id },
  })

  const sector_243 = await prisma.sector.upsert({
    where: { name: 'Técnico de Enfermagem' },
    update: {},
    create: { name: 'Técnico de Enfermagem' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Técnico de Enfermagem' },
    update: {},
    create: { name: 'Estagiário de Técnico de Enfermagem', sectorId: sector_243.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Técnico de Enfermagem' },
    update: {},
    create: { name: 'Assistente de Técnico de Enfermagem', sectorId: sector_243.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Técnico de Enfermagem' },
    update: {},
    create: { name: 'Analista de Técnico de Enfermagem', sectorId: sector_243.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Técnico de Enfermagem' },
    update: {},
    create: { name: 'Coordenador de Técnico de Enfermagem', sectorId: sector_243.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Técnico de Enfermagem' },
    update: {},
    create: { name: 'Gerente de Técnico de Enfermagem', sectorId: sector_243.id },
  })

  const sector_244 = await prisma.sector.upsert({
    where: { name: 'UX/UI Design' },
    update: {},
    create: { name: 'UX/UI Design' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de UX/UI Design' },
    update: {},
    create: { name: 'Estagiário de UX/UI Design', sectorId: sector_244.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de UX/UI Design' },
    update: {},
    create: { name: 'Assistente de UX/UI Design', sectorId: sector_244.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de UX/UI Design' },
    update: {},
    create: { name: 'Analista de UX/UI Design', sectorId: sector_244.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de UX/UI Design' },
    update: {},
    create: { name: 'Coordenador de UX/UI Design', sectorId: sector_244.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de UX/UI Design' },
    update: {},
    create: { name: 'Gerente de UX/UI Design', sectorId: sector_244.id },
  })

  const sector_245 = await prisma.sector.upsert({
    where: { name: 'Usinagem' },
    update: {},
    create: { name: 'Usinagem' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Usinagem' },
    update: {},
    create: { name: 'Estagiário de Usinagem', sectorId: sector_245.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Usinagem' },
    update: {},
    create: { name: 'Assistente de Usinagem', sectorId: sector_245.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Usinagem' },
    update: {},
    create: { name: 'Analista de Usinagem', sectorId: sector_245.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Usinagem' },
    update: {},
    create: { name: 'Coordenador de Usinagem', sectorId: sector_245.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Usinagem' },
    update: {},
    create: { name: 'Gerente de Usinagem', sectorId: sector_245.id },
  })

  const sector_246 = await prisma.sector.upsert({
    where: { name: 'Varejo' },
    update: {},
    create: { name: 'Varejo' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Varejo' },
    update: {},
    create: { name: 'Estagiário de Varejo', sectorId: sector_246.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Varejo' },
    update: {},
    create: { name: 'Assistente de Varejo', sectorId: sector_246.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Varejo' },
    update: {},
    create: { name: 'Analista de Varejo', sectorId: sector_246.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Varejo' },
    update: {},
    create: { name: 'Coordenador de Varejo', sectorId: sector_246.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Varejo' },
    update: {},
    create: { name: 'Gerente de Varejo', sectorId: sector_246.id },
  })

  const sector_247 = await prisma.sector.upsert({
    where: { name: 'Vendas' },
    update: {},
    create: { name: 'Vendas' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Vendas' },
    update: {},
    create: { name: 'Estagiário de Vendas', sectorId: sector_247.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Vendas' },
    update: {},
    create: { name: 'Assistente de Vendas', sectorId: sector_247.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Vendas' },
    update: {},
    create: { name: 'Analista de Vendas', sectorId: sector_247.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Vendas' },
    update: {},
    create: { name: 'Coordenador de Vendas', sectorId: sector_247.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Vendas' },
    update: {},
    create: { name: 'Gerente de Vendas', sectorId: sector_247.id },
  })

  const sector_248 = await prisma.sector.upsert({
    where: { name: 'Veterinária' },
    update: {},
    create: { name: 'Veterinária' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Veterinária' },
    update: {},
    create: { name: 'Estagiário de Veterinária', sectorId: sector_248.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Veterinária' },
    update: {},
    create: { name: 'Assistente de Veterinária', sectorId: sector_248.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Veterinária' },
    update: {},
    create: { name: 'Analista de Veterinária', sectorId: sector_248.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Veterinária' },
    update: {},
    create: { name: 'Coordenador de Veterinária', sectorId: sector_248.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Veterinária' },
    update: {},
    create: { name: 'Gerente de Veterinária', sectorId: sector_248.id },
  })

  const sector_249 = await prisma.sector.upsert({
    where: { name: 'Veterinário de Campo' },
    update: {},
    create: { name: 'Veterinário de Campo' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Veterinário de Campo' },
    update: {},
    create: { name: 'Estagiário de Veterinário de Campo', sectorId: sector_249.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Veterinário de Campo' },
    update: {},
    create: { name: 'Assistente de Veterinário de Campo', sectorId: sector_249.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Veterinário de Campo' },
    update: {},
    create: { name: 'Analista de Veterinário de Campo', sectorId: sector_249.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Veterinário de Campo' },
    update: {},
    create: { name: 'Coordenador de Veterinário de Campo', sectorId: sector_249.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Veterinário de Campo' },
    update: {},
    create: { name: 'Gerente de Veterinário de Campo', sectorId: sector_249.id },
  })

  const sector_250 = await prisma.sector.upsert({
    where: { name: 'Zootecnia' },
    update: {},
    create: { name: 'Zootecnia' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Zootecnia' },
    update: {},
    create: { name: 'Estagiário de Zootecnia', sectorId: sector_250.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Zootecnia' },
    update: {},
    create: { name: 'Assistente de Zootecnia', sectorId: sector_250.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Zootecnia' },
    update: {},
    create: { name: 'Analista de Zootecnia', sectorId: sector_250.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Zootecnia' },
    update: {},
    create: { name: 'Coordenador de Zootecnia', sectorId: sector_250.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Zootecnia' },
    update: {},
    create: { name: 'Gerente de Zootecnia', sectorId: sector_250.id },
  })

  const sector_251 = await prisma.sector.upsert({
    where: { name: 'Zootecnista' },
    update: {},
    create: { name: 'Zootecnista' },
  })

  await prisma.position.upsert({
    where: { name: 'Estagiário de Zootecnista' },
    update: {},
    create: { name: 'Estagiário de Zootecnista', sectorId: sector_251.id },
  })
  await prisma.position.upsert({
    where: { name: 'Assistente de Zootecnista' },
    update: {},
    create: { name: 'Assistente de Zootecnista', sectorId: sector_251.id },
  })
  await prisma.position.upsert({
    where: { name: 'Analista de Zootecnista' },
    update: {},
    create: { name: 'Analista de Zootecnista', sectorId: sector_251.id },
  })
  await prisma.position.upsert({
    where: { name: 'Coordenador de Zootecnista' },
    update: {},
    create: { name: 'Coordenador de Zootecnista', sectorId: sector_251.id },
  })
  await prisma.position.upsert({
    where: { name: 'Gerente de Zootecnista' },
    update: {},
    create: { name: 'Gerente de Zootecnista', sectorId: sector_251.id },
  })

  console.log('Seed concluído com sucesso!');

  await prisma.benefit.createMany({
    data: BENEFITS.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log(`✅ ${BENEFITS.length} benefícios criados!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });