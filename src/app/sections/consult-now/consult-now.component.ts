import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from 'src/app/interfaces';

@Component({
  selector: 'app-consult-now',
  templateUrl: './consult-now.component.html',
  styleUrls: ['./consult-now.component.scss']
})
export class ConsultNowComponent extends Section implements OnInit {
  imgSource: string = '';
  title: string = 'Title';
  subText: string = '';
  buttonText: string = 'Consult Now';
  command: [];

  constructor(private _router: Router) {
    super();
  }

  ngOnInit() {}

  consult_click($event) {
    this._router.navigate(this.command);
  }
}
