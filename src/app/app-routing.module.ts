import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/photo-upload', pathMatch: 'full' },
  { path: 'home', loadChildren: 'app/home/home.module.ts#HomeModule' },
  { path: 'photo-upload', loadChildren: 'app/photo-upload/photo-upload.module.ts#PhotoUploadModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
