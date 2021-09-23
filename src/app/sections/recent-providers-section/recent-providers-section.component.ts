import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/data.service';
import { IProvider, Section } from '@app/interfaces';

@Component({
  selector: 'app-recent-providers-section',
  templateUrl: './recent-providers-section.component.html',
  styleUrls: ['./recent-providers-section.component.scss']
})
export class RecentProvidersSectionComponent extends Section implements OnInit {

  providers: Array<IProvider> = [] as Array<IProvider>;

  constructor(private _dataService: DataService) {
    super();
  }

  ngOnInit(): void {
  }

  init(config:any, provider: IProvider): void {
    super.init(config, provider);

    this._dataService.getProvidersByParent(this.provider.id).toPromise().then((response) => {
      this.providers = response.data;
      this.providers = this._dataService.any(this.providers, 4);
      console.log('RecentProvidersSectionComponent', this.providers);
    });
  }
}
