import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../core/worker/worker.service';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.scss']
})
export class InProgressComponent implements OnInit {

  constructor(public worker: WorkerService) { }

  ngOnInit() {
  }

}
