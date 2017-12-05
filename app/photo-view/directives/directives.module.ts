import { PinchZoomDirective } from './pinch-zoom.directive';
import { NgModule } from '@angular/core';


@NgModule({
    declarations: [PinchZoomDirective],
    exports: [PinchZoomDirective]
})
export class DirectivesModule { }