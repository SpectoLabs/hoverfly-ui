import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HoverflyService {
  private hoverflyApiUrl = 'http://localhost:8888/api/v2/'; // URL to web API
  private pollingInterval = 5000
  constructor(private http: Http) {}

  getVersion(): Observable < string > {
    return this.http.get(this.hoverflyApiUrl + "hoverfly/version")
      .map(res => res.json())
      .catch(version => {
        return Observable.of(version)
      })
  }

  getMode(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get(this.hoverflyApiUrl + "hoverfly/mode").map(res => res.json()));
  }

  setMode(modeSelection): Observable < any > {
    console.log(modeSelection)
    return this.http.put(this.hoverflyApiUrl + "hoverfly/mode", JSON.stringify({mode: modeSelection})).map(res => res.json());
  }

  getDestination(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get(this.hoverflyApiUrl + "hoverfly/destination").map(res => res.json()));
  }

  getMiddleware(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get(this.hoverflyApiUrl + "hoverfly/middleware").map(res => res.json()));
  }

  getStats(): Observable < any > {
    return Observable.timer(0, this.pollingInterval)
      .switchMap(() => this.http.get(this.hoverflyApiUrl + "hoverfly").map(res => res.json()));
  }
}
