import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concierge-app',
  templateUrl: './concierge-app.component.html',
  styleUrls: ['./concierge-app.component.scss']
})
export class ConciergeAppComponent implements OnInit {

  isMenuCollapsed: boolean = false;

  constructor() { }

  onToggle($event: any) {
    this.isMenuCollapsed != this.isMenuCollapsed;
  }

  ngOnInit(): void {
  }

}
