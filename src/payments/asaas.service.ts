import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export interface CreateCustomerDto {
  name: string;
  cpfCnpj: string;
  email: string;
  mobilePhone: string;
}

export interface TokenizeCardDto {
  customerId: string;
  creditCard: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  creditCardHolderInfo: {
    name: string;
    cpfCnpj: string;
    email: string;
    postalCode: string;
    addressNumber: string;
    phone: string;
  };
}

export interface CreateSubscriptionDto {
  customerId: string;
  creditCardToken: string;
  planId: number;
  value: number;
  description: string;
  isAnnual: boolean;
}

@Injectable()
export class AsaasService {
  private readonly logger = new Logger(AsaasService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('ASAAS_BASE_URL');
    this.apiKey  = this.config.get<string>('ASAAS_API_KEY');
  }

  private get headers() {
    return {
      'access_token': this.apiKey,
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(method: 'post' | 'get', path: string, body?: object): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.http.request<T>({
          method,
          url: `${this.baseUrl}${path}`,
          headers: this.headers,
          data: body,
        }),
      );
      return data;
    } catch (err) {
      const msg = err?.response?.data?.errors?.[0]?.description ?? err?.message ?? 'Erro no Asaas';
      this.logger.error(`[Asaas] ${method.toUpperCase()} ${path} → ${msg}`);
      throw new BadRequestException(msg);
    }
  }

  async createCustomer(dto: CreateCustomerDto): Promise<{ id: string }> {

    return this.request<{ id: string }>('post', '/customers', {
      name:        dto.name,
      cpfCnpj:    dto.cpfCnpj.replace(/\D/g, ''),
      email:       dto.email,
      mobilePhone: dto.mobilePhone.replace(/\D/g, ''),
    });
  }

  async tokenizeCard(dto: TokenizeCardDto): Promise<{ creditCardToken: string; creditCardNumber: string; creditCardBrand: string }> {
    return this.request('post', '/creditCard/tokenize', {
      customer: dto.customerId,
      creditCard: {
        holderName:  dto.creditCard.holderName,
        number:      dto.creditCard.number,
        expiryMonth: dto.creditCard.expiryMonth,
        expiryYear:  dto.creditCard.expiryYear,
        ccv:         dto.creditCard.ccv,
      },
      creditCardHolderInfo: {
        name:       dto.creditCardHolderInfo.name,
        cpfCnpj:   dto.creditCardHolderInfo.cpfCnpj.replace(/\D/g, ''),
        email:      dto.creditCardHolderInfo.email,
        addressNumber: dto.creditCardHolderInfo.addressNumber,
        postalCode: dto.creditCardHolderInfo.postalCode.replace(/\D/g, ''),
        phone:      dto.creditCardHolderInfo.phone.replace(/\D/g, ''),
      },
    });
  }


  async createSubscription(dto: CreateSubscriptionDto): Promise<{ id: string; status: string }> {
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + 1);
    const dueDateStr = nextDueDate.toISOString().split('T')[0];

    return this.request('post', '/subscriptions', {
      customer:        dto.customerId,
      billingType:    'CREDIT_CARD',
      value:           dto.value,
      nextDueDate:    dueDateStr,
      cycle:          dto.isAnnual === true ? 'YEARLY' : 'MONTHLY',
      description:    dto.description,
      creditCardToken: dto.creditCardToken,
      externalReference: String(dto.planId),
    });
  }
}