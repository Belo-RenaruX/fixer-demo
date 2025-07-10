import { FastifyRequest } from 'fastify';

type inputType = {
  Body: {
    position: number,
    firstNumber: number,
    secondNumber: number,
  }
}

export interface ILoopInteractor {
  execute(input: FastifyRequest): Promise<string>;
}

export class LoopInteractor implements ILoopInteractor {
  async execute(input: FastifyRequest<inputType>): Promise<string> {
    try {
      const { body } = input;

      console.time('processTime');
      const result = this.calculateNumber(body);
      console.timeEnd('processTime');

      return result;
    } catch (error) {
      return error instanceof Error ? error.message : String(error);
    }
  }

  private calculateNumber(body: inputType['Body']): string {
    const { position, firstNumber, secondNumber } = body;
    
    let number = 0;

    for (let i = 0; i <= firstNumber; i++) {
      for (let j = 0; j <= secondNumber; j++) {
        number = this.fibonacci(position) + firstNumber + secondNumber;
      }
    }

    return String(number);
  }

  private fibonacci(position: number): number {
    return position < 2
      ? position
      : this.fibonacci(position - 1) + this.fibonacci(position - 2);
  }
}