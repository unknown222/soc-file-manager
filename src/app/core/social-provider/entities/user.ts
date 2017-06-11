/**
 * Created by Unknown on 6/9/2017.
 */
export class User {

  id;
  name: string;
  photoUrl: string;

  constructor(id, name, photoUrl) {
    this.id = id;
    this.name = name;
    this.photoUrl = photoUrl;
  }

}
