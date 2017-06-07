import { Injectable } from '@angular/core';
import { ApiProvider } from './entities/api-provider';
import { ApiFbProviderService } from './api-fb-provider.service';

@Injectable()
export class SocialProviderService {

  providers: Array<ApiProvider> = [];

  constructor(private apiFbProvider: ApiFbProviderService) {
    this.providers.push(apiFbProvider);
  }

  getProviders() {
    return this.providers;
  }

  getProviderFromUrl(url: string): ApiProvider  {
    throw new Error('Method not implemented.');
  }

  getProviderByName(name: string) : ApiProvider {
    return this.providers.find(provider => provider.name === name);
  }

}