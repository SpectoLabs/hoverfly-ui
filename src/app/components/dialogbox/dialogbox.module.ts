import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { DialogboxComponent } from './dialogbox.component';
@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  declarations: [
    DialogboxComponent
  ],
  exports: [
    DialogboxComponent
  ]
})
export class DialogboxModule {
}
