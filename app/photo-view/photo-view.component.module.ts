import { PhotoDetailComponentModule } from './photo-detail/photo-detail.component.module';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PhotoViewComponent } from './photo-view.component';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [PhotoViewComponent
],
  imports: [IonicPageModule.forChild(PhotoViewComponent),PhotoDetailComponentModule],
  exports: [PhotoViewComponent],
  providers: []
})
export class PhotoViewComponentModule { }
