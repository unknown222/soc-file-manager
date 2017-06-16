import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';
import { UploadPhotosGuideComponent } from './upload-photos-guide/upload-photos-guide.component';

const routes: Routes = [
    {
      path: '', component: HelpComponent,
      children: [
        {path: "", redirectTo: "upload-photos-guide"},
        { path: 'upload-photos-guide', component: UploadPhotosGuideComponent }
      ]
    }
  ]
;
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HelpRoutingModule {
}
