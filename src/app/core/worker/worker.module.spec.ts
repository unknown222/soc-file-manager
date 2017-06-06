import { WorkerModule } from './worker.module';

describe('WorkerModule', () => {
  let workerModule: WorkerModule;

  beforeEach(() => {
    workerModule = new WorkerModule();
  });

  it('should create an instance', () => {
    expect(workerModule).toBeTruthy();
  });
});
