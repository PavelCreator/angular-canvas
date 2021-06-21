import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SettingsService} from "@app/services/settings.service";
import {Tools} from "@app/enums/tools.enum";
import {DrawService} from "@app/services/draw-service.service";
import {MouseListenerService} from "@app/services/mouse-listener.service";

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss']
})
export class DrawAreaComponent implements AfterViewInit {

  @ViewChild('drawArea', {static: false}) drawArea!: ElementRef;

  constructor(
    private settingsService: SettingsService,
    private drawService: DrawService,
    private mouseListenerService: MouseListenerService,
  ) {}

  ngAfterViewInit(): void {
      this.drawService.element = this.drawArea.nativeElement;
      this.drawService.context = this.drawService.element!.getContext('2d');
      this.drawService.clearCanvas();
      this.drawService.clearCanvas();
      this.mouseListenerService.mouseEventsProcessor();
  }

}
