import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../app.state';
import { Subscription } from 'rxjs/Subscription';
import { Middleware } from '../models/middlware.model';
import { API_ERRORS, httpErrorHandler } from '../http/error-handling';
import { NotificationService } from '../../components/notifications/notification.service';

export const HOVERFLY_ACTIONS = {
  UPDATE: 'UPDATE',
  NOTIFY_ERROR: 'NOTIFY_ERROR'
};

@Injectable()
export class HoverflyService {
  constructor(private http: Http, private ngRedux: NgRedux<AppState>, private notifyService: NotificationService) {
  }


  setMode(modeSelection): void {
    this.http.put('/api/v2/hoverfly/mode', JSON.stringify({ mode: modeSelection }))
      .map(res => res.json())
      .subscribe(
        this.updateHoverfly(),
        httpErrorHandler(this.notifyService));
  }

  getHoverflyInfo(): void {
    this.http.get('/api/v2/hoverfly')
      .map(res => res.json())
      .subscribe(
        this.updateHoverfly(),
        httpErrorHandler(this.notifyService));
  }

  getMiddleware(): void {
    this.http.get('/api/v2/hoverfly/middleware')
      .map(res => res.json())
      .filter((data: Middleware) => !!data.binary || !!data.script || !!data.remote)
      .map(data => new Object({ middleware: data }))
      .subscribe(
        this.updateHoverfly(),
        httpErrorHandler(this.notifyService));
  }


  pollHoverfly(): Subscription {

    return Observable.timer(0, 5000)
      .subscribe(() => {
        this.getHoverflyInfo();
        this.getMiddleware();
      });

  }

  private updateHoverfly() {
    return data => this.ngRedux.dispatch({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: data
    });
  }

}
