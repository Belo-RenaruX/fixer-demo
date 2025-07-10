import { FastifyRequest } from 'fastify';
import dayjs from 'dayjs';

type inputType = {
  Body: {
    rawObject: Record<string, unknown>
  }
}
export interface IObjectInteractor {
  execute(input: FastifyRequest): Promise<string>;
}

export class ObjectInteractor implements IObjectInteractor {
  async execute(input: FastifyRequest<inputType>): Promise<string> {
    try {
      const { body } = input;
      return this.stringifyObject(body);
    } catch (error) {
      return error instanceof Error ? error.message : String(error);
    }
  }

  private stringifyObject(body: inputType['Body']): string {
    const { rawObject } = body;

    return JSON.stringify(`'${rawObject}'`);
  }
}