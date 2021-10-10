import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from '@app/data.service';
import { PageBase } from '@app/patient-app/page/page-base';

@Component({
  selector: 'app-patient-app',
  templateUrl: './patient-app.component.html',
  styleUrls: ['./patient-app.component.scss']
})
export class PatientAppComponent extends PageBase implements AfterViewInit {

  @ViewChild('header', { read: ViewContainerRef }) viewHeader: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef }) viewFooter: ViewContainerRef;

  constructor(protected _dataService: DataService) {
    super(_dataService);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loadComponents();
    }, 0);
  }

  private _loadComponents() {
    if (this.viewHeader && this.viewFooter) {
      this._dataService.loadComponent(this.viewHeader, this._dataService.appConfig.header.component);
      this._dataService.loadComponent(this.viewFooter, this._dataService.appConfig.footer.component);
    }
  }
}
