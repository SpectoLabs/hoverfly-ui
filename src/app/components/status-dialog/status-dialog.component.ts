import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { API_ERRORS } from '../../shared/http/error-handling';
import { StatusDialogService } from './status-dialog.service';
import { NotificationService } from '../notifications/notification.service';

// Component for providing feedback for Hoverfly Status and managing reconnection
@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  @ViewChild('dialogbox') dialogbox: DialogboxComponent;
  public isRetrying: boolean;


  ngOnInit(): void {
    // TODO: missing test
    this.notifyService.errors
      .subscribe(error => {
        if (error === API_ERRORS.SERVICE_UNAVAILABLE) {
          this.dialogbox.showChildModal();
        } else {
          // hide the modal for other types of errors assuming hoverfly is back up
          this.dialogbox.hideChildModal();
        }
      });
  }

  constructor(private service: StatusDialogService, private notifyService: NotificationService) {
    this.isRetrying = false;
  }

  onRetry() {
    this.isRetrying = true;
    this.service.retry();
    this.isRetrying = false;
  }
}
