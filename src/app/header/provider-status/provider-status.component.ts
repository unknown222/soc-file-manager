import { Component, DoCheck, Input, KeyValueChangeRecord, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { SocialProviderService } from '../../core/social-provider/social-provider.service';
import { Providers } from '../../core/social-provider/entities/providers.enum';
import { ApiProvider } from '../../core/social-provider/entities/api-provider';
import { ProviderStatuses } from '../../core/social-provider/entities/provider-statuses.enum';
import { MdMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-provider-status',
  templateUrl: './provider-status.component.html',
  styleUrls: ['./provider-status.component.scss']
})
export class ProviderStatusComponent implements OnInit, DoCheck {

  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  @Input() provider: ApiProvider;
  providerNames = Providers;
  providerStatuses = ProviderStatuses;
  userInfo;
  icons = {
    [this.providerNames.FB] : 'facebook',
    [this.providerNames.VK] : 'vk',
    [this.providerNames.OK] : 'odnoklassniki',
    [this.providerNames.INSTAGRAM] : 'instagram'
  };
  differ;

  constructor(private socProvider: SocialProviderService,
              private differs: KeyValueDiffers) {
    this.differ = differs.find({}).create(null);
  }

  ngOnInit() {
  }


  ngDoCheck() {
    let changes = this.differ.diff(this.provider);
    if(changes) {
      changes.forEachChangedItem((change: KeyValueChangeRecord<string, number>)  => {
        if(change.key === 'status' && change.currentValue === this.providerStatuses.CONNECTED) {
          this.getUserInfo();
        }
      });
    }
  }

  getUserInfo() {
    this.provider.getUserInfo().subscribe(result => {
      this.userInfo = result;
    });
  }

  logout() {
    this.provider.logout();
  }

  onButtonClick() {
    if(this.provider.status === this.providerStatuses.INIT) {
      this.provider.login();
    }
    if(this.provider.status === this.providerStatuses.CONNECTED) {
      this.trigger.openMenu();
    }
  }

}
