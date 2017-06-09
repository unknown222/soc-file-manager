import { Component, OnInit } from '@angular/core';
import { SocialProviderService } from '../core/social-provider/social-provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public providers;

  constructor(public socProvider: SocialProviderService) { }

  ngOnInit(): void {
    this.providers = this.socProvider.getProviders();
  }

}
