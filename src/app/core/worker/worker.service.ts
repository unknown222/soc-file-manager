import { Injectable } from '@angular/core';
import { SocialProviderService } from '../social-provider/social-provider.service';
import { ApiProvider } from '../social-provider/entities/api-provider';
import { UploadTask } from './enitites/upload-task';
import { Providers } from '../social-provider/entities/providers.enum';

@Injectable()
export class WorkerService {

  activeTasks: Array<UploadTask> = [];

  constructor(private socService: SocialProviderService) {
  }

  start(options) {
    let task: UploadTask = new UploadTask(options, this.socService);
    task.registerUploadTask(this.activeTasks);
    task.executeUploadTask();
  }
}
