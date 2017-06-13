import {
  ChangeDetectorRef, Component, DoCheck, Input, KeyValueChangeRecord, KeyValueDiffers, OnChanges, OnInit,
  ViewChild
} from '@angular/core';
import { Providers } from '../../core/social-provider/entities/providers.enum';
import { ApiProvider } from '../../core/social-provider/entities/api-provider';
import { ProviderStatuses } from '../../core/social-provider/entities/provider-statuses.enum';
import { MdMenuTrigger } from '@angular/material';
import { User } from '../../core/social-provider/entities/user';

@Component({
  selector: 'app-provider-status',
  templateUrl: './provider-status.component.html',
  styleUrls: [ './provider-status.component.scss' ]
})
export class ProviderStatusComponent implements OnInit, DoCheck {

  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  @Input() provider: ApiProvider;
  providerStatuses = ProviderStatuses;
  providerPrevStatus: ProviderStatuses;
  user: User;
  icons = {
    [Providers.FB]: 'facebook',
    [Providers.VK]: 'vk',
    [Providers.OK]: 'odnoklassniki',
    [Providers.INSTAGRAM]: 'instagram'
  };

  constructor() {
  }

  ngOnInit() {
  }


  ngDoCheck() {
    if (this.providerPrevStatus !== this.provider.status) {
      this.providerPrevStatus = this.provider.status;
      if(this.provider.status === this.providerStatuses.CONNECTED) {
        this.getUserInfo();
      }
    }
  }

  getUserInfo() {
    this.provider.getUserInfo().subscribe(result => {
      this.user = result;
    });
  }

  logout() {
    this.provider.logout().subscribe();
  }

  onButtonClick() {
    if (this.provider.status === this.providerStatuses.INIT) {
      this.provider.login().subscribe();
    }
    if (this.provider.status === this.providerStatuses.CONNECTED) {
      this.trigger.openMenu();
    }
  }

}
