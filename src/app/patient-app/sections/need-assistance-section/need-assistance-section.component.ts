import { Component, OnInit } from '@angular/core';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-need-assistance-section',
  templateUrl: './need-assistance-section.component.html',
  styleUrls: ['./need-assistance-section.component.scss']
})
export class NeedAssistanceSectionComponent extends Section implements OnInit {


  content: string;

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
