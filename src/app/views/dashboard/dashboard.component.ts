import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { HoverflyService } from '../../shared/services/hoverfly.service';
import { Hoverfly } from "../../shared/models/hoverfly.model";
import { select } from "@angular-redux/store";
import { fromJS, Map } from "immutable";


@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [
    'dashboard.component.css'
  ]
})
export class DashboardComponent implements OnInit {

  @select([ 'hoverfly', 'hoverfly' ]) hoverfly$: Observable<any>;


  private hoverfly: Hoverfly;

  public mode: string;
  public destination: string;
  public middlewareRemote: string;
  public middlewareBinary: string;
  public middlewareScript: string;
  public countersCaptured: number;
  public countersSimulated: number;
  public countersModified: number;
  public countersSynthesized: number;

  ngOnInit(): void {
    this.hoverfly$.subscribe((hoverfly: Map<any, any>) => {
      this.hoverfly = hoverfly.toJS();
      console.log(hoverfly);
    });

    console.log('get version')
    this.service.getVersion();
  }


  constructor(private service: HoverflyService) {

    this.service.getMode().subscribe(
      res => this.mode = res
    );
    this.service.getDestination().subscribe(
      res => this.destination = res
    );
    this.service.getMiddleware().subscribe(
      res => {
        this.middlewareRemote = res.remote;
        this.middlewareBinary = res.binary;
        this.middlewareScript = res.script;
      });

    this.service.getUsageCounters().subscribe(
      res => {
        this.countersCaptured = res['capture'];
        this.countersSimulated = res['simulate'];
        this.countersModified = res['modify'];
        this.countersSynthesized = res['synthesize'];
      }
    );
  }

  setMode(event) {
    this.service.setMode(event.srcElement.name).subscribe(
        res => this.mode = res
    );
  }
}
