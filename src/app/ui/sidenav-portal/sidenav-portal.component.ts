import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SidenavPortalService } from './sidenav-portal.service';

@Component({
  selector: 'app-sidenav-portal',
  template: ''
})
export class SidenavPortalComponent implements OnInit {

  constructor(private viewContainerRef: ViewContainerRef,
              private sidenavPortalService: SidenavPortalService) {
  }

  ngOnInit() {
    this.sidenavPortalService.registerViewContainerRef(this.viewContainerRef);
  }

}
