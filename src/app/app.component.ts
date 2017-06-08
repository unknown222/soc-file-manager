import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { SocialProviderService } from './core/social-provider/social-provider.service';
import { Providers } from './core/social-provider/entities/providers.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  constructor(public socProvider: SocialProviderService,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon(
      'facebook-box',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook-box.svg'));
    iconRegistry.addSvgIcon(
      'git',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/git.svg'));
  }

  login() {
    this.socProvider.getProviderByName(Providers.FB).login();
  }
  checkLoginStatus() {
    this.socProvider.getProviderByName(Providers.FB).checkLoginStatus().subscribe(result => {
      console.log(result);
    });
  }
  logout() {
    this.socProvider.getProviderByName(Providers.FB).logout().subscribe(result => {
    })
  }
}
