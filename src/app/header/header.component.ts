import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  imgURL: string = 'https://placekitten.com/200/80';

  menuItems: Array<any> = [];

  constructor(private _dataService: DataService) {
    let config = _dataService.config.HeaderComponent;
    this.imgURL = config.imgURL;
    this.menuItems = config.menuItems;
  }

  ngOnInit() {}
}
