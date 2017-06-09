import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';
import { Hoverfly } from '../../shared/models/hoverfly.model';
import { API_ERRORS } from '../../shared/http/error-handling';
import { EVENT_TYPE, NotificationService } from '../notifications/notification.service';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopNavBarComponent implements OnInit {

  @select([ 'hoverfly', 'hoverfly' ]) hoverfly$: Observable<any>;
  public version = 'latest';
  // TODO: there is no API endpoint to check if hoverfly has auth enabled or not
  public showLogoutLink: boolean;

  constructor(private authService: AuthService, private notifyService: NotificationService ) {
  }

  ngOnInit() {
    this.notifyService.errors
      .filter(error => error === API_ERRORS.UNAUTHORIZED)
      .subscribe(() => {
        this.logout()
        }
      );

    this.notifyService.events
      .subscribe(event => {
        if (event === EVENT_TYPE.LOGIN) {
          this.showLogoutLink = true;
        } else if (event === EVENT_TYPE.LOGOUT) {
          this.showLogoutLink = false;
        }
      });

    // TODO resolve version before view init
    this.hoverfly$
      .map((hoverfly: Map<any, any>) => hoverfly.toJS())
      .subscribe((hoverfly: Hoverfly) =>  {
        this.version = hoverfly.version || 'latest';
      });

    this.showLogoutLink = this.authService.hasSession();
  }

  logout() {
    this.authService.logout();
  }

}
