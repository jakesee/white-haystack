import { Component, OnInit } from '@angular/core';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-banner-section',
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss']
})
export class BannerSectionComponent extends Section implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
