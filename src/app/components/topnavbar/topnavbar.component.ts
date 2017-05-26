import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { fromJS, Map } from "immutable";

@Component({
  selector: 'topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {

  @select([ 'hoverfly', 'hoverfly' ]) hoverfly$: Observable<any>;

  private version = 'latest';
  public showLogoutLink: boolean;

  constructor(private authService: AuthService) {
    this.hoverfly$
      .map((hoverfly: Map<any, any>) => hoverfly.toJS().version)
      .filter(version => version)
      .subscribe(version =>  this.version = version);
  }

  ngOnInit() {
    this.authService.onLogin.subscribe((loggedIn: boolean) => {
      this.showLogoutLink = loggedIn;
    });
  }

  logout() {
    this.authService.logout();
    this.showLogoutLink = false
  }

}
