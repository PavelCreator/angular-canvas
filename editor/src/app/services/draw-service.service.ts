import {Injectable} from '@angular/core';
import {SettingsService} from "@app/services/settings.service";
import {ShapeWith2Sides} from "@app/interfaces/shapeWith2Sides";

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  public context!: CanvasRenderingContext2D;

  constructor(
    private settingsService: SettingsService
  ) { }

  public drawRectangle(): void {
    const shapeDimensions: ShapeWith2Sides = this.mouseCoordinatesToShape();
    this.context.fillStyle = this.settingsService.color;
    this.context.fillRect(shapeDimensions.x, shapeDimensions.y, shapeDimensions.width, shapeDimensions.height);
  }

  public drawEllipse(): void {

  }

  public fillColor(): void {

  }

  private mouseCoordinatesToShape(): ShapeWith2Sides {
    const {x: downX, y: downY} = this.settingsService.mouseDownCoordinates;
    const {x: upX, y: upY} = this.settingsService.mouseUpCoordinates;
    const smallerX = downX <= upX ? downX : upX,
          smallerY = downY <= upY ? downY : upY,
          biggerX = downX > upX ? downX : upX,
          biggerY = downY > upY ? downY : upY,
          width = biggerX - smallerX,
          height = biggerY - smallerY;
    return {
      x: smallerX,
      y: smallerY,
      width,
      height
    }
  }
}
