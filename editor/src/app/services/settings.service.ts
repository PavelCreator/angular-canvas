import {Injectable} from '@angular/core';
import {Tools} from "@app/enums/tools.enum";
import {Colors} from "@app/enums/colors.enum";
import {Coordinates2D} from "@app/interfaces/coordinates-2D";
import {FillMode} from "@app/enums/fill-mode.enum";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public tool: Tools;
  public fillMode: FillMode;
  public color: Colors;
  public mouseDownCoordinates!: Coordinates2D;
	public mouseUpCoordinates!: Coordinates2D;

  constructor() {
    this.tool = Tools.Rectangle;
    this.fillMode = FillMode.Filled;
    this.color = Colors.Black;
  }
}
