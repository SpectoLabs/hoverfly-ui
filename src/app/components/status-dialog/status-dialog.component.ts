import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { AuthService } from '../../shared/services/auth.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { API_ERRORS } from '../../shared/http/error-handling';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  @ViewChild('dialogbox') dialogbox: DialogboxComponent;
  @select([ 'hoverfly', 'error' ]) error$: Observable<string>;
  public isRetrying: boolean;


  ngOnInit(): void {
    // TODO: missing test
    this.error$
      .filter(error => error === API_ERRORS.SERVICE_UNAVAILABLE)
      .subscribe(() => this.show());
  }

  constructor(private authService: AuthService) {
    this.isRetrying = false;
  }

  show() {
    this.dialogbox.showChildModal();
  }

  onRetry() {
    this.isRetrying = true;
    this.authService.checkAuthenticated().subscribe(isHealthy => {
      if (isHealthy) {
        window.location.reload();
      }
    });
    this.isRetrying = false;
  }
}
