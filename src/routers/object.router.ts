import { FastifyInstance } from "fastify";
import { ObjectBuilder } from "src/builders/object.builder";
import { IObjectController } from "src/controllers/object.controller";

export class ObjectRouter {
  private readonly objectController: IObjectController;

  constructor(private readonly fastify: FastifyInstance) {
    this.objectController = ObjectBuilder.build();
  }

  add(): void {
    this.fastify.route({
      method: 'POST',
      url: `/object`,
      handler: this.objectController.handle.bind(this.objectController),
    });
  }
}