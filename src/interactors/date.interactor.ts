import { FastifyRequest } from 'fastify';
import dayjs from 'dayjs';

type inputType = {
  Body: {
    format: string
  }
}
export interface IDateInteractor {
  execute(input: FastifyRequest): Promise<string>;
}

export class DateInteractor implements IDateInteractor {
  async execute(input: FastifyRequest<inputType>): Promise<string> {
    try {
      const { body } = input;
      return this.formatDate(body);
    } catch (error) {
      return error instanceof Error ? error.message : String(error);
    }
  }

  private formatDate(body: inputType['Body']): string {
    const { format } = body;

    return dayjs().toISOString();
  }
}