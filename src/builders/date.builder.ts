import { DateInteractor } from '../interactors/date.interactor';
import { DateController } from '../controllers/date.controller';

export class DateBuilder {
  static build(): DateController {
    return new DateController(
      new DateInteractor()
    );
  }
}