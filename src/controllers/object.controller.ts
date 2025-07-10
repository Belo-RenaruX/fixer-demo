import { FastifyReply, FastifyRequest } from 'fastify';

import { IObjectInteractor } from 'src/interactors/object.interactor';

export interface IObjectController {
  handle(input: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export class ObjectController implements IObjectController {
  constructor(
    private readonly obejctInteractor: IObjectInteractor,
  ) {}

  async handle(input: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.obejctInteractor.execute(input);
    reply.code(200).send({ response: result });
  }
}