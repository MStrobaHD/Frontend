import { NgModule } from "@angular/core";
import { NavigationComponent } from "../layout/navigation/navigation.component";
import { NavigationBarComponent } from "../layout/navigation/navigation-bar/navigation-bar.component";
import { NavigationSideComponent } from "../layout/navigation/navigation-side/navigation-side.component";
import { MaterialModule } from "./material.module";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule } from "@angular/forms";
import { TestComponent } from "../layout/test/test.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationBarComponent,
    NavigationSideComponent,
    TestComponent
  ],
  imports: [
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    NavigationComponent,
    NavigationBarComponent,
    NavigationSideComponent,
    TestComponent,
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    MaterialModule,
    CommonModule
  ]
})
export class SharedModule {}
