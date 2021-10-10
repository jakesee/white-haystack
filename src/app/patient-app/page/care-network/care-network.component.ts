import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/data.service';
import { IProvider } from '@app/interfaces';
import * as _ from 'lodash';
import { PageBase } from '../page-base';

@Component({
  selector: 'app-care-network',
  templateUrl: './care-network.component.html',
  styleUrls: ['./care-network.component.scss']
})
export class CareNetworkComponent extends PageBase implements OnInit {

  providers: IProvider[] = [];

  results: { [key:string]: IProvider[] } = {};

  constructor(protected _dataService: DataService) {
    super(_dataService);

    this._construct();
  }

  private async _construct() {
    await this._dataService.getProvidersByParent(this._dataService.appConfig.providerId).toPromise().then((response) => {
      this.providers = response.data;

      this.results = _.groupBy(this.providers, (p) => p.category);
    });
  }

  ngOnInit(): void {
  }

  get categories(): string[] {
    return Object.keys(this.results ?? {});
  }

  public getProvidersByCategory(category: string): any {
    return this.results[category];
  }

  public search($event: any) {
    let filtered = _.filter(this.providers, (p) => {
      const keyword: string = ($event.target.value as string).toLowerCase();
      const found = p.category.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword) || p.title.toLowerCase().includes(keyword);
      return found;
    });

    this.results = _.groupBy(filtered, (p) => p.category)
  }

}
