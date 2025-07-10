import { ObjectInteractor } from '../interactors/object.interactor';
import { ObjectController } from '../controllers/object.controller';

export class ObjectBuilder {
  static build(): ObjectController {
    return new ObjectController(
      new ObjectInteractor()
    );
  }
}