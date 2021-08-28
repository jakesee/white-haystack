import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit {
  state: Array<any>;

  constructor(private _dataService: DataService) {
    this.state = _dataService.state;
  }

  ngOnInit() {}
}
