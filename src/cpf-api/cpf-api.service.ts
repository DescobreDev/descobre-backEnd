import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CpfApiService {
  private readonly baseUrl = process.env.CPF_API_URL;
  private readonly apiKey = process.env.CPF_API_KEY;

  async lookup(cpf: string): Promise<{
    name: string;
    email?: string;
    birthDate?: string; 
  }> {
    const response = await axios.get(`${this.baseUrl}/${this.apiKey}/26/${cpf}`, {
      timeout: 8000,
    });

    const data = response.data;

    if (data.status !== 1) {
      throw new Error('CPF não encontrado.');
    }

    return {
      name: data.nome ?? data.name,
      email: data.email ?? undefined,
      birthDate: data.nascimento ?? undefined,
    };
  }
}