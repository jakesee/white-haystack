import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { DataService } from '@app/data.service';
import { IProvider, ISection, Section } from '@app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChildren('section', { read: ViewContainerRef }) containers: QueryList<ViewContainerRef>;

  sections: Array<ISection>;

  provider: IProvider;

  constructor(private _dataService: DataService) {
    this.sections = _dataService.appConfig.sections;
    this._dataService.getProvider(this._dataService.appConfig.providerId).toPromise().then((response) => {
      this.provider = response.data;
      this._loadSections();
    });
  }

  ngOnInit() {}

  private _loadSections() {
    if (this.containers !== null && this.containers !== undefined) {
      const containers = this.containers.toArray();
      for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        const section = this.sections[i];
        let instance: Section = this._dataService.loadComponent(container, section.component);
        instance.init(section.config, this.provider)
      }
    }
  }
}
