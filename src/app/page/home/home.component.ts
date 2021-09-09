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
import { DefinitionSection, Section } from '@app/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('section', { read: ViewContainerRef }) containers: QueryList<ViewContainerRef>;

  sections: Array<DefinitionSection>;

  constructor(
    private _dataService: DataService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.sections = _dataService.config.HomeComponent;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this._loadSections();
    });
  }

  private _loadSections() {
    if (this.containers !== null && this.containers !== undefined) {
      for (let i = 0; i < this.containers.toArray().length; i++) {
        const section = this.sections[i];
        const component = section.component;
        if (component) {
          const container = this.containers.toArray()[i];
          const factory = this._componentFactoryResolver.resolveComponentFactory<
            any
          >(component);
          const refComponent = container.createComponent(factory);
          let instance: Section = refComponent.instance;
          instance.init(section.config);
        }
      }
    }
  }
}
