import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule } from 'ngx-avatar';
import { BoatsComponent } from './pages/boats/boats.component';
import { FishermenComponent } from './pages/fishermen/fishermen.component';

@NgModule({
  declarations: [
    FishermenComponent,
    BoatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    AvatarModule
  ],
  exports: [
    FishermenComponent,
    BoatsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RgpSaiModule { }
