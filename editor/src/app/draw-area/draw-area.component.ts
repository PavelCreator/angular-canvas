import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-draw-area',
  templateUrl: './draw-area.component.html',
  styleUrls: ['./draw-area.component.scss']
})
export class DrawAreaComponent implements AfterViewInit {

  public context: CanvasRenderingContext2D;

  @ViewChild('drawArea', {static: false}) drawArea: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
      const drawAreaEl = this.drawArea.nativeElement;
      this.context = drawAreaEl.getContext('2d');
      this.context.fillStyle = "white";
			this.context.fillRect(0, 0, drawAreaEl.width, drawAreaEl.height);

			setTimeout(() => {
			    this.context.fillStyle = "blue";
			    this.context.fillRect(0, 0, drawAreaEl.width, drawAreaEl.height);
			}, 1000);
  }

}
