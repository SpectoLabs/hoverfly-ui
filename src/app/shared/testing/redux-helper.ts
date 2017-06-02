import { NgRedux } from "@angular-redux/store";
import { Observable } from "rxjs";

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