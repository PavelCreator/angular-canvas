import { Component, OnInit } from '@angular/core';
import { Tools } from '@app/enums/tools.enum';
import { Colors } from "@app/enums/colors.enum";
import { SettingsService } from "@app/services/settings.service";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  public tools = Tools;
  public colors = Colors;
  constructor(
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {

  }

  toolChanged(tool: Tools): void {
    console.log('tool =', tool);
    this.settingsService.tool = tool;
  }

  colorChanged(color: Colors): void {
    console.log('color =', color);
    this.settingsService.color = color;
  }

}
