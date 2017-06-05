import { MockNgRedux } from '@angular-redux/store/lib/testing';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';

export class MockRedux extends MockNgRedux<any> {
  constructor(private state: any) {
    super();
  }

  dispatch = () => {
  };

  select = () => {
    return Observable.of(this.state);
  }
}

export function createMockRedux(state) {
  return new MockRedux(state);
}
