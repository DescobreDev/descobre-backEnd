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
      // Desfaz o incremento se a chamada à IA falhar
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

    // const location =
    //   workFormat === 'REMOTE' ? 'Brasil (remoto)'
    //   : city && state ? `${city}, ${state}`
    //   : 'Brasil';

    const prompt = `Você é um especialista em remuneração do mercado brasileiro.
      Estime as faixas salariais mensais em BRL para:
      - Cargo: ${position}
      - Título: ${title}
      - Setor: ${sector}
      - Localidade: Cidade Itapetininga
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
}