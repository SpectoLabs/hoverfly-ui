import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';
import { Hoverfly } from '../../shared/models/hoverfly.model';
import { API_ERRORS } from '../../shared/http/error-handling';

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopNavBarComponent implements OnInit {

  @select([ 'hoverfly', 'hoverfly' ]) hoverfly$: Observable<any>;
  @select([ 'hoverfly', 'error' ]) error$: Observable<string>;
  public version = 'latest';
  // TODO: there is no API endpoint to check if hoverfly has auth enabled or not
  public showLogoutLink: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    this.error$
      .filter(error => error === API_ERRORS.UNAUTHORIZED)
      .subscribe(() => this.logout()
      );

    this.hoverfly$
      .map((hoverfly: Map<any, any>) => hoverfly.toJS())
      .subscribe((hoverfly: Hoverfly) =>  {
        this.version = hoverfly.version || 'latest';
      });
  }

  logout() {
    this.authService.logout();
    this.showLogoutLink = false;
  }

}
