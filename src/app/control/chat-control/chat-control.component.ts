import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-control',
  templateUrl: './chat-control.component.html',
  styleUrls: ['./chat-control.component.scss']
})
export class ChatControlComponent implements OnInit {

  @Input() episode: any;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  isDoctorTarget: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClose($event: any) {
    this.close.emit($event);
  }
}
