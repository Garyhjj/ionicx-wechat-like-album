import { DirectivesModule } from '../directives/directives.module';
import { NgModule } from '@angular/core';
import { PhotoDetailComponent } from './photo-detail.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [PhotoDetailComponent],
  imports: [IonicPageModule.forChild(PhotoDetailComponent),DirectivesModule],
  exports: [PhotoDetailComponent],
  entryComponents: [
    PhotoDetailComponent
  ]
})
export class PhotoDetailComponentModule { }
