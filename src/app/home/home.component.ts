import { Component, Injector, OnInit } from '@angular/core';
import { SocialProviderService } from '../core/social-provider/social-provider.service';
import { SidenavPortalService } from '../ui/sidenav-portal/sidenav-portal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  openSidenav() {

  }

}
