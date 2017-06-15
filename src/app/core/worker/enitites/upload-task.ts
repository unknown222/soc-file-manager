import { Observable } from 'rxjs/Observable';
import { Album } from '../../social-provider/entities/album';
import { Photo } from '../../social-provider/entities/photo';
import { SocialProviderService } from '../../social-provider/social-provider.service';
import { Subscription } from 'rxjs/Subscription';
/**
 * Created by Unknown on 6/6/2017.
 */
export class UploadTask {
  uploadSource: Album;
  uploadDestination: Album;
  uploadedData: Array<Photo>;
  uploadConfigs: { from, to, copyDescription };
  uploadTasksArray;

  totalToUpload: number;
  uploadedPhotos: number = 0;
  currentPhoto: Photo;
  pointerNextChunk: string;
  complete: boolean = false;
  pause: boolean = false;
  currentSubscription: Subscription;

  constructor(options, private socService: SocialProviderService) {
    this.uploadSource = Object.assign({}, options.uploadSource);
    this.uploadDestination = Object.assign({}, options.uploadDestination);
    this.uploadConfigs = Object.assign({}, options.uploadConfigs);
    this.totalToUpload = this.uploadConfigs.to - this.uploadConfigs.from + 1;

    this.uploadedData = [];
    for (let photo of options.uploadedData) {
      this.uploadedData.push(Object.assign({}, photo));
    }

  }

  executeUploadTask() {
    this.pause = false;
    this.getPhotosToUpload().subscribe(result => {
      if (!this.pause) {
        this.convertAndUploadPhotos(result);
      }
    });
  }

  getPhotosToUpload() {
    return Observable.create(observer => {
      if (this.uploadedData.length > this.uploadConfigs.from + this.uploadedPhotos) {
        observer.next(this.uploadedData);
        observer.complete();
        return;
      }

      let offset = this.uploadConfigs.from + this.uploadedPhotos;

      if (this.pointerNextChunk) {
        this.socService.getProvider(this.uploadSource.provider).getPhotos({
          pointerNext: this.pointerNextChunk,
          offset: offset
        }).subscribe(result => {
          this.pointerNextChunk = result.pointerNext;
          observer.next(result.data);
          observer.complete();
        });
        return;
      }

      this.socService.getProvider(this.uploadSource.provider).getPhotos({
        source: this.uploadSource,
        offset: offset
      }).subscribe(result => {
        this.pointerNextChunk = result.pointerNext;
        observer.next(result.data);
        observer.complete();
      });

    });
  }

  convertAndUploadPhotos(data) {

    let photos = data.filter(photo => photo.index >= this.uploadConfigs.from + this.uploadedPhotos && photo.index <= this.uploadConfigs.to);
    if (photos.length === 0) {
      this.completeUpload();
      return;
    }

    this.currentSubscription = this.uploadPhotos(photos).subscribe(result => result, console.error,
      () => {
        if (this.uploadedPhotos >= this.totalToUpload) {
          this.completeUpload();
          return;
        }
        this.getPhotosToUpload().subscribe(result => {
          if (!this.pause) {
            this.convertAndUploadPhotos(result);
          }
        });
      });
  }

  uploadPhotos(photos) {
    let uploadProvider = this.socService.getProvider(this.uploadDestination.provider);
    let observable = Observable.from(photos).concatMap((photo: Photo) => {
      this.uploadedPhotos++;
      this.currentPhoto = photo;
      let options = {
        uploadDestination: this.uploadDestination,
        photo: photo
      };
      if (!this.uploadConfigs.copyDescription) {
        photo.description = null;
      }
      return uploadProvider.uploadPhoto(options);
    });

    return observable;
  }

  registerUploadTask(uploadTasksArray) {
    this.uploadTasksArray = uploadTasksArray;
    this.uploadTasksArray.push(this);
  }

  completeUpload() {
    this.complete = true;
    this.pauseUpload();
  }

  pauseUpload() {
    this.pause = true;
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
  }

  disposeUploadTask() {
    this.pauseUpload();
    let index = this.uploadTasksArray.indexOf(this);
    this.uploadTasksArray.splice(index, 1);
  }
}
