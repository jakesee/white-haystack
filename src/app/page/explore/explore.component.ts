import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/data.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {


  providers: Array<any>;

  constructor(private _dataService: DataService) {
    this._construct();
  }

  private async _construct() {
    await this._dataService.getProviders().then((response) => {
      this.providers = response.data;
    });
  }

  ngOnInit(): void {
  }

}
