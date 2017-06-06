import { ApiProvider } from '../../social-provider/entities/api-provider';
import { Observable } from 'rxjs/Observable';
/**
 * Created by Unknown on 6/6/2017.
 */
export class UploadTask {
  from;
  to;
  configs;
  data;
  provider: ApiProvider;
  uploadedPhotos: number = 0;
  uploadTasksArray;
  current = {};
  nextChunk;

  constructor(from, to, configs, provider?, data?) {
    this.from = from;
    this.to = to;
    this.configs = configs;
    this.provider = provider;
    this.data = data;
  }

  executeUploadTask() {
    this.provider.getPhotos(this.from).subscribe(result => this.convertAndLoadPhotos(result))
  }

  convertAndLoadPhotos(result) {
    this.nextChunk = result.paging.next;
    console.log(this.configs);
    let photos = [];
    for (let photo of result.data.splice(this.configs.from, this.configs.to - this.uploadedPhotos)) {
      let convertedPhoto: any = { url: photo.images[ 0 ].source };
      photos.push(convertedPhoto);
    }

    this.uploadPhotos(photos);
  }

  uploadPhotos(photos) {
    Observable.from(photos).concatMap(photo => {
      this.current = photo;
      return this.provider.uploadPhoto(this.to, photo);
    })
      .subscribe(
        result => {
          this.uploadedPhotos++;
          console.log(this.uploadedPhotos);
          console.log(result);
        },
        console.warn,
        () => {
          if(this.uploadedPhotos >= (this.configs.to - this.configs.from)) {
            this.disposeUploadTask();
            return;
          }

          this.provider.http.get(this.nextChunk)
            .map(response => response.json()).subscribe(result => this.convertAndLoadPhotos(result))

        })
  }

  registerUploadTask(uploadTasksArray) {
    this.uploadTasksArray = uploadTasksArray;
    this.uploadTasksArray.push(this);
  }

  disposeUploadTask() {
    let index = this.uploadTasksArray.indexOf(this);
    this.uploadTasksArray.splice(index, 1);
  }
}
