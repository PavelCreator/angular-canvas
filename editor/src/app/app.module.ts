import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ToolsComponent } from './components/tools/tools.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule} from "@angular/material/button-toggle";
import { CanvasEventsDirective } from './directives/canvas-events.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ToolsComponent,
    DrawAreaComponent,
    CanvasEventsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
