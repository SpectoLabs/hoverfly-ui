import { Component, OnInit, ViewChild } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { API_ERRORS } from './shared/http/api-errors';
import { StatusDialogComponent } from './components/status-dialog/status-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('statusDialog') statusDialog: StatusDialogComponent;
  @select([ 'hoverfly', 'error' ]) error$: Observable<string>;

  ngOnInit(): void {
    // TODO: missing test
    this.error$
      .filter(error => error === API_ERRORS.SERVICE_UNAVAILABLE)
      .subscribe(() => this.statusDialog.show());
  }

  constructor() {
  }

}

