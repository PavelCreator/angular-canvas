import { Component, OnInit } from '@angular/core';
import { Tools } from '@app/enums/tools.enum';
import { Colors } from "@app/enums/colors.enum";
import { SettingsService } from "@app/services/settings.service";
import {FillMode} from "@app/enums/fill-mode.enum";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  public tools = Tools;
  public fillMode = FillMode;
  public colors = [];
  constructor(
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.colors = this.enumToArray(Colors);
    console.log('this.colors =', this.colors);
  }

  toolChanged(tool: Tools): void {
    this.settingsService.tool = +tool;
  }

  fillModeChanged(fillMode: FillMode): void {
    this.settingsService.fillMode = +fillMode;
  }

  colorChanged(color: Colors): void {
    console.log('color =', color);
    this.settingsService.color = color;
  }

  enumToArray(Enum: any): any {
    const array: string[] = [];
    Object.keys(Enum).forEach(key => (array.push(key)));
    return array;
  }

}
