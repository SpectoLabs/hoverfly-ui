import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import {
  Observable
} from 'rxjs/Rx';
import { NgRedux } from "@angular-redux/store";
import { AppState } from "../../app.state";

export const HOVERFLY_ACTIONS = {

  UPDATE: 'UPDATE'
};

@Injectable()
export class HoverflyService {
  private pollingInterval = 5000;
  constructor(private http: Http, private ngRedux: NgRedux<AppState>,) {}

  getVersion() {
    this.http.get('/api/v2/hoverfly/version')
      .map(res => res.json())
      .subscribe(data => this.ngRedux.dispatch({
        type: HOVERFLY_ACTIONS.UPDATE,
        payload: data
      }));
  }

  getMode(): Observable < string > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get('/api/v2/hoverfly/mode').map(res => res.json().mode));
  }

  setMode(modeSelection): Observable < string > {
    return this.http.put('/api/v2/hoverfly/mode', JSON.stringify({mode: modeSelection})).map(res => res.json().mode);
  }

  getDestination(): Observable < string > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get('/api/v2/hoverfly/destination').map(res => res.json().destination));
  }

  getMiddleware(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get('/api/v2/hoverfly/middleware').map(res => res.json()));
  }

  getUsageCounters(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get('/api/v2/hoverfly/usage').map(res => res.json().usage.counters));
  }

}
