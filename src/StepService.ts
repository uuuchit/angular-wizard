import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StepService {
  private wizardState = new Subject<any>();

  saveState(state: any) {
    this.wizardState.next(state);
  }

  getState() {
    return this.wizardState.asObservable();
  }
}
