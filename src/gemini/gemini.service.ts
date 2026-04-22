import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    console.log("Minha chave é:", process.env.GEMINI_API_KEY);
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    });
  }

  async generateSummaryVacancy(sector: string, position: string, title: string): Promise<string> {
    const prompt = `
            Você é um especialista em recrutamento e RH.

            Gere um resumo profissional, claro e atrativo para uma vaga de emprego com base nas informações abaixo.

            Regras:
            - Linguagem formal e objetiva
            - Máximo de 8 linhas
            - Foco em atrair candidatos qualificados
            - Não usar emojis
            - Não inventar tecnologias específicas (a menos que seja implícito pelo cargo)
            - Texto pronto para exibição em sistema de vagas

            Dados da vaga:
            Setor: ${sector}
            Cargo: ${position}
            Título da vaga: ${title}

            Saída esperada:
            Um parágrafo bem estruturado descrevendo a vaga, responsabilidades gerais e perfil esperado.
            `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;

      return response.text();
    } catch (error) {
      console.error('Erro ao chamar o Gemini:', error);
      throw new Error('Falha ao gerar o resumo da vaga.');
    }
  }
}