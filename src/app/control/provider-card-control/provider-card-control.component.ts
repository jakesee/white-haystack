import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-card-control',
  templateUrl: './provider-card-control.component.html',
  styleUrls: ['./provider-card-control.component.scss']
})
export class ProviderCardControlComponent implements OnInit {

  @Input() provider;

  constructor() { }

  ngOnInit(): void {
  }

}
