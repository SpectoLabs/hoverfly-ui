import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../app.state';
import { Subscription } from 'rxjs/Subscription';
import { Middleware } from '../models/middlware.model';
import { API_ERRORS } from '../http/api-errors';

export const HOVERFLY_ACTIONS = {
  UPDATE: 'UPDATE',
  NOTIFY_ERROR: 'NOTIFY_ERROR'
};

@Injectable()
export class HoverflyService {
  constructor(private http: Http, private ngRedux: NgRedux<AppState>) {
  }

  getVersion(): void {
    this.http.get('/api/v2/hoverfly/version')
      .map(res => res.json())
      .subscribe(
        this.updateHoverfly(),
        this.errorHandler()
      );
  }

  getMode(): void {
    this.http.get('/api/v2/hoverfly/mode')
      .map(res => res.json())
      .subscribe(
        this.updateHoverfly(),
        this.errorHandler()
      );
  }

  setMode(modeSelection): void {
    this.http.put('/api/v2/hoverfly/mode', JSON.stringify({ mode: modeSelection }))
      .map(res => res.json())
      .subscribe(
        this.updateHoverfly(),
        this.errorHandler());
  }

  getDestination(): void {
    this.http.get('/api/v2/hoverfly/destination')
      .map(res => res.json())
      .subscribe(
        this.updateHoverfly(),
        this.errorHandler());
  }

  getMiddleware(): void {
    this.http.get('/api/v2/hoverfly/middleware')
      .map(res => res.json())
      .filter((data: Middleware) => !!data.binary || !!data.script || !!data.remote)
      .map(data => new Object({ middleware: data }))
      .subscribe(
        this.updateHoverfly(),
        this.errorHandler());
  }

  getUsage(): void {
      this.http.get('/api/v2/hoverfly/usage')
        .map(res => res.json())
        .subscribe(
          this.updateHoverfly(),
          this.errorHandler()
        );
  }

  pollHoverfly(): Subscription {

    return Observable.timer(0, 5000)
      .subscribe(() => {
        this.getMode();
        this.getDestination();
        this.getMiddleware();
        this.getUsage();
      });

  }

  private errorHandler() {
    return err => {
      if (err.status === 0) {
        this.ngRedux.dispatch({
          type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
          payload: API_ERRORS.SERVICE_UNAVAILABLE
        })
      } else if (err.status === 401) {
        this.ngRedux.dispatch({
          type: HOVERFLY_ACTIONS.NOTIFY_ERROR,
          payload: API_ERRORS.UNAUTHORIZED
        })
      }
    };
  }

  private updateHoverfly() {
    return data => this.ngRedux.dispatch({
      type: HOVERFLY_ACTIONS.UPDATE,
      payload: data
    });
  }

}
