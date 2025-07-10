import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { LoopRouter } from './routers/loop.router';
import { DateRouter } from './routers/date.router';
import { ObjectRouter } from './routers/object.router';

export class Server {
  private static readonly app: FastifyInstance = Fastify({ logger: false });
  private static readonly port: number = 3000;

  static async start(): Promise<void> {
    try {
      await this.setup();
      await this.app.listen({ host: '0.0.0.0', port: this.port });
      console.log('Server running on port', this.port);
    } catch (error) {
      console.error(
        'Server failed on startup',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }

  static async shutdown(): Promise<void> {
    try {
      await this.app.close();
      console.log('Server closed gracefully');
      process.exit(0);
    } catch (error) {
      console.error(
        'Error during shutdown',
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  }

  private static async setup(): Promise<void> {
    this.registerRoutes();
    await this.app.register(cors, {
      origin: true,
      methods: ['POST'],
    });
  }

  private static registerRoutes(): void {
    new LoopRouter(this.app).add();
    new DateRouter(this.app).add();
    new ObjectRouter(this.app).add();
  }
}

void Server.start();

process.once('SIGINT', () => Server.shutdown());
process.once('SIGTERM', () => Server.shutdown());