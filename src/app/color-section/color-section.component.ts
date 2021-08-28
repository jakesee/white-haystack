import { Component, OnInit } from '@angular/core';
import { Section } from '../interfaces';

@Component({
  selector: 'app-color-section',
  templateUrl: './color-section.component.html',
  styleUrls: ['./color-section.component.scss']
})
export class ColorSectionComponent implements OnInit, Section {
  color: string = '#0000FF';

  constructor() {}

  ngOnInit() {}

  init(config: any) {
    this.color = config.color;
  }
}
