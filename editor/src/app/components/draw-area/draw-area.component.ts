import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SettingsService} from "@app/services/settings.service";
import {Coordinates2D} from "@app/interfaces/coordinates2D";
import {Tools} from "@app/enums/tools.enum";
import {DrawService} from "@app/services/draw-service.service";

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss']
})
export class DrawAreaComponent implements AfterViewInit {

  @ViewChild('drawArea', {static: false}) drawArea!: ElementRef;

  constructor(
    private settingsService: SettingsService,
    private drawService: DrawService
  ) {}

  ngAfterViewInit(): void {
      const elem = this.drawArea.nativeElement;
      this.drawService.context = elem.getContext('2d');
      this.drawService.context.fillStyle = "white";
			this.drawService.context.fillRect(0, 0, elem.width, elem.height);

      const elemLeft: number = elem.offsetLeft,
            elemTop: number = elem.offsetTop/*,
            elements: any[] = []*/;

      elem.addEventListener('mousedown', (event: any) => {
          this.settingsService.mouseDownCoordinates = {
            x: event.pageX - elemLeft,
            y: event.pageY - elemTop
          };
          console.log('mouseDownCoordinates =', this.settingsService.mouseDownCoordinates);
      }, false);

      elem.addEventListener('mouseup', (event: any) => {
          this.settingsService.mouseUpCoordinates = {
            x: event.pageX - elemLeft,
            y: event.pageY - elemTop
          };
          this.draw();
          console.log('mouseUpCoordinates =', this.settingsService.mouseUpCoordinates);
      }, false);
  }

  draw(): void{
    switch (this.settingsService.tool) {
      case Tools.Rectangle:
        this.drawService.drawRectangle();
        break;

      case Tools.Ellipse:
        this.drawService.drawEllipse();
        break;

      case Tools.FillColor:
        this.drawService.fillColor();
        break;

      default:
        break;
    }
  }

}
