import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SettingsService} from "@app/services/settings.service";
import {Coordinates2D} from "@app/interfaces/coordinates-2D";
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
      console.log('elem.getBoundingClientRect() =', elem.getBoundingClientRect());
      elem.width = window.innerWidth - 60;
      elem.height = window.innerHeight - 220;
      this.drawService.context = elem.getContext('2d');
      this.drawService.context.fillStyle = "white";
			this.drawService.context.fillRect(0, 0, elem.width, elem.height);

      const elemLeft: number = elem.offsetLeft,
            elemTop: number = elem.offsetTop;

      elem.addEventListener('mousedown', (event: any) => {
          console.log('mousedown');
          this.drawService.isDrawing = true;
          this.settingsService.mouseDownCoordinates = {
            x: event.pageX - elemLeft,
            y: event.pageY - elemTop
          };
      }, false);

      elem.addEventListener('mousemove', (event: any) => {
          if (this.drawService.isDrawing){
            console.log('mousemove');
            this.settingsService.mouseMoveCoordinates = {
              x: event.pageX - elemLeft,
              y: event.pageY - elemTop
            };
            this.draw();
          }
      }, false);

      elem.addEventListener('mouseup', (event: any) => {
          console.log('mouseup');
          this.drawService.isDrawing = false;
          this.settingsService.mouseUpCoordinates = {
            x: event.pageX - elemLeft,
            y: event.pageY - elemTop
          };
          this.draw();
      }, false);

      elem.addEventListener('mouseleave', (event: any) => {
          if (this.drawService.isDrawing){
            console.log('mouseleave');
            this.settingsService.mouseMoveCoordinates = {
              x: event.pageX - elemLeft,
              y: event.pageY - elemTop
            };
            this.draw();
            this.drawService.isDrawing = false;
          }
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

      default:
        break;
    }
  }

}
