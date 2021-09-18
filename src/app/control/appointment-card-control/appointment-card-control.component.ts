import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-appointment-card-control',
  templateUrl: './appointment-card-control.component.html',
  styleUrls: ['./appointment-card-control.component.scss']
})
export class AppointmentCardControlComponent implements OnInit {

  @Input() episode;

  isShowDetail: boolean = false;

  @Output() videoClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() chatClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onVideoClick($event: any) {
    this.videoClick.emit($event);
  }

  onChatClick($event: any) {
    this.chatClick.emit({ ...$event, "episode": this.episode });
  }

  onTaskClick($event: any) {
    this.isShowDetail = !this.isShowDetail;
  }
}
