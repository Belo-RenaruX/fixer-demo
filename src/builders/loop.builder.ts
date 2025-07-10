import { LoopInteractor } from '../interactors/loop.interactor';
import { LoopController } from '../controllers/loop.controller';

export class LoopBuilder {
  static build(): LoopController {
    return new LoopController(
      new LoopInteractor()
    );
  }
}