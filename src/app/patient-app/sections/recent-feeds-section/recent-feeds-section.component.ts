import { Component, OnInit } from '@angular/core';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-recent-feeds-section',
  templateUrl: './recent-feeds-section.component.html',
  styleUrls: ['./recent-feeds-section.component.scss']
})
export class RecentFeedsSectionComponent extends Section implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
  }

}
