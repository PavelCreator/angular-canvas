import {Component, OnInit} from '@angular/core';
import {Tools} from '@app/enums/tools.enum';
import {Colors} from "@app/enums/colors.enum";
import {SettingsService} from "@app/services/settings.service";
import {FillMode} from "@app/enums/fill-mode.enum";
import {DrawService} from "@app/services/draw-service.service";
import {EnumMember} from "@angular/compiler-cli/src/ngtsc/reflection";
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  public tools = Tools;
  public fillMode = FillMode;
  public colors: string[] = [];

  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;

  public colorCtr: FormControl = new FormControl(null);

  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  constructor(
    public settingsService: SettingsService,
    private drawService: DrawService,
  ) {
  }

  ngOnInit(): void {
    this.colors = this.enumToArray(Colors);
  }

  public toolChanged(tool: Tools): void {
    this.settingsService.tool = +tool;
  }

  public fillModeChanged(fillMode: FillMode): void {
    this.settingsService.fillMode = +fillMode;
  }

  public lineWidthChanged(lineWidth: number): void {
    this.settingsService.lineWidth = +lineWidth;
  }

  public colorChanged(color: Colors): void {
    this.settingsService.color = color;
  }

  public clearCanvas(): void {
    if (this.drawService.element) {
      this.drawService.clearCanvas();
    }
  }

  public showFillModes(): boolean {
    switch (this.settingsService.tool) {
      case Tools.Rectangle:
      case Tools.Ellipse:
        return true;

      default:
        return false;
    }
  }

  public showLineWidth(): boolean {
    switch (this.settingsService.tool) {
      case Tools.Pen:
      case Tools.Spiral:
      case Tools.PenDoubleHorizontal:
      case Tools.PenDoubleVertical:
        return true;

      default:
        return false;
    }
  }

  public showLineCount(): boolean {
    switch (this.settingsService.tool) {
      case Tools.PenDoubleHorizontal:
      case Tools.PenDoubleVertical:
        return true;

      default:
        return false;
    }
  }

  private enumToArray(Enum: Object): string[] {
    const array: string[] = [];
    Object.keys(Enum).forEach(key => (array.push(key)));
    return array;
  }

}
