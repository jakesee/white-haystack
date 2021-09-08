import { Component, OnInit } from '@angular/core';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-onetwothree-section',
  templateUrl: './onetwothree-section.component.html',
  styleUrls: ['./onetwothree-section.component.scss']
})
export class OnetwothreeSectionComponent extends Section implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
