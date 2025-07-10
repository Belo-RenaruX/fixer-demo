import { FastifyInstance } from "fastify";
import { LoopBuilder } from "src/builders/loop.builder";
import { ILoopController } from "src/controllers/loop.controller";

export class LoopRouter {
  private readonly loopController: ILoopController;

  constructor(private readonly fastify: FastifyInstance) {
    this.loopController = LoopBuilder.build();
  }

  add(): void {
    this.fastify.route({
      method: 'POST',
      url: `/loop`,
      handler: this.loopController.handle.bind(this.loopController),
    });
  }
}