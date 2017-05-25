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

export const HOVERFLY_ACTIONS = {

  UPDATE: 'UPDATE'
};

@Injectable()
export class HoverflyService {
  private pollingInterval = 5000;
  constructor(private http: Http) {}

  getVersion(): Observable < string > {
    return this.http.get('/api/v2/hoverfly/version').map(res => res.json().version);
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
