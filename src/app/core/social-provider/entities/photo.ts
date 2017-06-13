/**
 * Created by Unknown on 6/12/2017.
 */
export class Photo {
  index: number;
  photoUrl: string;
  thumbUrl: string;
  description?: string;
  toUpload: boolean = true;

  constructor(index: number, photoUrl: string, thumbUrl: string, description?: string) {
    this.index = index;
    this.photoUrl = photoUrl;
    this.thumbUrl = thumbUrl;
    this.description = description;
  }

}
