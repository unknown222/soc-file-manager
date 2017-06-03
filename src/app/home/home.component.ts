import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialProviderService } from '../core/social-provider/social-provider.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog, MdIconRegistry } from '@angular/material';
import { BrowseDialogComponent } from './browse-dialog/browse-dialog.component';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/reduce';
import { ScrollObservableService } from 'od-virtualscroll';
import { ConnectableObservable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import { VirtualScrollService } from './virtual-scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  constructor(public socProvider: SocialProviderService,
              public vsService: VirtualScrollService,
              private dialog: MdDialog,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'facebook-box',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook-box.svg'));
    iconRegistry.addSvgIcon(
      'git',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/git.svg'));
  }

  ngOnInit() {

  }

  browse() {
    let dialogRef = this.dialog.open(BrowseDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.vsService.initScroll(result);
    });
  }

}
