import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { DataService } from '@app/data.service';
import { ISection, Section } from '@app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('section', { read: ViewContainerRef }) containers: QueryList<ViewContainerRef>;

  sections: Array<ISection>;

  provider: any;

  constructor(
    private _dataService: DataService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.sections = _dataService.appConfig.sections;
    this._dataService.getProvider(this._dataService.appConfig.providerId).toPromise().then((response) => {
      this.provider = response.data;
      this._loadSections();
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {


    });
  }

  private _loadSections() {
    if (this.containers !== null && this.containers !== undefined) {
      const containers = this.containers.toArray();
      for (let i = 0; i < containers.length; i++) {
        const container = containers[i];
        const section = this.sections[i];
        this._dataService.loadComponent(container, section.component, (instance) => {
          let sectionInstance = instance as Section;
          sectionInstance.init(section.config, this.provider)
        });
      }
    }
  }
}
