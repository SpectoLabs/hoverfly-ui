import { Component, ViewChild } from '@angular/core';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent {

  @ViewChild('dialogbox') dialogbox: DialogboxComponent;

  public isRetrying: boolean;
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
