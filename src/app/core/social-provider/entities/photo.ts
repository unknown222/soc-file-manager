/**
 * Created by Unknown on 6/12/2017.
 */
export class Photo {
  photoUrl: string;
  thumbUrl: string;
  description?: string;
  toUpload: boolean = true;

  constructor(photoUrl: string, thumbUrl: string, description?: string) {
    this.photoUrl = photoUrl;
    this.thumbUrl = thumbUrl;
    this.description = description;
  }

}
