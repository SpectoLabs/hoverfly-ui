import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TopnavbarComponent } from "./topnavbar.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ TopnavbarComponent ],
  imports: [ BrowserModule, RouterModule ],
  exports: [ TopnavbarComponent ],
})

export class TopnavbarModule {
}