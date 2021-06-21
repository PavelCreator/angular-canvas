import {Injectable} from '@angular/core';
import {SettingsService} from "@app/services/settings.service";
import {RectangleDimensions} from "@app/interfaces/rectangle-dimensions";
import {EllipseDimensions} from "@app/interfaces/ellipse-dimensions";
import {FillMode} from "@app/enums/fill-mode.enum";
import {Coordinates2D} from "@app/interfaces/coordinates-2D";

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  public context!: CanvasRenderingContext2D | null;
  public element!: HTMLCanvasElement | null;
  public isDrawing: boolean = false;
  public previousRectangleValues!: RectangleDimensions | null;
  public previousPenValues!: Coordinates2D | null;

  constructor(
    private settingsService: SettingsService
  ) { }

  public drawRectangle(): void {
    const ctx = this.context;
    const shapeDimensions: RectangleDimensions = this.calcRectangleDimensions();

    if (this.isDrawing && this.previousRectangleValues) {
      ctx!.clearRect(
        this.previousRectangleValues.x,
        this.previousRectangleValues.y,
        this.previousRectangleValues.width,
        this.previousRectangleValues.height
      );
    }

    if (this.settingsService.fillMode === FillMode.Filled){
      ctx!.fillStyle = this.settingsService.color;
      ctx!.fillRect(shapeDimensions.x, shapeDimensions.y, shapeDimensions.width, shapeDimensions.height);
    } else {
      ctx!.strokeStyle = this.settingsService.color;
      ctx!.strokeRect(shapeDimensions.x, shapeDimensions.y, shapeDimensions.width, shapeDimensions.height);
    }
    this.previousRectangleValues = shapeDimensions;
  }

  public drawEllipse(): void {
    const ctx = this.context;
    const { cx, cy, rx, ry } = this.calcEllipseDimensions();
    ctx!.beginPath();
    ctx!.ellipse(cx, cy, rx, ry, 0, 0, Math.PI*2);
    if (this.settingsService.fillMode === FillMode.Filled){
      ctx!.fillStyle = this.settingsService.color;
      ctx!.fill();
    } else {
      ctx!.strokeStyle = this.settingsService.color;
      ctx!.stroke();
    }
  }

  public drawPen(): void {
    const {x:x1, y:y1} = this.previousPenValues ? this.previousPenValues : this.settingsService.mouseDownCoordinates;
    const {x:x2, y:y2} = this.isDrawing ? this.settingsService.mouseMoveCoordinates : this.settingsService.mouseUpCoordinates;
    this.penCommonLogic(x1,x2,y1,y2);
    this.previousPenValues = {x:x2,y:y2};
  }

  public drawPenDoubleHorisontal(): void {
    const {x:x1, y:y1} = this.previousPenValues ? this.previousPenValues : this.settingsService.mouseDownCoordinates;
    const {x:x2, y:y2} = this.isDrawing ? this.settingsService.mouseMoveCoordinates : this.settingsService.mouseUpCoordinates;
    const offset = 10;
    this.penCommonLogic(x1,x2,y1,y2);
    this.previousPenValues = {x:x2,y:y2};

    this.penCommonLogic(x1,x2,y1+offset,y2+offset);
    if (+this.settingsService.linesToDraw >= 3) {
      this.penCommonLogic(x1,x2,y1-offset,y2-offset);
    }
    if (+this.settingsService.linesToDraw >= 4) {
      this.penCommonLogic(x1,x2,y1+offset*2,y2+offset*2);
    }
    if (+this.settingsService.linesToDraw >= 5) {
      this.penCommonLogic(x1,x2,y1-offset*2,y2-offset*2);
    }
    if (+this.settingsService.linesToDraw >= 6) {
      this.penCommonLogic(x1,x2,y1+offset*3,y2+offset*3);
    }
    if (+this.settingsService.linesToDraw >= 7) {
      this.penCommonLogic(x1,x2,y1-offset*3,y2-offset*3);
    }
  }

  public drawPenDoubleVertical(): void {
    const {x:x1, y:y1} = this.previousPenValues ? this.previousPenValues : this.settingsService.mouseDownCoordinates;
    const {x:x2, y:y2} = this.isDrawing ? this.settingsService.mouseMoveCoordinates : this.settingsService.mouseUpCoordinates;
    const offset = 10;
    this.penCommonLogic(x1,x2,y1,y2);
    this.previousPenValues = {x:x2,y:y2};

    this.penCommonLogic(x1+offset,x2+offset,y1,y2);
    if (+this.settingsService.linesToDraw >= 3) {
      this.penCommonLogic(x1-offset,x2-offset,y1,y2);
    }
    if (+this.settingsService.linesToDraw >= 4) {
      this.penCommonLogic(x1+offset*2,x2+offset*2,y1,y2);
    }
    if (+this.settingsService.linesToDraw >= 5) {
      this.penCommonLogic(x1-offset*2,x2-offset*2,y1,y2);
    }
    if (+this.settingsService.linesToDraw >= 6) {
      this.penCommonLogic(x1+offset*3,x2+offset*3,y1,y2);
    }
    if (+this.settingsService.linesToDraw >= 7) {
      this.penCommonLogic(x1-offset*3,x2-offset*3,y1,y2);
    }
  }

  public drawSpiral(): void {
    const {x:x1, y:y1} = this.settingsService.mouseDownCoordinates;
    const {x:x2, y:y2} = this.isDrawing ? this.settingsService.mouseMoveCoordinates : this.settingsService.mouseUpCoordinates;
    this.penCommonLogic(x1,x2,y1,y2);
  }

  public clearCanvas(): void {
      this.element!.width = window.innerWidth - 60;
      this.element!.height = window.innerHeight - 220;
      this.context!.fillStyle = "white";
			this.context!.fillRect(0, 0, this.element!.width, this.element!.height);
  }

  private penCommonLogic(x1: number, x2: number, y1: number, y2: number): void {
    const ctx = this.context;
    ctx!.beginPath();
    ctx!.strokeStyle = this.settingsService.color;
    ctx!.lineWidth = this.settingsService.lineWidth;
    ctx!.moveTo(x1, y1);
    ctx!.lineTo(x2, y2);
    ctx!.stroke();
    ctx!.closePath();
  }

  private calcRectangleDimensions(moveModeOn = true): RectangleDimensions {
    const {x: downX, y: downY} = this.settingsService.mouseDownCoordinates;
    const {x: upX, y: upY} = this.isDrawing && moveModeOn ? this.settingsService.mouseMoveCoordinates : this.settingsService.mouseUpCoordinates;
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
    const rectangleDimensions: RectangleDimensions = this.calcRectangleDimensions(false);
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
