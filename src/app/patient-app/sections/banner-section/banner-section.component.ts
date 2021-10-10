import { Component, Input, OnInit } from '@angular/core';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-banner-section',
  templateUrl: './banner-section.component.html',
  styleUrls: ['./banner-section.component.scss']
})
export class BannerSectionComponent extends Section implements OnInit {

  @Input() imgSrc: string = 'https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_footer_english.png';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
