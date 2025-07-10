import { FastifyReply, FastifyRequest } from 'fastify';

import { IDateInteractor } from 'src/interactors/date.interactor';

export interface IDateController {
  handle(input: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export class DateController implements IDateController {
  constructor(
    private readonly dateInteractor: IDateInteractor,
  ) {}

  async handle(input: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.dateInteractor.execute(input);
    reply.code(200).send({ response: result });
  }
}