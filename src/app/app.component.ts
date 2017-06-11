import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SidenavPortalService } from './ui/sidenav-portal/sidenav-portal.service';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MdSidenav;
  align = 'start';

  constructor(private sidenavPortal: SidenavPortalService) {
  }

  ngOnInit(): void {
    this.sidenavPortal.registerSidenav(this.sidenav);
  }

}
