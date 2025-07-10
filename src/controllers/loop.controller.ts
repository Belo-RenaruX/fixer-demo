import { FastifyReply, FastifyRequest } from 'fastify';

import { ILoopInteractor } from 'src/interactors/loop.interactor';

export interface ILoopController {
  handle(input: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export class LoopController implements ILoopController {
  constructor(
    private readonly loopInteractor: ILoopInteractor,
  ) {}

  async handle(input: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.loopInteractor.execute(input);
    reply.code(200).send({ response: result });
  }
}