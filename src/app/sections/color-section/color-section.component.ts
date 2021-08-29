import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/interfaces';

@Component({
  selector: 'app-color-section',
  templateUrl: './color-section.component.html',
  styleUrls: ['./color-section.component.scss']
})
export class ColorSectionComponent extends Section implements OnInit {
  color: string = '#0000FF';

  constructor() { super(); }

  ngOnInit() {}
}
