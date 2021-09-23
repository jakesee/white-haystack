import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-care-network',
  templateUrl: './care-network.component.html',
  styleUrls: ['./care-network.component.scss']
})
export class CareNetworkComponent implements OnInit {

  providers: any;

  constructor(private _dataService: DataService) {
    this._construct();
  }

  private async _construct() {
    await this._dataService.getProvidersByParent(this._dataService.appConfig.providerId).toPromise().then((response) => {
      this.providers = response.data;

      this.providers = _.groupBy(this.providers, (p) => p.category);
    });
  }

  ngOnInit(): void {
  }

  get categories(): string[] {
    return Object.keys(this.providers ?? {});
  }

  public getProvidersByCategory(category: string): any {
    return this.providers[category];
  }

}
