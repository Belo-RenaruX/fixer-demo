import { FastifyInstance } from "fastify";
import { DateBuilder } from "src/builders/date.builder";
import { IDateController } from "src/controllers/date.controller";

export class DateRouter {
  private readonly dateController: IDateController;

  constructor(private readonly fastify: FastifyInstance) {
    this.dateController = DateBuilder.build();
  }

  add(): void {
    this.fastify.route({
      method: 'POST',
      url: `/date`,
      handler: this.dateController.handle.bind(this.dateController),
    });
  }
}