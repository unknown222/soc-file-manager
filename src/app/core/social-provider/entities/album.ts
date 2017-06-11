import { Providers } from './providers.enum';
/**
 * Created by Unknown on 6/11/2017.
 */
export class Album {
  id: any;
  provider: Providers;
  name: string;
  photoUrl: string;
  description: string;


  constructor(id: any, provider: Providers, name: string, photoUrl: string, description: string) {
    this.id = id;
    this.provider = provider;
    this.name = name;
    this.photoUrl = photoUrl;
    this.description = description;
  }

}
