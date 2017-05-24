import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { HoverflyService } from '../../shared/services/hoverfly.service';


@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [
    'dashboard.component.css'
  ]
})
export class DashboardComponent {

  public version: string;
  public mode: string;
  public destination: string;
  public middlewareRemote: string;
  public middlewareBinary: string;
  public middlewareScript: string;
  public countersCaptured: number;
  public countersSimulated: number;
  public countersModified: number;
  public countersSynthesized: number;

  private hoverfly: HoverflyService;

  constructor(hoverflyService: HoverflyService) {
    this.hoverfly = hoverflyService;
    this.getVersion();

  }

  getVersion() {
    this.hoverfly.getVersion().subscribe(
      res => this.version = res
    );
    this.hoverfly.getMode().subscribe(
      res => this.mode = res
    );
    this.hoverfly.getDestination().subscribe(
      res => this.destination = res
    );
    this.hoverfly.getMiddleware().subscribe(
      res => {
        this.middlewareRemote = res.remote;
        this.middlewareBinary = res.binary;
        this.middlewareScript = res.script;
      });

    this.hoverfly.getUsageCounters().subscribe(
      res => {
        this.countersCaptured = res['usage']['counters']['capture'];
        this.countersSimulated = res['usage']['counters']['simulate'];
        this.countersModified = res['usage']['counters']['modify'];
        this.countersSynthesized = res['usage']['counters']['synthesize'];
      }
    );
  }

  setMode(event) {
    this.hoverfly.setMode(event.srcElement.name).subscribe(
        res => this.mode = res
    );
  }
}
