import { Component, OnInit } from '@angular/core';
import { HoverflyService } from '../shared/services/hoverfly.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {

  public docsLink: string;
  public showLogoutLink: boolean

  constructor(private hoverflyService: HoverflyService, private authService: AuthService) {
    this.hoverflyService.getVersion().subscribe(
      res => this.docsLink = "https://hoverfly.readthedocs.io/en/" + res + "/"
    );
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
