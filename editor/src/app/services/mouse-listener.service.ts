import {Injectable} from '@angular/core';
import {SettingsService} from "@app/services/settings.service";
import {DrawService} from "@app/services/draw-service.service";
import {Tools} from "@app/enums/tools.enum";

@Injectable({
  providedIn: 'root'
})
export class MouseListenerService {

  private elemLeft: number = 0;
  private elemTop: number = 0;

  constructor(
    private settingsService: SettingsService,
    private drawService: DrawService,
  ) {
  }

  public mouseEventsProcessor(): void {
    const elem: HTMLCanvasElement = this.drawService.element!;

    this.elemLeft = elem.offsetLeft,
    this.elemTop = elem.offsetTop;

    elem.addEventListener('mousedown', (event: MouseEvent) => {
      // this.drawService.context.globalCompositeOperation = 'destination-over';
      this.drawService.isDrawing = true;
      this.settingsService.mouseDownCoordinates = this.getCoordinates(event);
    }, false);

    elem.addEventListener('mousemove', (event: any) => {
      if (this.drawService.isDrawing) {
        this.settingsService.mouseMoveCoordinates = this.getCoordinates(event);
        this.draw();
      }
    }, false);

    elem.addEventListener('mouseup', (event: any) => {
      if (this.drawService.isDrawing) {
        this.drawService.isDrawing = false;

        this.settingsService.mouseUpCoordinates = this.getCoordinates(event);
        this.draw();

        // this.drawService.context.globalCompositeOperation = 'source-over';
        this.drawService.previousRectangleValues = null;
        this.drawService.previousPenValues = null;
      }
    }, false);

    elem.addEventListener('mouseleave', (event: any) => {
      if (this.drawService.isDrawing) {
        this.settingsService.mouseMoveCoordinates = this.getCoordinates(event);
        this.draw();

        this.drawService.isDrawing = false;
        this.drawService.previousRectangleValues = null;
        this.drawService.previousPenValues = null;
      }
    }, false);
  }

  private draw(): void {
    switch (this.settingsService.tool) {
      case Tools.Rectangle:
        this.drawService.drawRectangle();
        break;

      case Tools.Ellipse:
        this.drawService.drawEllipse();
        break;

      case Tools.Pen:
        this.drawService.drawPen();
        break;

      case Tools.Spiral:
        this.drawService.drawSpiral();
        break;

      default:
        break;
    }
  }

  private getCoordinates(event: MouseEvent) {
    return {
        x: event.pageX - this.elemLeft,
        y: event.pageY - this.elemTop
      }
  }
}
