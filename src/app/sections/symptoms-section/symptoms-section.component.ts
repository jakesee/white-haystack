import { Component, OnInit } from '@angular/core';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-symptoms-section',
  templateUrl: './symptoms-section.component.html',
  styleUrls: ['./symptoms-section.component.scss']
})
export class SymptomsSectionComponent extends Section implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
