import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/data.service';
import { Section } from '@app/interfaces';

@Component({
  selector: 'app-sub-providers-section',
  templateUrl: './sub-providers-section.component.html',
  styleUrls: ['./sub-providers-section.component.scss']
})
export class SubProvidersSectionComponent extends Section implements OnInit {

  providers:Array<any> = [];

  constructor(private _dataService: DataService, private _router: Router) {
    super();
  }

  init(config: any, provider: any): void {
    super.init(config, provider);
    this._dataService.getProvidersByParent(this.provider.id).toPromise().then((response) => {
      this.providers = response.data;
    });
  }

  ngOnInit(): void {
  }

  onJourneyStart($event: any, provider): boolean {
    this._router.navigate(['provider', provider.id, 'journey', 'start']);

    return false;
  }

}
