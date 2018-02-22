import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPricelistPage } from './edit-pricelist';

@NgModule({
  declarations: [
    EditPricelistPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPricelistPage),
  ],
})
export class EditPricelistPageModule {}
