import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '../interfaces';

@Component({
  selector: 'app-consult-now',
  templateUrl: './consult-now.component.html',
  styleUrls: ['./consult-now.component.scss']
})
export class ConsultNowComponent implements Section, OnInit {
  imgSource: string = '';
  title: string = 'Title';
  subText: string = '';
  buttonText: string = 'Consult Now';
  command: [];

  constructor(private _router: Router) {}

  ngOnInit() {}

  init(config: any) {
    this.imgSource = config.imgSource;
    this.title = config.title;
    this.subText = config.subText;
    this.buttonText = config.buttonText;
    this.command = config.command;
  }

  consult_click($event) {
    this._router.navigate(this.command);
  }
}
