import { Injectable } from '@angular/core';
import { ApiProvider } from './entities/api-provider';
import { ApiFbProviderService } from './api-fb-provider.service';
import { Providers } from './entities/providers.enum';
import { ApiVkProviderService } from './api-vk-provider.service';

@Injectable()
export class SocialProviderService {

  providers: Array<ApiProvider> = [];

  constructor(private apiFbProvider: ApiFbProviderService,
              private apiVkProvider: ApiVkProviderService) {
    this.providers.push(apiFbProvider);
    this.providers.push(apiVkProvider);
  }

  getProviders() {
    return this.providers;
  }

  getProviderFromUrl(url: string): ApiProvider {
    throw new Error('Method not implemented.');
  }

  getProviderByName(name: Providers): ApiProvider {
    return this.providers.find(provider => provider.name === name);
  }

}
