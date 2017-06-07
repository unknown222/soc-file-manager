import { Component, OnInit } from '@angular/core';
import { SocialProviderService } from '../core/social-provider/social-provider.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog, MdIconRegistry } from '@angular/material';
import { BrowseDialogComponent } from './browse-dialog/browse-dialog.component';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/toPromise';
import { VirtualScrollService } from './create-upload/virtual-scroll.service';
import { WorkerService } from '../core/worker/worker.service';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  constructor(public socProvider: SocialProviderService,
              public authService: AuthService,
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

  login() {
    this.socProvider.getProviderByName('FB').login();
  }


}
