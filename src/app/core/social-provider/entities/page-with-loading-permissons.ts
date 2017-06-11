import { Providers } from './providers.enum';
/**
 * Created by Unknown on 6/10/2017.
 */
export class PageWithLoadingPermissions {

  id: any;
  provider: Providers;
  name: any;
  photoUrl: any;
  description: any;

  constructor(id, provider, name, photoUrl?, description?) {
    this.id = id;
    this.provider = provider;
    this.name = name;
    this.photoUrl = photoUrl;
    this.description = description;
  }
}
