import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { UsageService } from '../usage/usage.service';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private readonly usageService: UsageService) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não foi encontrada nas variáveis de ambiente.');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
  }

  async generateSummaryVacancy(
    companyId: number,
    params: {
      sector: string;
      position: string;
      title: string;
      workFormat?: string;
      city?: string;
      state?: string;
    },
  ): Promise<string> {
    await this.usageService.checkAndIncrement(companyId, 'aiResumeUsed');

    const { sector, position, title, workFormat, city, state } = params;

    const workFormatLabel =
      workFormat === 'REMOTE' ? 'Remoto'
        : workFormat === 'HYBRID' ? 'Híbrido'
          : workFormat === 'ONSITE' ? 'Presencial'
            : 'Não informado';

    const locationInfo =
      workFormat === 'REMOTE'
        ? 'A vaga é totalmente remota, sem necessidade de presença física.'
        : city && state
          ? `Localização: ${city} - ${state}.`
          : 'Localização não informada.';

    const prompt = `
      Você é um especialista em recrutamento e RH com 10 anos de experiência.
      Sua tarefa é escrever um resumo profissional e atrativo para uma vaga de emprego.
      
      Dados da vaga:
      - Título: ${title}
      - Setor: ${sector}
      - Cargo: ${position}
      - Modelo de trabalho: ${workFormatLabel}
      - ${locationInfo}
      
      INSTRUÇÕES OBRIGATÓRIAS:
      1. Escreva EXATAMENTE um parágrafo com 6 a 8 linhas.
      2. O parágrafo deve conter:
        - Uma frase de abertura apresentando a oportunidade e o cargo
        - De 3 a 4 responsabilidades principais esperadas para o cargo
        - O perfil profissional esperado (habilidades, experiência e postura)
        - Uma frase de encerramento convidando o candidato a se candidatar
      3. Use linguagem formal, clara e atrativa para o candidato.
      4. NÃO use emojis, bullet points ou listas.
      5. NÃO escreva títulos, subtítulos ou introduções fora do parágrafo.
      6. Retorne APENAS o parágrafo, sem qualquer texto adicional.
    `;

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 600 },
      });

      return result.response.text();
    } catch (error) {
      await this.usageService.decrement(companyId, 'aiResumeUsed');
      console.error('Erro detalhado da API Gemini:', error);
      throw new InternalServerErrorException('Falha ao gerar o resumo da vaga.');
    }
  }

  async generateSalarySuggestion(
    companyId: number,
    params: {
      title: string;
      sector: string;
      position: string;
      workFormat?: string;
      city?: string;
      state?: string;
    },
  ): Promise<{ min: number; mid: number; max: number; source: string }> {
    await this.usageService.checkAndIncrement(companyId, 'aiSalaryUsed');

    const { title, sector, position, workFormat, city, state } = params;

    const location =
      workFormat === 'REMOTE' ? 'Brasil (remoto)'
      : city && state ? `${city}, ${state}`
      : 'Brasil';

    const prompt = `Você é um especialista em remuneração do mercado brasileiro.
      Estime as faixas salariais mensais em BRL para:
      - Cargo: ${position}
      - Título: ${title}
      - Setor: ${sector}
      - Localidade: ${location}
      - Ano: ${new Date().getFullYear()}


      Baseie-se em dados do Glassdoor BR, LinkedIn Jobs, Catho e Guia Salarial Robert Half.

      Responda SOMENTE com este JSON, sem markdown, sem texto antes ou depois:
      {"min":0,"mid":0,"max":0,"source":"Glassdoor, LinkedIn, Catho"}

      Onde min=júnior, mid=pleno, max=sênior. Valores inteiros.`;

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 200 },
      });

      const raw = result.response.text().trim();
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error(`JSON não encontrado: ${raw}`);

      const parsed = JSON.parse(match[0]);

      return {
        min: Number(parsed.min),
        mid: Number(parsed.mid),
        max: Number(parsed.max),
        source: parsed.source ?? 'Glassdoor, LinkedIn, Catho',
      };
    } catch (error) {
      await this.usageService.decrement(companyId, 'aiSalaryUsed');
      console.error('Erro ao buscar sugestão de salário:', error);
      throw new InternalServerErrorException('Falha ao gerar sugestão de salário.');
    }
  }

  async generateJobProfile(
    params: {
      title: string;
      sector: string;
      position: string;
      description?: string;
    },
  ): Promise<{
    analyst: number;
    communicator: number;
    executor: number;
    planner: number;
    priority: 'ANALYST' | 'COMMUNICATOR' | 'EXECUTOR' | 'PLANNER';
  }> {
    const { title, sector, position, description } = params;

    const prompt = `
      Você é um especialista em psicologia organizacional e recrutamento comportamental.
      Analise a vaga abaixo e distribua 10 pontos entre os 4 perfis comportamentais.

      Vaga:
      - Título: ${title}
      - Setor: ${sector}
      - Cargo: ${position}
      ${description ? `- Descrição: ${description}` : ''}

      Perfis comportamentais:
      - ANALYST (Analista): lógico, detalhista, orientado a dados, resolve problemas complexos
      - COMMUNICATOR (Comunicador): relacional, persuasivo, trabalha bem em equipe e com clientes
      - EXECUTOR (Executor): prático, rápido, foco em resultados e entregas, alta produtividade
      - PLANNER (Planejador): organizado, estratégico, pensa no longo prazo, gere processos

      REGRAS OBRIGATÓRIAS:
      1. A soma de analyst + communicator + executor + planner deve ser EXATAMENTE 10
      2. Cada valor deve ser um inteiro entre 0 e 5
      3. O campo "priority" deve conter o perfil com MAIOR pontuação (em inglês, maiúsculo)
      4. Em caso de empate no priority, escolha o mais relevante para a vaga
      5. Responda SOMENTE com este JSON, sem markdown, sem texto antes ou depois:

      {"analyst":0,"communicator":0,"executor":0,"planner":0,"priority":"ANALYST"}
    `;

    try {
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 100 },
      });

      const raw = result.response.text().trim();
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error(`JSON não encontrado: ${raw}`);

      const parsed = JSON.parse(match[0]);

      const { analyst, communicator, executor, planner, priority } = parsed;
      const sum = analyst + communicator + executor + planner;

      if (sum !== 10) throw new Error(`Soma inválida: ${sum}`);
      if ([analyst, communicator, executor, planner].some((v) => v < 0 || v > 5)) {
        throw new Error('Valor fora do range 0-5');
      }

      const validProfiles = ['ANALYST', 'COMMUNICATOR', 'EXECUTOR', 'PLANNER'];
      if (!validProfiles.includes(priority)) throw new Error(`Priority inválido: ${priority}`);

      return { analyst, communicator, executor, planner, priority };
    } catch (error) {
      console.error('Erro ao gerar perfil da vaga:', error);
      throw new InternalServerErrorException('Falha ao gerar perfil comportamental da vaga.');
    }
  }
}