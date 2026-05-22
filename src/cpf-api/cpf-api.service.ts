import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CpfApiService {
  private readonly baseUrl = process.env.CPF_API_URL;
  private readonly apiKey = process.env.CPF_API_KEY;

  async lookup(cpf: string): Promise<{
    name: string;
    email?: string;
    phone?: string;
    birthDate?: string;
  }> {
    const response = await axios.get(`${this.baseUrl}/${cpf}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
      timeout: 8000,
    });

    const data = response.data;

    return {
      name: data.nome ?? data.name,
      email: data.email ?? undefined,
      phone: data.telefone ?? data.phone ?? undefined,
      birthDate: data.data_nascimento ?? data.birthDate ?? undefined,
    };
  }
}