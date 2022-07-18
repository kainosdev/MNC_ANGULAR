import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CKEditorModule
  ],
  exports: [CKEditorModule]
})
export class SharedModule { }
