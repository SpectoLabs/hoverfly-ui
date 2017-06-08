import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Map } from 'immutable';
import { Hoverfly } from '../../shared/models/hoverfly.model';

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

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

    // this.authService.isAuthEnabled.subscribe((isAuthEnabled: boolean) => {
    //   this.showLogoutLink = isAuthEnabled || false;
    // });

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
