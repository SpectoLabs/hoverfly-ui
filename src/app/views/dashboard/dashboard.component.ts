import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HoverflyService } from '../../shared/services/hoverfly.service';
import { Hoverfly } from '../../shared/models/hoverfly.model';
import { select } from '@angular-redux/store';
import { Map } from 'immutable';
import { Subscription } from 'rxjs/Subscription';
import { API_ERRORS } from '../../shared/http/api-errors';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [
    'dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  @select([ 'hoverfly', 'hoverfly' ]) hoverfly$: Observable<any>;
  @select([ 'hoverfly', 'error' ]) error$: Observable<string>;

  public hoverfly: Hoverfly;
  public pollingSubscription: Subscription;

  constructor(private service: HoverflyService) {}

  ngOnInit(): void {
    this.hoverfly$.subscribe((hoverfly: Map<any, any>) => {
      this.hoverfly = hoverfly.toJS();
    });

    this.service.getVersion();
    this.pollingSubscription = this.service.pollHoverfly();

    this.error$
      .filter(error => error === API_ERRORS.SERVICE_UNAVAILABLE)
      .subscribe(() => this.pollingSubscription.unsubscribe());
  }

  ngOnDestroy(): void {
    this.pollingSubscription.unsubscribe();
  }

  setMode(event) {
    this.service.setMode(event.srcElement.name)
  }
}
