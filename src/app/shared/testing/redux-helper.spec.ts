import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';

export class MockRedux extends NgRedux<any> {
  constructor(private state: any) {
    super(null);
  }

  dispatch = () => {
  };

  select() {
    return Observable.of(this.state);
  }
}

export function createMockRedux(state) {
  return new MockRedux(state);
}
