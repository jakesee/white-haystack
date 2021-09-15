import { Component, OnInit } from '@angular/core';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-title-bar-section',
  templateUrl: './title-bar-section.component.html',
  styleUrls: ['./title-bar-section.component.scss']
})
export class TitleBarSectionComponent extends Section implements OnInit {


  logoImgSrc: string = '';
  title: string = '';
  blob: string = '';

  constructor() { super(); }

  ngOnInit(): void {
  }

}
