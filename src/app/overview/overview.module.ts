
import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class OverviewModule {}
