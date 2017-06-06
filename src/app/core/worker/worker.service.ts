import { Injectable } from '@angular/core';
import { SocialProviderService } from '../social-provider/social-provider.service';
import { ApiProvider } from '../social-provider/entities/api-provider';
import { UploadTask } from './enitites/upload-task';

@Injectable()
export class WorkerService {

  activeTasks: Array<UploadTask> = [];

  constructor(private socService: SocialProviderService) {
  }

  start(params) {
    let provider: ApiProvider = this.socService.getProviderByName('FB');
    let task: UploadTask = new UploadTask(params.from, params.to, params.photos, provider);
    task.registerUploadTask(this.activeTasks);
    task.executeUploadTask();
  }
}
