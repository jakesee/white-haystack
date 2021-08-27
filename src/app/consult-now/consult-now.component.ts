import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '../interfaces';

@Component({
  selector: 'app-consult-now',
  templateUrl: './consult-now.component.html',
  styleUrls: ['./consult-now.component.css']
})
export class ConsultNowComponent implements Section, OnInit {
  color: string = '';
  title: string = 'Title';
  buttonText: string = 'Consult Now';
  command: [];

  constructor(private _router: Router) {}

  ngOnInit() {}

  init(config: any) {
    this.command = config.command;
    this.title = config.title;
    this.buttonText = config.buttonText;
    this.color = config.color;
  }

  consult_click($event) {
    this._router.navigate(this.command);
  }
}
