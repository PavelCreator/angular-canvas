import {Injectable} from '@angular/core';
import {SettingsService} from "@app/services/settings.service";
import {RectangleDimensions} from "@app/interfaces/rectangle-dimensions";
import {EllipseDimensions} from "@app/interfaces/ellipse-dimensions";
import {FillMode} from "@app/enums/fill-mode.enum";

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  public context!: CanvasRenderingContext2D;

  constructor(
    private settingsService: SettingsService
  ) { }

  public drawRectangle(): void {
    const ctx = this.context;
    console.log('drawRectangle');
    const shapeDimensions: RectangleDimensions = this.calcRectangleDimensions();
    if (this.settingsService.fillMode === FillMode.Filled){
      ctx.fillStyle = this.settingsService.color;
      ctx.fillRect(shapeDimensions.x, shapeDimensions.y, shapeDimensions.width, shapeDimensions.height);
    } else {
      ctx.strokeStyle = this.settingsService.color;
      ctx.strokeRect(shapeDimensions.x, shapeDimensions.y, shapeDimensions.width, shapeDimensions.height);
    }
  }

  public drawEllipse(): void {
    const ctx = this.context;
    const { cx, cy, rx, ry } = this.calcEllipseDimensions();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
    if (this.settingsService.fillMode === FillMode.Filled){
      ctx.fillStyle = this.settingsService.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.settingsService.color;
      ctx.stroke();
    }
  }

  public fillColor(): void {

  }

  private calcRectangleDimensions(): RectangleDimensions {
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

  private calcEllipseDimensions(): EllipseDimensions {
    const rectangleDimensions: RectangleDimensions = this.calcRectangleDimensions();
    return {
      cx: rectangleDimensions.x + rectangleDimensions.width/2,
      cy: rectangleDimensions.y + rectangleDimensions.height/2,
      rx: rectangleDimensions.width/2,
      ry: rectangleDimensions.height/2,
    }
  }

  /*    ctx.save(); // save state
    ctx.beginPath();
    ctx.fillStyle = this.settingsService.color;
    ctx.translate(cx-rx, cy-ry);
    ctx.scale(rx, ry);
    ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore(); // restore to original state
    ctx.stroke();*/

    /*
    const shapeDimensions: EllipseDimensions =*/

/*    this.context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle [, anticlockwise]);*/

/*    this.context.beginPath();
    this.context.fillStyle = this.settingsService.color;
    this.context.ellipse(100, 100, 50, 75, Math.PI / 4, 0, 2 * Math.PI);
    this.context.stroke();*/
}
