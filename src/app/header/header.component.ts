import { Component, OnInit } from '@angular/core';
import { SocialProviderService } from '../core/social-provider/social-provider.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public providers;
  public gitUrl: string = environment.gitConfig.gitProjectUrl;

  constructor(public socProvider: SocialProviderService) { }

  ngOnInit(): void {
    this.providers = this.socProvider.getProviders();
    if(environment.gitConfig) {
      this.gitUrl = environment.gitConfig.gitProjectUrl;
    }
  }

  openUrl(url) {
    window.open(url);
  }
}
