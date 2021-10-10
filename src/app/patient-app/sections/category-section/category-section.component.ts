import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/data.service';
import { IProvider, Section } from '@app/interfaces';
import * as _ from 'lodash';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.scss']
})
export class CategorySectionComponent extends Section implements OnInit {


  categories: Array<string> = [];

  constructor(private _dateService: DataService) {
    super();
  }

  ngOnInit(): void {
  }

  init(config: any, provider: IProvider): void {
    super.init(config, provider);

    this._dateService.getProvidersByParent(this.provider.id).toPromise().then((response) => {
      this.categories = Object.keys(_.groupBy(response.data, (p: IProvider) => p.category));
    });
  }
}
