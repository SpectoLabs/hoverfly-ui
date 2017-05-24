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

@Injectable()
export class HoverflyService {
  private pollingInterval = 5000;
  constructor(private http: Http) {}

  getVersion(): Observable < string > {
    return this.http.get('/api/v2/hoverfly/version')
      .map(res => res.json().version);
  }



  getMode(): Observable<any> {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get('/api/v2/hoverfly/mode').map(res => res.json().mode)); // using switchMap to complete and flattern the inner observable on the next event
  }

  setMode(modeSelection): Observable < any > {
    return this.http.put('/api/v2/hoverfly/mode', JSON.stringify({mode: modeSelection})).map(res => res.json());
  }

  getDestination(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get('/api/v2/hoverfly/destination').map(res => res.json()));
  }

  getMiddleware(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get('/api/v2/hoverfly/middleware').map(res => res.json()));
  }

  getStats(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get('/api/v2/hoverfly').map(res => res.json()));
  }

}
