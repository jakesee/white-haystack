import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/data.service';
import { ProviderData, Section } from '@app/interfaces';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  @ViewChildren('section', { read: ViewContainerRef }) containers: QueryList<ViewContainerRef>;

  provider: ProviderData = {} as ProviderData;

  logoImage: string = "";

  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._route.params.subscribe((params) => {
      this._buildPage();
    });
  }

  private async _buildPage() {
    let providerId = this._route.snapshot.params.pid;
    await this._dataService.getProvider(providerId).toPromise().then((response) => {
      this.provider = response.data;
      this._changeDetectorRef.detectChanges();
      this._loadSections();
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  private _loadSections() {
    if (this.containers !== null && this.containers !== undefined) {
      for (let i = 0; i < this.containers.toArray().length; i++) {
        const section = this.provider.sections[i];
        const componentType = this._dataService.resolveComponent(section.component);
        if (componentType) {
          const container = this.containers.toArray()[i];
          const factory = this._componentFactoryResolver.resolveComponentFactory<any>(componentType);
          const refComponent = container.createComponent(factory);
          let instance: Section = refComponent.instance;
          instance.init(section.config, this.provider);
        }
      }
    }
  }



}
